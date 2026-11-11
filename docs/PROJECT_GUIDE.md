# CEN 4930 Team Project Guide: summary of the requirements

A condensed copy of the instructor's *Team Project Guide, Fall 2026* (Dr. Vinod Kumar Ahuja, FGCU),
kept here so anyone working in this repo knows what each milestone is graded on. The full PDF is
in the team's shared folder; if anything here disagrees with the PDF, the PDF wins.

Teams of 3 (CS + entrepreneurship). Find a real problem, build an AI agent for it, test it with real
users, pitch it to a panel. Points: M1 4, M2 8, M3 10, **M4 14**, **Final Pitch 10**.

## M1: Team Charter + Problem Discovery (Sep 2, 4 pts): done
Team charter (identity, model stack choice + fallback, working agreements), 5 user interviews with
templates, Jobs-to-be-Done map, problem statement (who, what in users' words, why an agent, open questions).

## M2: Agent Prototype v1 + Market Research (Sep 23, 8 pts): done
Repo with a working agent, at least one MCP tool, setup file, README (300-400 words: problem, what it
does, what's not built, setup, 3 limitations), at least 3 test cases; architecture diagram; commits from
all members. Competitive landscape (5-7 competitors), TAM/SAM/why now/market risk, Business Model Canvas.

## M3: Multi-Agent System + Cost Analysis (Oct 28, 10 pts): done
At least 2 agents with an explicit handoff, a reasoning pattern (ReAct / chain-of-thought / sequential
thinking), a knowledge or memory layer, README with a CHANGES section, updated architecture diagram,
2-minute narrated screen recording (including an imperfect moment), evaluation plan (10 test cases,
Ch 7 method, success threshold, failure modes), cost model (100 / 1,000 / 10,000 users),
sustainability (pricing, break-even, model-cost risk, honest viability), user-testing plan (5+ external
testers, 15-20 min sessions, 2+ scale questions and 3+ open questions, success criteria).

## M4: Evaluated + User-Tested Agent (due Wed Nov 18, 2026, 11:59 PM, 14 pts)
Submit: GitHub repo link + PDF report (10-14 pages) + **evaluation results file**.

**Part 1: Evaluation results**
- Run the evaluation plan from M3. Results file (CSV or Markdown table) with: test case ID, input,
  expected output, actual output, pass/fail, **critic agent score where applicable**. All 10 cases.
- Overall pass rate, and a failure analysis for every failed case (prompt, retrieval, reasoning or other issue).
- **README CHANGES section:** every change since M3 and why; for each, whether it improved evaluation
  results and by how much. **Commit history must show the changes were made after M3** (no backdating).

**Part 2: User testing report**
- Five session summaries (tester role, date/format, task, what they did, where they got stuck, what
  surprised you, would they use it again and what would help).
- Synthesis (500-700 words): patterns seen in 3+ testers, strongest validation evidence (a specific
  moment or quote), most important failure, top three changes before the final pitch and why.

**Part 3: Pivot or proceed**
- Decision document (300-400 words): proceed, pivot, or scope down, with evidence from both the
  evaluation and user testing.
- Updated Business Model Canvas, with changed blocks highlighted and explained.

Rubric: evaluation results 3, agent improvements 2, user testing sessions 3, synthesis 3, pivot/proceed 2, updated BMC 1.

## Final Pitch + Live Demo (Mon Nov 23, 2026, last day of class, 10 pts)
10-minute pitch + live demo + 5-minute Q&A to an industry/faculty panel; all three members speak.
- 0:00-1:30 problem (with M1 interview evidence) | 1:30-3:00 the agent in one sentence + architecture in
  plain language + model stack | **3:00-6:00 live demo on a prompt the panel gives you (unknown in
  advance; 60 s to set up; narrate failures honestly)** | 6:00-7:30 one real pivot or failure and the
  lesson | 7:30-9:00 business model, costs, path to sustainability, one piece of user-testing evidence |
  9:00-10:00 what's next with 3 more months.
- Have a backup screen recording of a similar prompt. Max 10 slides, at most 40 words each; required
  slides: problem, agent in one sentence, architecture, demo, iteration story, business model,
  validation evidence, what's next. Submit slides as PDF before the session.
- Rubric: problem 2, **live demo 3**, iteration story 1, business model 1, validation evidence 1,
  team participation 1, communication quality 1.

## Peer evaluations
Midterm (after M3) and final (after the pitch), individual and anonymous; can adjust individual grades
(-15% to +5%). Ratings: technical, entrepreneurship, cross-functional bridge, reliability; two required
2-3 sentence narratives per teammate.
