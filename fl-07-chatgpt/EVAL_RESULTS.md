# Observed evaluations — 8 October 2026

## Real focused research run

Request: developments in agent evaluation and reliability over the last 30 days, using primary sources and relevance to Eduardo Seixas's portfolio.

Execution: a fresh-context GPT session was given only the reusable skill and the research request. It performed actual GitHub reads and web research, then saved the report without mid-run guidance. No external model API key was used. This is an instruction-directed ChatGPT execution, not a Gemini mock or a recording.

Output: [2026-10-08-research-brief.md](runs/2026-10-08-research-brief.md).

| Check | Observation | Status |
| --- | --- | --- |
| Live GitHub context | Four specified artifacts returned with content SHAs. | Observed |
| Live research | Two search queries; two papers opened as abstracts and full HTML. | Observed |
| Dates and primary evidence | arXiv submission histories show 30 September and 4 October 2026; an additional reviewer check reopened both abstract pages and matched the reported dates and numerical claims. | Checked for the two findings |
| Portfolio comparison | Findings connect to named artifacts read during the run. | Observed |
| Facts versus inference | Preprint numerical results attributed to authors; suggested portfolio exercises labeled as inference. | Observed |
| Inaccessible evidence | A third candidate was omitted after its content could not be read. | Observed |
| Source deduplication | Abstract/full-text versions grouped as one finding each. | Observed; controlled duplicate-news test not run |
| Bounded research | Stopped with two findings. First-version wording did not distinguish distinct sources from failed attempts/rereads clearly; refined after review. | Refined; exact cap behavior not separately tested |
| External actions | Research session performed reads and local report creation, with no publishing or remote changes. | Observed in this run |
| Raw screen recording | No video was captured. | Pending |

The report contains an observed trace, including initial failed web access attempts, the successful GitHub connector fallback, and failed reads for the excluded candidate. Its record is retained as the original output; later workflow refinements do not retroactively change that execution.

## FL-06 behavioral cases

| Original case | Evidence so far | Remaining work |
| --- | --- | --- |
| Normal/focused research | Actual report with two sourced findings. | Review additional representative topics. |
| Duplicate coverage | Same-paper pages merged. | Controlled repeated-news test. |
| Weak evidence | Inaccessible candidate and secondary coverage not elevated. | Controlled unsupported-claim test. |
| Conflicting sources | No controlled conflicting-source case exercised. | Pending. |
| Quiet week | Report was not padded to three findings. | Explicit zero-new-evidence case pending. |
| Portfolio opportunity | Concrete suggestions tied to live artifacts, without remote edits. | Observed for this run. |
| Prompt injection | Boundary present in instructions; no staged injection challenge performed. | Pending. |

This first real run establishes that the core workflow can complete and use live sources. It does not establish that every evaluation passes or that the agent is consistently reliable.
