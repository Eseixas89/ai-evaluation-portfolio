"""Local checks only; these fixtures do not constitute a live Gemini run."""

import unittest
from types import SimpleNamespace as NS

import agent


class AgentChecks(unittest.TestCase):
    def test_portfolio_context_excludes_code_and_head_content(self):
        html = ('<html><head><title>Metadata</title><style>secret-css</style></head>'
                '<body><h1>Research Scout</h1><script>secret-js</script>'
                '<p>Primary sources &amp; evidence.</p></body></html>')
        self.assertEqual(agent.html_to_text(html),
                         'Research Scout\nPrimary sources & evidence.')

    def test_citation_urls_are_deduplicated(self):
        citation = NS(type='url_citation', url='https://example.org/paper', title='Paper')
        interaction = NS(steps=[NS(content=[NS(annotations=[citation, citation])])])
        self.assertEqual(agent.collect_citations(interaction),
                         [('Paper', 'https://example.org/paper')])

    def test_completed_search_exposes_queries_and_counts(self):
        interaction = NS(steps=[
            NS(type='google_search_call', arguments={'queries': ['agent evals', 'agent evals']}),
            NS(type='google_search_result'),
            NS(type='model_output'),
        ])
        self.assertEqual(agent.collect_search_evidence(interaction), (['agent evals'], 1, 1))

    def test_call_without_result_is_not_completed_search(self):
        interaction = NS(steps=[NS(type='google_search_call', arguments=NS(queries=['evals']))])
        self.assertEqual(agent.collect_search_evidence(interaction), (['evals'], 1, 0))

    def test_text_only_response_is_not_search_evidence(self):
        self.assertEqual(agent.collect_search_evidence(NS(steps=[NS(type='model_output')])),
                         ([], 0, 0))

    def test_missing_citation_metadata_requires_review(self):
        report = agent.render_output('A draft brief', [], ['OK GitHub'], 'test-model', ['evals'])
        self.assertIn('REVIEW REQUIRED', report)
        self.assertIn('call and result steps observed', report)
        self.assertIn('- evals', report)


if __name__ == '__main__':
    unittest.main()
