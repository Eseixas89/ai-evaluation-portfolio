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
