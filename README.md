# Eduardo Seixas — AI Evaluation Portfolio

Personal portfolio for AI evaluation, data quality, science education, and applied research.

**Live site:** https://eseixas89.github.io/ai-evaluation-portfolio/

## Website files

- `index.html`: portfolio content, sections, navigation, and links.
- `styles.css`: colors, typography, layouts, mobile adjustments, print styles, and keyboard focus indicators.
- `favicon.svg`: the ES icon in the browser tab.
- `assets/Eduardo_Seixas_CV.pdf`: the supplied English CV, available to download.
- `dns-walkthrough.html`: infrastructure note covering DNS, CNAME, HTTPS, and this project's URL.
- `.nojekyll`: serves the files as a plain static website without Jekyll processing.
- `.github/workflows/pages.yml`: the existing deployment workflow for GitHub Pages.
- `SITE_GUIDE_PT.md`: a Portuguese explanation of how to understand, edit, and verify the site.

Existing project pages and `fl-07-agent/` remain separate evidence. The website does not run the Python agent or require an API key, a database, JavaScript, or an external font service.

## Preview locally

From the repository root, with Python installed:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000. Stop the server with Ctrl+C.

## Updating

Edit content in `index.html` and presentation in `styles.css`. Committing to `main` triggers the existing Pages workflow. Check its completed deployment in the repository's Actions tab before verifying the public site.

## Contact and submission notes

The introductory-call button links to Eduardo's 30-minute Calendly event: https://calendly.com/eduardosseixas89/30min. Email is available separately.

The DNS learning note was prepared with AI assistance. Before submitting it as an assignment requiring your own words, review it, explain the process yourself, and revise its wording accordingly.

The supplied CV is unchanged. Add the live portfolio link to the CV and LinkedIn before marking that part of the assignment complete. Add the official FlyRank badge after it is issued following capstone approval.


## Live project evidence

[Try the working demo](https://eseixas89.github.io/ai-evaluation-portfolio/live-evidence.html). One dynamic feature retrieves the current public repository commit and its file tree from GitHub, then shows the selected project's evidence files with links pinned to that commit. No API key or model call is required. The page includes an English backend/data-flow explanation and a Portuguese explanation.

Implementation: `live-evidence.html`, `live-evidence.css`, `live-evidence.js`.


## Mobile, readability, and accessibility audit

[Public before/after fix log](https://eseixas89.github.io/ai-evaluation-portfolio/mobile-fix-log.html). Shared fixes live in `accessibility.css`. Browser checks cover phone, tablet, and desktop widths, with screenshots explicitly labelled as emulated. **The owner supplied a Samsung A15 screenshot and confirmed that menu navigation, CV download, and the live demonstration worked on that phone** and has a checklist in the log. See `mobile-audit-results.json` for the scoped machine-check summary.


## Peer critique: show problem, contribution, and result

[Review feedback and published changes](https://eseixas89.github.io/ai-evaluation-portfolio/critique-response.html). A real peer asked for clearer project achievements. The homepage now makes the problem, Eduardo's contribution, and the supported result explicit for each case; it also distinguishes published artifacts and planned validation from demonstrated outcomes. The Research Scout page now matches the build log's live-run verification boundary. The log records the review, must-fix sorting, before/after captures, and the two opening questions and proof-statement delivery that still require confirmation. No peer approval of the revised site is claimed.
