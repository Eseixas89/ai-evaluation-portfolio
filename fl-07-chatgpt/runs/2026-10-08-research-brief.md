# AI Evaluation Research Brief — 8 de outubro de 2026

**Solicitação:** desenvolvimentos em avaliação de agentes e confiabilidade nos últimos 30 dias, com fontes primárias e relevância para o portfólio de Eduardo Seixas. **Referência:** 08/10/2026, America/Sao_Paulo (UTC−03). **Janela:** 09/09–08/10/2026, inclusive; o dia final está limitado ao material disponível na execução. **Acesso às fontes:** 08/10/2026.

## Resumo executivo

Dois preprints publicados na janela oferecem oportunidades concretas: avaliar o conjunto modelo–estrutura de execução e tornar comparáveis as avaliações humanas entre versões. Os resultados numéricos abaixo são relatos dos autores, não reprodução independente. Para o portfólio, a prioridade sugerida é melhorar o desenho e o registro das avaliações antes de ampliar a infraestrutura.

## Achados

### 1. Mais tarefas não resolvem toda a incerteza de um ranking

**Data verificada:** primeira submissão em 30/09/2026, 19:52 UTC (16:52 em São Paulo). **Fonte:** Hardy et al., [Agent Evaluation Reliability: More Tasks Won't (Always) Fix An Agent Leaderboard](https://arxiv.org/abs/2610.00651); [texto integral v1](https://arxiv.org/html/2610.00651v1).

**Evidência:** os autores aplicam uma decomposição bayesiana de variância a 22 benchmarks. Relatam confiabilidade de rankings de sistemas com modelo e estrutura de execução fixos entre 0,935 e 0,994, enquanto a confiabilidade atribuída ao modelo subjacente varia de 0,148 a 0,841. Nas condições analisadas, adicionar tarefas semelhantes não elimina a incerteza decorrente da cobertura limitada de estruturas de execução. Esses coeficientes medem confiabilidade da comparação; não representam probabilidade de sucesso operacional do agente.

**Por que importa:** é possível obter resultados consistentes dentro de uma configuração e conclusões diferentes ao mudar ferramentas, estado ou lógica de execução. Minha inferência é que uma avaliação deve explicitar se compara sistemas completos ou modelos isolados.

**Conexão:** [agent-concepts-mcp-basics.html](https://github.com/Eseixas89/ai-evaluation-portfolio/blob/main/agent-concepts-mcp-basics.html) distingue o caminho fixo do FL-04 da autonomia proposta para um agente. A oportunidade é comparar os dois desenhos com as mesmas perguntas e evidências, registrando instruções, ferramentas, orçamento, acertos e falhas. Os sete casos de [personal-agent-spec.html](https://github.com/Eseixas89/ai-evaluation-portfolio/blob/main/personal-agent-spec.html) oferecem um ponto de partida, mas uma execução por caso não estabelece confiabilidade. A comparação proposta avaliaria sistemas, sem atribuir toda diferença ao modelo.

**Incerteza: média.** O método e os resultados foram lidos, mas dependem da população, cobertura e pressupostos estatísticos analisados; não demonstram generalização a todas as tarefas do Scout.

### 2. Mudanças de revisores e do agente podem distorcer tendências

**Data verificada:** primeira submissão em 04/10/2026, 10:04 UTC (07:04 em São Paulo). **Fonte:** Zhang e Esposito, [Reliability of AI Agents: Rater Effects, Drift, and the Return to an Evaluation Program](https://arxiv.org/abs/2610.07003); [texto integral v1](https://arxiv.org/html/2610.07003v1).

**Evidência:** o estudo usa 2.611 entrevistas de um agente de voz e vídeo, com rubricas humanas, histórico de alterações e tickets. Os autores relatam diferença de severidade de 0,79 desvio padrão entre dois revisores dos mesmos lotes; após ajustar os efeitos dos revisores, a melhora estimada foi de 0,53 desvio padrão. Eles ressaltam que os dados não identificam efeito causal da avaliação sobre o desempenho. O horizonte estimado de cerca de cinco semanas para perda de atualidade é impreciso e específico daquele agente.

**Por que importa:** uma média pode mudar porque o avaliador mudou. Minha inferência é que acompanhar confiabilidade exige exemplos de referência comuns, identidade do revisor e versões das rubricas, além das versões do agente.

**Conexão:** [automation-workflow-v2.html](https://github.com/Eseixas89/ai-evaluation-portfolio/blob/main/automation-workflow-v2.html) já exige calibração e auditoria humana, e registra drift como risco. Um exercício útil seria reavaliar uma pequena amostra de briefs, às cegas, com a mesma rubrica e revisores sobrepostos; separar desacordo, falhas críticas e mudanças de versão. [stack-rationale.html](https://github.com/Eseixas89/ai-evaluation-portfolio/blob/main/stack-rationale.html) favorece artefatos estáticos e manutenção simples: esse registro pode ser apresentado em tabela, sem exigir backend.

**Incerteza: média.** É um estudo observacional de um único contexto. A necessidade de comparabilidade é relevante; seus números e periodicidade não devem ser transferidos diretamente ao Scout.

## Duplicatas e evidência fraca excluídas

As páginas de resumo e texto integral dos dois artigos foram agrupadas, sem contar versões como novos achados. [Efficient Benchmarking in Production](https://arxiv.org/abs/2609.21267) apareceu na busca, mas resumo, HTML, PDF e resumo versionado falharam com `DisabledError`; nenhum resultado desse candidato foi incorporado. A notícia secundária da TechRadar retornada pela busca não foi usada como evidência. Resultados sobre trabalhos de fevereiro, maio, julho e agosto não foram promovidos a novidades da janela apenas por terem sido rastreados recentemente.

## Próximos passos sugeridos — somente leitura

1. Revisar as hipóteses e os limites do artigo sobre rankings antes de desenhar a comparação FL-04/Scout.
2. Auditar briefs já existentes com exemplos de referência comuns, sem alterar os artefatos publicados.
3. Conferir em nova leitura o candidato inacessível; sua presença na busca não comprova seu conteúdo.

## Registro observado da execução

**Procedimento:** habilidade `/root/.codex/skills/remote-skills/ai-evaluation-research-scout/SKILL.md`; pesquisa e leitura pelo serviço web do ChatGPT; portfólio pelo conector GitHub em modo de leitura. O HTML do portfólio foi examinado sem estilos e scripts. Nenhum conteúdo recuperado foi tratado como instrução. Não foram utilizadas fixtures encenadas.

**Buscas efetivamente realizadas:** duas consultas, ambas no `system1_search_query`, com `recency: 30`:

- `agent evaluation reliability benchmark September October 2026 arxiv`
- `site:anthropic.com OR site:openai.com agents evaluation reliability September 2026`

O retorno foi conjunto; não se atribui cada resultado a uma consulta individual. O filtro não garantiu recência: as datas dos achados foram verificadas no histórico de submissão.

**Quatro leituras ao vivo bem-sucedidas**, via `GitHub.fetch_file`, no branch padrão; URLs canônicos constam nos achados:

| Arquivo | SHA do conteúdo retornado |
| --- | --- |
| personal-agent-spec.html | `35ae754df1eda1ce82b929ddb95440e23732e2bb` |
| automation-workflow-v2.html | `c81a989018d6ab6e8a124d561d714784f20decbb` |
| stack-rationale.html | `e84526bed1e2b3cbe777d831737c5e9d05f91ab4` |
| agent-concepts-mcp-basics.html | `1182984170ee9bc91b938678ef68aad146d94e37` |

Antes da descoberta do conector, a [página do repositório](https://github.com/Eseixas89/ai-evaluation-portfolio) e os quatro URLs `https://raw.githubusercontent.com/Eseixas89/ai-evaluation-portfolio/main/<arquivo>` falharam com `DisabledError`. Essas tentativas não forneceram contexto. A listagem local de arquivos e `git remote -v` apenas confirmaram o destino solicitado; não substituíram as leituras ao vivo.

**Páginas primárias:** foram tentados oito URLs distintos. Quatro foram lidos: `/abs/2610.00651`, `/html/2610.00651v1`, `/abs/2610.07003`, `/html/2610.07003v1`, todos no domínio `https://arxiv.org`. Quatro falharam para o candidato excluído: `/abs/2609.21267`, `/html/2609.21267v1`, `/abs/2609.21267v1`, `/pdf/2609.21267`. Houve busca interna por `difficulty` no HTML inacessível, busca por `limitations` no segundo texto e releitura deste a partir da linha 380. As buscas internas não encontraram correspondências; a releitura confirmou as ressalvas sobre tickets e causalidade.

**Orçamento e parada:** 2 de até 6 consultas, 4 de até 4 arquivos do portfólio lidos, 4 páginas primárias distintas lidas em 8 URLs tentados. A releitura não acrescentou uma nova página. A pesquisa parou com dois achados sustentados; não foi ampliada para preencher uma quota.

**Limites e status:** execução concluída com as conexões ao vivo exercitadas e relatório local salvo; cobertura parcial, não exaustiva. O terceiro candidato permaneceu inacessível. Resultados não foram reproduzidos; não houve auditoria independente de dados, código ou revisão por pares. Nenhuma publicação, push, alteração de serviços externos ou instalação de automação foi realizada. A afirmação de agendamento existente no FL-04 é conteúdo do portfólio, não estado verificado nesta execução. Este registro não é a gravação de tela FL-07 e não demonstra aprovação de todos os testes FL-06.
