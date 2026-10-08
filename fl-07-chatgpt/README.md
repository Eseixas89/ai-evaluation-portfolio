# FL-07 — AI Evaluation Research Scout in ChatGPT

This is the primary FL-07 implementation following the decision on 8 October 2026 to use GPT inside ChatGPT. It preserves the FL-06 job: research current AI evaluation/quality developments, read the live portfolio, compare the evidence with existing artifacts, and return a concise brief.

## Run it

Open the installed [AI Evaluation Research Scout](https://chatgpt.com/skills?skill_id=6ac7dbb6b60081918ebcabad3723a102) or select it from your available ChatGPT skills, then send:

> Prepare a brief on developments in agent evaluation and reliability over the past 30 days. Use primary sources, compare them with my GitHub portfolio, and include uncertainty and an observed run log.

Portuguese example:

> Prepare um relatório sobre desenvolvimentos em avaliação de agentes e confiabilidade nos últimos 30 dias. Use fontes primárias, compare com meu portfólio no GitHub e inclua incertezas e o registro das consultas.

Use the tools available in your ChatGPT session: web search/page reading and read-only public GitHub access. The workflow itself does not require a Gemini or OpenAI API key. A skill supplies instructions; it does not independently provide missing tools or install a weekly schedule.

If the skill is unavailable in your session, use [INSTRUCTIONS.md](INSTRUCTIONS.md) as the complete instruction set in a ChatGPT chat with web search and public page reading, then send the same request. Tool availability and skill selection should be checked in the actual recording session.

## Live connections

- Public GitHub: `Eseixas89/ai-evaluation-portfolio`.
- Web search and opened primary-source pages.

Repository context is read at runtime. The four preferred files are `personal-agent-spec.html`, `automation-workflow-v2.html`, `stack-rationale.html`, and `agent-concepts-mcp-basics.html`.

## Reviewable artifacts

- [INSTRUCTIONS.md](INSTRUCTIONS.md): the reusable workflow.
- [BUILD_LOG.md](BUILD_LOG.md): decisions and actual iterations.
- [EVAL_RESULTS.md](EVAL_RESULTS.md): observed checks and remaining evaluations.
- [DEMO.md](DEMO.md): prompt, recording steps, and submission notes.
- `runs/`: actual research output and its observed run log.

The Python/Gemini implementation in `../fl-07-agent` remains an earlier alternative. Its local tests do not validate this ChatGPT workflow.

## Relationship to FL-06

FL-06 originally chose a ChatGPT-based surface. This implementation uses a reusable ChatGPT skill instead of a separately configured Custom GPT. The task, live sources, read-only scope, manual invocation, evidence rules, and human review boundary are preserved. The packaging choice is documented; this is not a job change.

The raw request-to-result screen recording is still a separate deliverable. A saved report is evidence of a run, not the required video.
