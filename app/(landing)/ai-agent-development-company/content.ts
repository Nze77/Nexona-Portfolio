// Shared content for the AI agent development company landing page.
// Imported by both page.tsx (visible UI) and layout.tsx (JSON-LD schema) so the
// FAQ copy and the FAQPage structured data never drift apart.
//
// CANNIBALISATION BOUNDARY — read before adding a question here.
// This page owns BUILD intent: what an agent is, how one gets engineered, what
// it costs, which framework, who owns the code. ai-automation-agency owns
// OUTCOME intent: "we have repeat work, make it stop". The two FAQ sets are
// deliberately disjoint. No question about workflow mapping, approvals or
// data-entry hours belongs here, and no question about RAG, LangGraph, evals or
// model running cost belongs over there — otherwise the two FAQPage blocks
// compete for the same snippet.
//
// Non-geographic. The Mumbai and Navi Mumbai pages own the location queries.

export interface FaqItem {
    question: string
    answer: string
}

export const FAQ_ITEMS: FaqItem[] = [
    {
        question: 'What does an AI agent development company do?',
        answer:
            'An AI agent development company designs, builds and runs software agents that act on their own — reading, deciding, calling your systems, handing off to a person when the job gets unusual. The build itself is mostly unglamorous: connecting the agent to your real data, writing the rules about what it is allowed to touch, testing it against a few hundred real examples before a customer ever speaks to it. The model is maybe a fifth of the work. Everything around the model is the rest.',
    },
    {
        question: 'What is an AI agent?',
        answer:
            'An AI agent is a program that takes a goal, decides its own steps, uses tools to carry them out, and checks whether it worked. That last part is what separates it from a chatbot. A chatbot answers a question and stops. An agent looks up the order in your database, notices the shipment is late, drafts the apology, applies the credit if it falls under the limit you set, and escalates if it does not. Same model underneath. Very different thing to build, and a very different thing to get wrong.',
    },
    {
        question: 'How much does AI agent development cost?',
        answer:
            'Four things drive the cost, and the model is not one of them: how many of your systems the agent has to touch, how messy the data is before it is usable, how much of the work is irreversible enough to need approval steps, and whether one agent does the job or several have to coordinate. One agent against a couple of systems sits at the bottom of the range. Multi-agent orchestration sits at the top, and the gap between those two is wide. There is also a running cost — model usage is billed by volume, not by seat — and we put that beside the build price in the proposal, because it is the one that surprises people six months in. We scope before we quote. Anyone who gives you a number before seeing your data is guessing.',
    },
    {
        question: 'How long does it take to build an AI agent?',
        answer:
            'Six to ten weeks for a single production agent. The first demo takes about four days and it will be the most impressive the project ever looks — that is the part everyone remembers, and it is roughly 20% of the work. The rest goes on the boring half: edge cases, permissions, what happens when the API times out, what happens when someone asks the support agent for a refund it is not allowed to give. Multi-agent builds run three to five months.',
    },
    {
        question: 'What is the difference between RAG and fine-tuning?',
        answer:
            'RAG gives the model your information at the moment it answers. Fine-tuning changes how the model behaves. If the problem is that it does not know your products, your prices, your policies, you want RAG — the documents stay outside the model, you update them like any other file, and the answer can cite where it came from. If the problem is that it knows the facts but writes nothing like you, that is fine-tuning. Nine out of ten business projects are RAG. We have fine-tuned twice in three years and reverted one of those.',
    },
    {
        question: 'LangChain or LangGraph — which do you build on?',
        answer:
            'LangGraph for anything going to production, LangChain for the pieces around it. The difference matters: LangChain chains steps together, which is fine until the agent needs to loop, retry, branch, or wait for a human to approve something. LangGraph models the whole run as a graph with explicit state, so you can see where a run is, pause it, resume it, and replay exactly what happened when a customer complains. We also write plain Python with no framework when the job is small enough, which is more often than framework vendors would like.',
    },
    {
        question: 'Why build a custom AI agent instead of using a no-code tool?',
        answer:
            'Build custom when the agent is the product rather than the plumbing. No-code platforms are genuinely good at connecting apps and firing simple sequences, and if that is your problem you should use one. They get expensive and awkward at three specific points: when you need real evaluation before shipping, when per-run pricing meets high volume, and when the logic needs branching that a canvas cannot express cleanly. You are also renting — the agent lives on their infrastructure under their pricing, and moving it later means rebuilding it.',
    },
    {
        question: 'Can we hire an AI agent developer for part of the work?',
        answer:
            'Yes. About a third of our agent work is embedded — one or two of our engineers inside your team, your repo, your standups. Usually there is already a developer who understands the domain, and what is missing is someone who has shipped agents before and knows which failures are coming. Minimum useful engagement is six weeks. Below that you spend the whole time on context and nothing ships.',
    },
    {
        question: 'What happens when the agent gets something wrong?',
        answer:
            'It gets things wrong, so the build assumes it. Every agent we ship has three things: a confidence threshold below which it stops and asks a person, a written list of actions it may never take unsupervised, and a log of every run that a non-technical person can actually read. Anything irreversible — refunds, contracts, price changes, sending money — is draft-and-approve by default. We will argue with you if you ask us to remove that.',
    },
    {
        question: 'Do we own the code?',
        answer:
            'You own all of it. Code, prompts, evaluation sets, infrastructure config — in your repository and your cloud account from week one, not handed over at the end. We do not keep a copy running that you rent back from us, and there is no per-seat licence. If you want to take it in-house or hand it to another team in eighteen months, nothing about that is our decision to make.',
    },
    {
        question: 'How do you know an agent is good enough to launch?',
        answer:
            'We build the evaluation set before we build the agent. Between 150 and 400 real examples — actual customer messages, actual documents, actual queries pulled from your history — with the correct answer written next to each one. The agent has to hit an agreed pass rate on that set before it goes anywhere near a customer, and it reruns on every change. Without this you are shipping on vibes, and the vibes are always excellent right up until the first week of real traffic.',
    },
    {
        question: 'What do you need from us to start?',
        answer:
            'Access to the data the agent will work from, one person who actually knows the process, and a decision about what the agent is never allowed to do. That is genuinely it. You do not need clean data — we have built against a document set where half the PDFs were photographs of printouts, taken at an angle, in a warehouse. Messy is normal. What stalls a project is the second item: no single person who can say how the process really works, only four people who each know a different third of it.',
    },
]
