import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Sparkles } from "lucide-react";
import { AskBox } from "@/components/Bits";
import { SavedCard } from "@/components/Cards";
import { useChat } from "@/lib/chat";

export default function InlineChat({ placeholder }: { placeholder: string }) {
  const { messages } = useChat();
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  const last = [...messages].reverse().find((m) => m.role === "assistant");
  return (
    <div className="space-y-3">
      <div className="home-command"><Sparkles className="shrink-0 text-forest" size={23} /><div className="min-w-0 flex-1"><AskBox placeholder={placeholder} suggestions={[]} stay /></div></div>
      {last && (
        <div className="rounded-2xl border border-line bg-surface p-4 animate-rise">
          {lastUser && <p className="mb-2 text-[0.8rem] text-muted">You: {lastUser.text}</p>}
          {last.saved && <SavedCard s={last.saved} compact />}
          <div className="prose-chat mt-2 text-[0.95rem] leading-relaxed">
            {last.pending && !last.text ? <span className="text-muted">BudgetWise is working…</span> : <ReactMarkdown remarkPlugins={[remarkGfm]}>{last.text}</ReactMarkdown>}
          </div>
          {last.error && <p className="mt-2 text-[0.88rem] text-berry">Something went wrong: {last.error}</p>}
        </div>
      )}
    </div>
  );
}
