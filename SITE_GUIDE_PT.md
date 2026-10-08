# Como entender e cuidar do teu site

O site é uma pasta de arquivos publicada pelo GitHub Pages. O navegador recebe esses arquivos e monta a página. Tu não precisas manter um servidor ligado em casa.

HTML organiza o conteúdo: títulos, parágrafos, seções e links. CSS determina a aparência: cores, tamanhos, espaços e posição dos elementos.

## O que cada arquivo faz

| Arquivo | Função |
|---|---|
| `index.html` | Página inicial: apresentação, projetos, competências, experiência e contato. |
| `styles.css` | Aparência da página inicial e da nota de DNS. As regras `@media` ajustam a página para celular, impressão e preferência por movimento reduzido. |
| `favicon.svg` | Ícone circular com ES na aba do navegador. |
| `assets/Eduardo_Seixas_CV.pdf` | Cópia do currículo em inglês que tu enviaste. O botão de download aponta para esse arquivo. |
| `dns-walkthrough.html` | Explicação de como o endereço se transforma em acesso ao site. |
| `.nojekyll` | Indica que os arquivos serão publicados diretamente, sem o gerador Jekyll. |
| `.github/workflows/pages.yml` | Publicação automática: obtém os arquivos do repositório, prepara o Pages, envia os arquivos e publica. |
| `README.md` | Apresentação do repositório e instruções de manutenção. |
| `SITE_GUIDE_PT.md` | Este guia. |

As páginas de projetos já existentes continuam disponíveis. O diretório `fl-07-agent` contém um programa Python separado; ele não é executado quando alguém visita teu site.

## Como os links funcionam

`href="#work"` leva para a seção da mesma página que tem `id="work"`.

`href="build-the-agent.html"` abre um arquivo da mesma pasta.

`href="https://github.com/Eseixas89"` abre um endereço externo.

`href="mailto:..."` solicita ao dispositivo que abra o aplicativo de e-mail configurado. O botão de conversa já prepara assunto e texto, mas ninguém recebe uma mensagem até o visitante enviá-la. Ele não marca automaticamente um horário.

O atributo `download` no link do currículo pede ao navegador para baixar o PDF. O link de leitura abre o mesmo arquivo sem essa indicação.

## Como alterar um texto

Abre `index.html` no GitHub, usa o botão de edição e encontra o texto. Mantém as marcações ao redor. Por exemplo, `<p>Meu texto antigo.</p>` pode passar a ser `<p>Meu texto atualizado.</p>`.

Para alterar o destino de um botão, modifica o valor entre aspas depois de `href=`. Se um link contiver `&`, usa `&amp;` no HTML.

## Como publicar e verificar

Um commit na branch `main` dispara o workflow existente. Abre a aba Actions do repositório e verifica se Deploy GitHub Pages terminou com sucesso.

Depois abre https://eseixas89.github.io/ai-evaluation-portfolio/ em uma janela privada. Confere os botões, o currículo, os projetos e a apresentação no celular. Se a versão antiga continuar aparecendo, tenta recarregar a página sem usar o cache.

Para visualizar no teu computador, com Python instalado, executa `python -m http.server 8000` dentro da pasta do repositório e abre http://localhost:8000. Para encerrar, usa Ctrl+C.

## Como explicar o projeto para o avaliador

Uma explicação que podes praticar e adaptar com tuas palavras:

“Usei HTML para organizar o conteúdo do portfólio e CSS para a aparência e adaptação ao celular. Os arquivos estão no meu GitHub. O GitHub Actions envia os arquivos para o GitHub Pages quando a branch principal recebe uma alteração. O site usa HTTPS e o domínio gratuito do GitHub. As páginas mostram minha experiência e links para trabalhos verificáveis. Não há banco de dados nem formulário com servidor; o contato funciona por e-mail. Usei assistência de IA na construção e revisei o conteúdo e o funcionamento.”

## Para concluir a tarefa da FlyRank

- Usa o endereço público do site em Deliverable links.
- A nota de DNS está em https://eseixas89.github.io/ai-evaluation-portfolio/dns-walkthrough.html. Lê, entende e reescreve com tuas palavras antes de entregar; a tarefa pede autoria pessoal.
- O contato atual usa e-mail, como tu escolheste. Se exigirem um calendário, cria um link de agendamento e substitui o `mailto` do botão de conversa.
- Acrescenta o endereço do portfólio ao teu LinkedIn e ao currículo. A cópia atual do PDF não foi modificada.
- Quando aprovarem teu capstone e fornecerem o selo oficial, acrescenta o arquivo do selo e uma imagem na página.
