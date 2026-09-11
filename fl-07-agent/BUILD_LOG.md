# FL-07 Build Log — AI Evaluation Research Scout

## Baseline: FL-06 specification

The build starts from `personal-agent-spec.html` in the portfolio. The defined job is to create a defensible AI-evaluation research brief from current evidence, compare useful findings with the existing portfolio, prefer primary sources, remove duplicates, surface uncertainty, and remain read-only.

## Iteration 1 — Rejecting the wrong MVP direction

An initial planning idea was to build a generic **AI response evaluation/grading agent** because it fit the broader portfolio theme. Re-reading FL-06 showed that this would not match the submitted personal-agent spec. That direction was cut before implementation.

**Decision:** preserve the FL-06 `AI Evaluation Research Scout` as the FL-07 core job.

## Iteration 2 — Platform adjustment

FL-06 proposed a Custom GPT / ChatGPT-based first version. For FL-07, the implementation moved to **Python + Gemini API / Google AI Studio**.

Reasons:

- FlyRank's assignment Q&A explicitly permits Google AI Studio.
- A small Python artifact is easier for a reviewer to inspect and reproduce.
- The raw terminal run makes the full loop from request to result visible.
- Google Search grounding provides a real live research tool with citations.
- A live GitHub read can be shown explicitly before generation.

This is a platform deviation, not a job deviation. The research task, evidence rules, portfolio comparison, bounded autonomy, and read-only guardrails remain the same.

## Iteration 3 — Narrowing live context

The first conceptual version could have read the entire repository. That is unnecessary for the MVP and would add noise/cost.

**Kept as live GitHub context:**

- `personal-agent-spec.html`
- `automation-workflow-v2.html`
- `stack-rationale.html`
- `agent-concepts-mcp-basics.html`

Each is fetched from `raw.githubusercontent.com` at run time and truncated to a bounded context size.

## Iteration 4 — End-to-end path

The MVP loop is intentionally simple:

`user request -> live GitHub portfolio reads -> agent prompt -> Gemini + Google Search grounding -> Markdown brief -> saved run artifact`

No mid-run hand editing is needed.

## Guardrails implemented

- Read-only external behavior.
- Maximum five findings.
- Primary-source preference.
- Duplicate/repeated-coverage handling.
- Weak/conflicting evidence must be identified rather than hidden.
- Prompt injection defense: retrieved webpage instructions are untrusted.
- Quiet weeks are allowed to return fewer findings.
- No publication, GitHub writes, messages, applications, purchases, or irreversible actions.

## Cuts from the MVP

The following were deliberately deferred:

- scheduled weekly execution;
- persistent state/history;
- automatic GitHub writes;
- n8n orchestration;
- multi-agent architecture;
- web UI;
- batch evaluation of many topics.

They do not improve the FL-07 pass criteria enough to justify the added failure surface.

## Verification performed during build

- Python source compiles successfully with `py_compile`.
- CLI help path works without requiring an API call.
- Missing-key behavior fails early with a clear error instead of hanging.
- GitHub source paths were checked against the existing public portfolio artifacts.
- Secret handling is environment-variable only; no real API key is stored.

## Live verification still required for submission

The final reviewer-facing proof is one raw run with a real `GEMINI_API_KEY` and internet access. That run should show the GitHub context load, Google Search-grounded model call, and final Markdown result without intervention. The recording belongs in the submission; it should not be fabricated or edited retroactively.
