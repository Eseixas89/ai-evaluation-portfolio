# FL-05 Connector Evidence

**Assignment:** Agent Concepts and MCP Basics  
**Client:** ChatGPT  
**Connector:** GitHub  
**Repository:** `Eseixas89/ai-evaluation-portfolio`

This evidence log records three real connector calls performed against the live repository. It is intended to complement the public explainer page and PDF submission.

## Task 1 - Read the FL-04 workflow

**Request:** Read `automation-workflow-v2.html` and identify the workflow stages.

**Tool used:** `GitHub.fetch_file`

**Returned result:**

- Gather
- Source Gate
- Synthesize
- Draft
- Review + Format

**Source:** `Eseixas89/ai-evaluation-portfolio/automation-workflow-v2.html`

## Task 2 - Inspect the stack decision

**Request:** Inspect `stack-rationale.html` and identify the chosen stack plus the alternatives.

**Tool used:** `GitHub.fetch_file`

**Returned result:**

- Chosen: GitHub Pages + plain HTML/CSS
- Alternative 1: Netlify + static site
- Alternative 2: Vercel + a modern web framework
- Backend: not yet

**Source:** `Eseixas89/ai-evaluation-portfolio/stack-rationale.html`

## Task 3 - Query current repository state

**Request:** List the current root contents of the repository.

**Tool used:** `GitHub.fetch`

**Returned result at execution time:**

- `.github/`
- `.nojekyll`
- `README.md`
- `automation-workflow-config.md`
- `automation-workflow-v2.html`
- `index.html`
- `stack-rationale.html`
- `styles.css`

This third task demonstrates direct inspection of external state that can change independently of the conversation.

## Scope note

The assignment permits an MCP server **or connector**. This practical setup uses ChatGPT's connected GitHub app. It is not presented as a custom MCP server built by the student.

## Public explainer

https://eseixas89.github.io/ai-evaluation-portfolio/agent-concepts-mcp-basics.html
