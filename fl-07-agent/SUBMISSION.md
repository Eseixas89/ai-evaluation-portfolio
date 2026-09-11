# FL-07 Submission Pack

## Deliverable links

Submit one public URL per line in FlyRank. Recommended links:

1. Public GitHub folder/repository containing this FL-07 build.
2. Public/viewable Google Drive link to the raw ~2 minute screen recording.
3. Optional: the GitHub Pages `build-the-agent.html` summary page.

## Notes field

Suggested reviewer note:

> FL-07 implements my FL-06 AI Evaluation Research Scout as a read-only Python MVP. It fetches selected portfolio artifacts live from GitHub, then uses Gemini with Google Search grounding to produce a bounded evidence-backed brief. The platform changed from the planned Custom GPT surface to Python + Google AI Studio for reproducibility and a clearer raw end-to-end capture; the core job and guardrails are unchanged. BUILD_LOG.md documents the iteration and cuts.

## Raw recording script (~2 minutes)

Keep the recording unedited.

1. Open the repository at `fl-07-agent/` and briefly show `BUILD_LOG.md`.
2. Open a terminal in that folder.
3. Verify the key exists **without showing it**.
   - PowerShell: `if ($env:GEMINI_API_KEY) { "GEMINI_API_KEY is set" }`
4. Run: `python agent.py`
5. Do not touch the run while it executes.
6. Point out the live steps printed by the program:
   - GitHub portfolio context loaded.
   - Gemini running with Google Search grounding.
   - Markdown brief saved.
7. Show the final terminal output and open `runs/latest-brief.md`.
8. Scroll enough to show findings, evidence URLs, uncertainty, portfolio relevance, exclusions, and suggested follow-up.

## Pass/revise self-check before submitting

- Core job completes end to end without mid-run editing.
- At least one live tool/data connection is visibly used.
- Build matches FL-06, with the platform deviation documented.
- Build log shows real iteration and scope cuts.
- Raw capture shows the complete loop from request to result.
- Drive/video permissions allow the reviewer to view the recording.
