# FL-09 — record the real thing in 3–5 minutes

**Recording guide, not an existing video.** The FL-09 target is 3–5 minutes; the older FL-07 guide's two-minute target is a different requirement.

## Before recording

- Review the [root README](../README.md), [agent README](../fl-07-agent/README.md), and your actual source.
- Set up Python and the dependency as documented. Set a real Gemini key privately; never display it or record the environment-variable assignment.
- Check that the model selected for your account supports the API and grounding configuration. The source's default model string is not verified by this package.
- Prepare the terminal in `fl-07-agent/`, the source, and an editor for `runs/latest-brief.md`. Keep notifications and private tabs out of view.
- Use screen recording with your microphone and a small webcam view so the design choice and limitation are explained on camera. No slides.
- Read the narration as a draft and adapt it into words you can explain. A webcam view of Eduardo cannot be replaced with an AI-generated presenter.

## Primary route — Research Scout

Suggested flow; time estimates are targets, not a claim about model latency.

| Time | Show and do | English narration draft |
|---|---|---|
| 0:00–0:35 | Show README and project folder | “I'm Eduardo Seixas. This is my AI Evaluation Research Scout. Its job is to turn a focused research request into a short brief with evidence, uncertainty and relevance to my portfolio.” |
| 0:35–1:05 | Show `load_portfolio_context` and the model call in `agent.py` | “The Python program reads four public portfolio artifacts from GitHub, then sends that context and my request to Gemini with Google Search grounding enabled. It saves a Markdown report for human review. The website and the agent are separate programs.” |
| 1:05–1:25 | Explain the design choice on camera | “I chose a small, read-only command-line implementation so the request, external reads and saved output are easy to inspect. The original design proposed a ChatGPT surface; the build log explains the move to Python and Gemini.” |
| 1:25–3:15 | Run the command below and keep the real terminal visible | “This is a new request. I will let the program run without changing its output. The connection log shows what was loaded; grounding is requested in the model call. I still need to check whether the actual evidence supports the answer.” |
| 3:15–4:15 | Open the newly produced report; inspect one claim and its linked primary source | “Here is the generated file. I am checking a specific finding against the source and its date. A citation or confident answer is not enough by itself. I also look for the uncertainty note and the connection to my existing work.” |
| 4:15–4:50 | Explain one observed limitation on camera; close with AI disclosure | “One limitation is that the source and factuality rules are prompt instructions. The program does not independently verify every claim or guarantee a search budget. This run's result needs human review. ChatGPT/Codex helped with implementation, documentation and debugging; I am responsible for understanding the choices and reviewing the evidence.” |

Run one real command:

```bash
python agent.py --prompt "Find the single most useful recent primary-source development in AI evaluation. Return only one finding with its date, source URL, portfolio relevance and uncertainty."
```

Use `--model` only with the real model configured for your account. Do not show a key. Show the new report timestamp and connection log. The focused request is for recording length; it is not evidence that every evaluation case passes.

If a provider error occurs, capture and explain it honestly, fix the underlying setup, and record a new complete run. If latency pushes the recording beyond five minutes, narrow the topic before starting a fresh take. Do not splice a cached result into a supposedly live run, accelerate the waiting period, or turn a failure into a success claim. A local file with an old timestamp is not proof of this execution.

## Separate website walkthrough

The portfolio has a working, independently demonstrated feature. To show that feature, open the live `live-evidence.html` page, load Research Scout, show the snapshot commit, switch projects to demonstrate cache reuse, and open a file pinned to that commit. Explain the choice of public, read-only GitHub access and the limitation that file discovery does not verify file contents. Cover the timeout or rate-limit handling by inspecting the source; do not intentionally flood the live service.

That is a valid demonstration of the website feature. It is **not proof of a live Research Scout model run**. If the reviewer expects the FL-07 agent, include the primary route above; do not silently substitute the website for the agent.

## After recording

1. Confirm length, audible narration, readable terminal, camera explanation and absence of exposed credentials.
2. Upload the actual recording to a reviewer-accessible location. Open the link in a signed-out window to verify permissions.
3. Add the real video link to the [package index](README.md) and FlyRank submission. Do not add a placeholder URL.
4. Post the README and real video link to the required showcase thread. No thread post has been sent by this assistant.
