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
