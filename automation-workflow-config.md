# Ship an Automation Workflow v2

**Owner:** Eduardo Seixas  
**Workflow:** Weekly AI Evaluation Brief  
**Tool:** ChatGPT Scheduled Task + public web research  
**Schedule:** Monday morning, America/Sao_Paulo

## Step diagram

1. **Gather** -> 5-8 current candidate sources
2. **Source Gate** -> verified source ledger
3. **Synthesize** -> facts, inferences, contradictions, themes
4. **Draft** -> Signal / Evidence / Why it matters / What to watch
5. **Review + Format** -> claim traceability + uncertainty + human QA note

## Exact scheduled-task prompt

```text
Create this week's source-grounded AI Evaluation Brief using this five-stage workflow.

1) GATHER: search the public web for 5-8 materially relevant developments from the last 7 days in LLM evaluation, AI quality, model behavior, safety evaluation, benchmarking, human evaluation, or evaluation tooling; prioritize primary sources, official documentation, research papers, and first-party announcements.

2) SOURCE GATE: remove duplicates, weakly sourced items, promotional noise, and claims that cannot be verified; keep a source ledger with title, publisher, date, URL, and the exact claim each source supports.

3) SYNTHESIZE: cluster the retained evidence into 3-5 themes, distinguish fact from inference, note contradictions or uncertainty, and identify what actually changed versus background context.

4) DRAFT: write a concise professional brief with sections Signal, Evidence, Why it matters for AI evaluation work, and What to watch next.

5) REVIEW + FORMAT: check that every substantive factual claim is traceable to the source ledger, flag any unresolved uncertainty, remove unsupported language, and finish with a QA note naming what a human reviewer should still verify. Include source links and do not invent facts or citations.
```

## Validation inputs

1. LLM-as-a-Judge reliability
2. RAG evaluation
3. Prompt injection and agent safety
4. Multimodal evaluation
5. Long-horizon agent evaluation

## Human review checklist

- Confirm primary-source coverage.
- Check that load-bearing claims are supported by the cited source.
- Verify dates when recency matters.
- Separate facts from inference.
- Escalate contradictions and ambiguous evidence.
- Audit safety-sensitive or high-impact conclusions manually.

## Public walkthrough

https://eseixas89.github.io/ai-evaluation-portfolio/automation-workflow-v2.html
