"""The knowledge layer (Chapter 6): budgeting guides in a ChromaDB vector database.

knowledge/*.md holds short guides based on Penn State Extension and CFPB advice. Each
"## " section becomes one chunk. Chunks are embedded and stored in a local ChromaDB
collection, which is rebuilt automatically when a guide changes.

If ChromaDB is unavailable, search falls back to plain keyword overlap (the TF-IDF idea
from the start of Chapter 6), so advice questions never fail outright.
"""

from __future__ import annotations

import hashlib
import os
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
KNOWLEDGE_DIR = ROOT / "knowledge"
CHROMA_DIR = Path(os.getenv("BUDGETWISE_CHROMA_DIR", ROOT / "chroma_db"))
COLLECTION = "budget_knowledge"
_collection = None


def chunks() -> list[dict]:
    out = []
    for path in sorted(KNOWLEDGE_DIR.glob("*.md")):
        title, section, body, sources, mine = path.stem, None, [], "", []
        for line in path.read_text(encoding="utf-8").splitlines():
            if line.startswith("# "):
                title = line[2:].strip()
            elif line.startswith("## "):
                if section:
                    mine.append({"source": path.name, "title": title, "section": section, "body": body})
                section, body = line[3:].strip(), []
            elif line.startswith("Sources:"):
                sources = line[len("Sources:"):].strip()
            elif line.strip():
                body.append(line.strip())
        if section:
            mine.append({"source": path.name, "title": title, "section": section, "body": body})
        for c in mine:
            c["sources"] = sources
            c["text"] = f"{c['title']} - {c['section']}: " + " ".join(c["body"])
        out.extend(mine)
    return out


def _open_collection():
    """Open (or build) the ChromaDB collection once per process."""
    global _collection
    if _collection is not None:
        return _collection
    import chromadb
    from chromadb.config import Settings

    cs = chunks()
    fingerprint = hashlib.sha256("".join(c["text"] + c["sources"] for c in cs).encode()).hexdigest()[:16]
    client = chromadb.PersistentClient(path=str(CHROMA_DIR), settings=Settings(anonymized_telemetry=False))
    try:
        col = client.get_collection(COLLECTION)
        if (col.metadata or {}).get("fingerprint") == fingerprint and col.count() == len(cs):
            _collection = col
            return col
        client.delete_collection(COLLECTION)
    except Exception:
        pass
    col = client.create_collection(COLLECTION, metadata={"fingerprint": fingerprint})
    col.add(ids=[f"{c['source']}#{i}" for i, c in enumerate(cs)], documents=[c["text"] for c in cs],
            metadatas=[{"source": c["source"], "section": c["section"], "sources": c["sources"]} for c in cs])
    _collection = col
    return col


def warm_up() -> str:
    """Build the index and load the embedding model ahead of time (called at app startup)."""
    try:
        col = _open_collection()
        col.query(query_texts=["budget"], n_results=1)
        return f"chromadb ({col.count()} passages)"
    except Exception as e:  # noqa: BLE001
        return f"keyword fallback ({e.__class__.__name__})"


def _keyword_search(query: str, top_k: int) -> list[dict]:
    words = set(re.findall(r"[a-z]{3,}", query.lower()))
    scored = []
    for c in chunks():
        text_words = set(re.findall(r"[a-z]{3,}", c["text"].lower()))
        scored.append((len(words & text_words), c))
    scored.sort(key=lambda x: -x[0])
    return [{"source_file": c["source"], "section": c["section"], "text": c["text"],
             "original_sources": c["sources"]} for s, c in scored[:top_k]]


def search(query: str, top_k: int = 2) -> dict:
    query = str(query or "").strip()
    if not query:
        return {"error": "query must not be empty"}
    top_k = max(1, min(int(top_k), 4))
    try:
        col = _open_collection()
        res = col.query(query_texts=[query], n_results=min(top_k, col.count()))
        results = [{"source_file": m["source"], "section": m["section"], "text": d, "original_sources": m["sources"]}
                   for d, m in zip(res["documents"][0], res["metadatas"][0])]
        method = "vector"
    except Exception:  # noqa: BLE001
        results, method = _keyword_search(query, top_k), "keyword"
    return {"query": query, "method": method, "results": results}
