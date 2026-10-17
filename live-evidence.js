/* One feature: retrieve and inspect public project evidence at a pinned commit. */
"use strict";
(() => {
  const repository = "Eseixas89/ai-evaluation-portfolio";
  const api = `https://api.github.com/repos/${repository}`;
  const projects = {
    scout: {
      title: "AI Evaluation Research Scout",
      description: "Inspect the Python implementation, specification of evaluation cases, build log, and usage instructions. The presence of evaluation cases does not mean those cases have passed.",
      includes: path => path.startsWith("fl-07-agent/") && !path.split("/").some(part => part.startsWith("."))
    },
    workflow: {
      title: "Source-grounded research workflow",
      description: "Inspect the workflow walkthrough and its configuration, including evidence filtering and human-review checkpoints.",
      includes: path => ["automation-workflow-v2.html", "automation-workflow-config.md"].includes(path)
    },
    connectors: {
      title: "Connectors and agent concepts",
      description: "Inspect the explainer and the recorded connector evidence. These are documentation artifacts, not an automated test of the connector.",
      includes: path => ["agent-concepts-mcp-basics.html", "connector-evidence.md"].includes(path)
    }
  };
  const form = document.getElementById("evidence-form");
  const select = document.getElementById("project");
  const button = document.getElementById("load-evidence");
  const status = document.getElementById("evidence-status");
  const results = document.getElementById("evidence-results");
  const files = document.getElementById("evidence-files");
  let snapshot = null;
  const formatTime = date => new Intl.DateTimeFormat(undefined, {dateStyle: "medium", timeStyle: "long"}).format(date);

  async function getJSON(url, signal) {
    const response = await fetch(url, {signal, credentials: "omit", headers: {Accept: "application/vnd.github+json"}});
    if (!response.ok) {
      if (response.status === 429 || (response.status === 403 && response.headers.get("x-ratelimit-remaining") === "0")) {
        throw new Error("GitHub's public API limit has been reached. Try again later or open the repository below.");
      }
      if (response.status === 404) throw new Error("The public repository could not be found. Open the repository link below to check its availability.");
      throw new Error(`GitHub could not complete the lookup (HTTP ${response.status}). Try again later or open the repository below.`);
    }
    return response.json();
  }

  async function loadSnapshot() {
    if (snapshot && Date.now() - snapshot.fetchedAt.getTime() < 5 * 60 * 1000) return {data: snapshot, cached: true};
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const commit = await getJSON(`${api}/commits/main`, controller.signal);
      if (!/^[a-f0-9]{40}$/.test(commit.sha) || !/^[a-f0-9]{40}$/.test(commit.commit?.tree?.sha)) {
        throw new Error("GitHub returned an unexpected commit response. Please try again later.");
      }
      const tree = await getJSON(`${api}/git/trees/${commit.commit.tree.sha}?recursive=1`, controller.signal);
      if (tree.truncated || !Array.isArray(tree.tree)) throw new Error("GitHub did not return a complete file list. Inspect the repository directly below.");
      snapshot = {sha: commit.sha, tree: tree.tree, fetchedAt: new Date()};
      return {data: snapshot, cached: false};
    } finally {
      clearTimeout(timeout);
    }
  }

  function showSnapshot(data, project) {
    const matches = data.tree.filter(file => file.type === "blob" && typeof file.path === "string" && project.includes(file.path)).sort((a, b) => a.path.localeCompare(b.path));
    document.getElementById("result-title").textContent = project.title;
    document.getElementById("result-description").textContent = project.description;
    document.getElementById("fetched-at").textContent = formatTime(data.fetchedAt);
    const commitLink = document.createElement("a");
    commitLink.href = `https://github.com/${repository}/commit/${data.sha}`;
    commitLink.textContent = data.sha.slice(0, 7);
    document.getElementById("snapshot-commit").replaceChildren(commitLink);
    files.replaceChildren();
    for (const file of matches) {
      const item = document.createElement("li");
      const link = document.createElement("a");
      // Construct URLs locally and insert API text as text, never as HTML.
      link.href = `https://github.com/${repository}/blob/${data.sha}/${file.path.split("/").map(encodeURIComponent).join("/")}`;
      link.textContent = file.path;
      const size = document.createElement("span");
      size.textContent = Number.isFinite(file.size) ? `${file.size.toLocaleString()} B` : "Size unavailable";
      item.append(link, size);
      files.append(item);
    }
    results.hidden = false;
    return matches.length;
  }

  select.addEventListener("change", () => {
    results.hidden = true;
    status.dataset.state = "ready";
    status.textContent = "Project changed. Load its evidence to see matching files.";
  });
  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (button.disabled) return;
    const project = projects[select.value];
    if (!project) return;
    results.hidden = true;
    results.setAttribute("aria-busy", "true");
    button.disabled = true;
    select.disabled = true;
    button.textContent = "Loading…";
    status.dataset.state = "loading";
    status.textContent = "Contacting GitHub and retrieving a repository snapshot…";
    try {
      const {data, cached} = await loadSnapshot();
      const count = showSnapshot(data, project);
      status.dataset.state = "success";
      status.textContent = count ? `${count} evidence files found. ${cached ? "Using the snapshot fetched earlier in this tab" : "Retrieved from GitHub"} at ${formatTime(data.fetchedAt)}.` : "No matching files were found in this snapshot. Inspect the repository directly below.";
    } catch (error) {
      status.dataset.state = "error";
      status.textContent = error.name === "AbortError" ? "The GitHub lookup timed out. Try again or open the repository below." : error instanceof TypeError ? "GitHub could not be reached. Check your connection and try again, or open the repository below." : error.message;
    } finally {
      results.setAttribute("aria-busy", "false");
      button.disabled = false;
      select.disabled = false;
      button.textContent = "Load live evidence ↗";
    }
  });
})();
