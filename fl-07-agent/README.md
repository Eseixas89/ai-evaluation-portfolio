# FL-07 — AI Evaluation Research Scout

This is the Week 5 **Build the Agent** MVP for FlyRank General AI Fluency. It implements the FL-06 `AI Evaluation Research Scout` as a small, reproducible, read-only Python agent.

## What the agent does

One job: produce a short, defensible research brief about meaningful developments in AI evaluation, AI quality, agents, RAG, and human-AI workflows.

A run does two live things end to end:

1. **Reads selected portfolio artifacts from GitHub at runtime** so the brief can compare new findings with existing work.
2. **Uses Gemini with Google Search grounding** to find current evidence and source the research brief.

The final output is a Markdown report with 3–5 findings, evidence links, relevance to the portfolio, uncertainty, exclusions, and suggested read-only follow-up.

## Why this still matches FL-06

FL-06 defined the same core job, a read-only GitHub connection, web research, bounded autonomy, evidence-first behavior, and human approval for consequential actions. The implementation platform changed from the planned ChatGPT/Custom-GPT surface to **Python + Gemini API / Google AI Studio** so the MVP is source-controlled, reproducible, and easy to capture in one raw terminal run. The core job and guardrails did not change.

## Setup

Requirements: Python 3.10+ and a Gemini API key from Google AI Studio.

```bash
cd fl-07-agent
python -m venv .venv
```

Activate the environment:

**Windows PowerShell**

```powershell
.\.venv\Scripts\Activate.ps1
```

**macOS / Linux**

```bash
source .venv/bin/activate
```

Install the dependency:

```bash
pip install -r requirements.txt
```

Set the API key. Do **not** put a real key in the repository.

**Windows PowerShell**

```powershell
$env:GEMINI_API_KEY="YOUR_KEY_HERE"
```

**macOS / Linux**

```bash
export GEMINI_API_KEY="YOUR_KEY_HERE"
```

## Run the MVP

```bash
python agent.py
```

Focused run:

```bash
python agent.py --prompt "What changed recently in agent evaluation and reliability?"
```

The default report is saved to `runs/latest-brief.md` and also printed to the terminal. The terminal output deliberately shows the live GitHub connection step and that Google Search grounding is enabled, which makes the end-to-end tool use visible in a raw screen recording.

## Agent boundaries

The MVP is intentionally read-only. It does not modify GitHub, publish content, send messages, apply for jobs, spend money, or perform irreversible actions. Retrieved webpage instructions are treated as untrusted content. The output is capped at five findings and a quiet week is allowed to produce fewer.

## Files

- `agent.py` — complete MVP agent
- `BUILD_LOG.md` — decisions, changes, cuts, and verification
- `EVALS.md` — FL-06 evaluation cases mapped to the build
- `sample-prompt.txt` — recording/demo prompt
- `.env.example` — environment-variable template with no secret
- `SUBMISSION.md` — exact FL-07 submission checklist and recording plan

## Minimal two-minute demo

1. Show this folder and `BUILD_LOG.md` briefly.
2. In the terminal, show that `GEMINI_API_KEY` is set without revealing its value.
3. Run `python agent.py`.
4. Do not edit or intervene while it runs.
5. Show `[1/3]` GitHub context loading, `[2/3]` Google Search grounded Gemini run, and the saved final brief.
6. Open `runs/latest-brief.md` and scroll through the findings/evidence.

That raw run is the required run capture. If the video is too large for FlyRank, upload it to Google Drive and submit the public/viewable link, as the assignment Q&A allows.

## Architecture, observed results and limitations

This is a separate CLI, not a feature executed by the portfolio website.

| Stage | Input and behavior | Output |
|---|---|---|
| GitHub context | Read four public portfolio pages; at most 14,000 characters from each | Bounded portfolio context and read/failure log |
| Research | Send the request and context to Gemini with Google Search grounding enabled | Model response and any exposed citation annotations |
| Save | Format the response and connection log | `runs/latest-brief.md` unless `--output` changes it |

[BUILD_LOG.md](BUILD_LOG.md) records syntax/help/missing-key checks. A successful live model run is **not recorded**. [EVALS.md](EVALS.md) defines seven behavior cases; none should be called passed without a real observation.

`gemini-3.8-flash` is the configured default string in this source revision, not a verified available model for every account. Use `--model` or `GEMINI_MODEL` for a model actually supported by your provider account and grounding setup. The dependency specifies a version range, not a locked environment. This package does not claim a fully reproduced provider run.

The five-finding cap, source preference, uncertainty labels and read-only rules are prompt instructions. They are not a deterministic factuality checker or a measured search/action budget. The program requests grounding but does not independently prove every claim is grounded, verify each citation, or enforce an end-to-end provider timeout. Partial GitHub reads may continue with warnings. Human review must inspect the log, underlying sources, dates and conclusions.

A missing key exits with code 2; no readable GitHub source exits with 3; model failure with 4; empty output with 5; missing dependency with 6. Never record a failure as a successful brief or replace it with a prewritten result.

## FL-09 documentation and recording

For the 3–5 minute FL-09 demonstration, use the [new recording guide](../capstone/DEMO_GUIDE.md), not the older FL-07 two-minute recording target. Explain one design choice and one limitation on camera, run the actual CLI, and show its resulting Markdown. [The package index](../capstone/README.md) tracks the missing video and final handoff items.

AI assistance was used for this implementation and documentation. Eduardo should explain the choices, operate the demonstration, review source claims, and personalize the narration before submission.
