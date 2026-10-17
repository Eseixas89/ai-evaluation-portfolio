# Portfolio hardening checks

These development-only checks use a local static server. The demo's GitHub API requests are intercepted with fixtures; failures, repeated clicks, and quota tests never target the live API. The reports in `assets/hardening/` distinguish fixture tests from the public PageSpeed run.

Prerequisites: Node.js 20 or newer, Playwright 1.62.1, axe-core 4.14.0, and their browser binaries. From the repository root:

```sh
npm install --no-save playwright@1.62.1 axe-core@4.14.0
npx playwright install chromium firefox
node tests/hardening.cjs after
node tests/site-checks.cjs
```

`CHROMIUM_PATH` can select an existing Chromium executable. `AXE_PATH` can select an existing `axe.min.js`. Firefox runs headlessly; the test environment disables its content-process sandbox for compatibility with the container, not for browsing untrusted sites.

To reproduce the recorded before-fix comparison without changing the current source files:

```sh
git show 15cce9128b48e39c521796a1771106c76c9d760c:live-evidence.js > /tmp/portfolio-evidence-baseline.js
EVIDENCE_SCRIPT=/tmp/portfolio-evidence-baseline.js node tests/hardening.cjs baseline
```

Baseline mode records failures without returning a failing exit status; after mode requires every case to pass. The baseline passed 12 of 23 checks; the revised script passed 23 of 23. These are regression scenarios, not 23 independent security certifications. Timeout and cache-expiry checks advance the browser clock; those displayed timestamps are simulated.

`site-checks.cjs` checks thirteen HTML pages at five widths, selected WCAG A/AA rules with axe, metadata, local references/anchors, homepage scrolling, the CV download, and the demo destination. External HEAD responses are recorded separately in `external-links.json`; they are not proof of a complete human interaction. Email links are not sent. Human review status is maintained in `hardening-review.html`.
