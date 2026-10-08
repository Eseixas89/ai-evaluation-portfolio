# FL-07 build log — ChatGPT workflow

## 8 October 2026 — Recovering the actual starting point

Read the existing FL-06 specification and FL-07 source from the live GitHub repository. Found that the agent was already designed as **AI Evaluation Research Scout**, with a ChatGPT-based v1 planned. The committed FL-07 implementation used Python/Gemini and explicitly still needed a real API run and recording.

An initial vacancy-analysis option was discussed before recovering the spec. After reading it, the user chose to complete the original research agent.

## Iteration 1 — Preparing the earlier Python implementation

Added a setup check, cleaned HTML context, and distinguished a configured Search tool from observed Search calls/results. Four live GitHub reads and six local Python tests passed. A real Gemini run remained blocked by absent key configuration. These checks apply to the Python alternative only.

## Iteration 2 — Returning to ChatGPT

The user asked to use GPT and approved starting that version. Chose a reusable instruction-based ChatGPT skill. This uses the host's existing web and GitHub reading tools rather than an external model API.

Preserved the FL-06 job and boundaries. Changed packaging from a proposed Custom GPT to a ChatGPT skill. Kept the Python/Gemini source as an earlier alternative rather than presenting it as the primary deliverable.

## Iteration 3 — Making the research process observable

Specified a date/window, live portfolio reads, opened primary pages, duplicates, uncertainty, and portfolio relevance. Set explicit budgets: six queries, eight primary-page reads, and four portfolio reads. Added an observed run log and instructions to report missing tools rather than pretending to have completed research.

Distinguished official announcements from independently verified performance. Required older background to be labeled separately so a quiet week cannot be padded with old releases.

## Iteration 4 — Creating and validating the reusable agent

Initialized the personal skill and its display metadata. An initial attempt to replace the generated template in one patch failed; wrote the instruction file directly and reran validation successfully. The skill contains instructions and interface metadata, with no API scripts or keys.

Started a separate fresh-context GPT execution using only the skill and a realistic research request. Its actual output, evidence URLs, and limits are recorded in `runs/` and `EVAL_RESULTS.md`; do not substitute the earlier Python tests for this run.

## Iteration 5 — Learning from the first real run

The research completed with two supported findings, four actual GitHub file reads, and explicit disclosure of inaccessible evidence. A reviewer reopened both primary abstract pages and confirmed the recorded publication dates and numerical claims.

The first run tried public web reads before discovering the connected GitHub reader, and the budget log counted distinct sources separately from retries. Clarified the instructions: discover the connected GitHub reader first; cap six queries, eight distinct primary URLs, four portfolio files, and twenty total source-read attempts, including failures and rereads. Retained the original run log rather than rewriting it to look cleaner. Exact cap enforcement and the remaining behavioral cases are still listed as untested.

The skill was saved and its installed presence verified. No recording has been captured; the raw video remains the user-facing final demonstration step.

## Deferred scope

- Weekly scheduling and unattended runs.
- Automatic repository changes or publication.
- Job matching and application submission.
- A separate website or external model API integration.

The FL-07 video must be a new raw capture of a real run. No recording has been reconstructed or fabricated.
