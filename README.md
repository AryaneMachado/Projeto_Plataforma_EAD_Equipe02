# Informática Básica — Equipe 2

Parte da **Equipe 2** no projeto integrador da disciplina **Educação a Distância**: landing page, catálogo e organização do curso **"Informática Básica — primeiros passos no mundo digital"**.

Este repositório reúne só o desenvolvimento atribuído à Equipe 2. A plataforma completa, com o trabalho das seis equipes (cadastro, matrícula, sala de aula, atividades e progresso), fica no repositório integrado.

| O que a Equipe 2 entrega | Onde está | Rota |
|---|---|---|
| Landing page (apresentação, público, objetivos, orientações, módulos e acesso) | `js/paginas/landing.js` | `#/` |
| Catálogo do curso com busca de módulos | `js/paginas/curso.js` | `#/curso` |
| Organização do curso: ordem e IDs dos 6 módulos, 18 aulas e 6 atividades | `js/data/estrutura.js` | — |

**Demonstração de aceite:** percurso da landing page até o curso, conferindo a ordem dos 6 módulos e dos 18 espaços de aula.

> **Base para as demais equipes:** este projeto já traz a identidade visual, o layout, a navegação e a estrutura oficial do curso. As outras equipes podem partir dele para desenvolver suas etapas, sem começar do zero. Veja a seção [Como usar este projeto como base](#5-como-usar-este-projeto-como-base).

## Tecnologias utilizadas

| Tecnologia | Para que é usada |
|---|---|
| **HTML5** | Estrutura da página única (`index.html`), com marcação semântica e acessível |
| **CSS3** | Design system em `css/styles.css`, com as cores, fontes e espaçamentos do Figma em variáveis CSS |
| **JavaScript (ES Modules)** | Telas, rotas e dados, sem frameworks e sem etapa de build: o navegador lê os arquivos direto |
| **Fonte Inter (Google Fonts)** | Tipografia do design system |
| **Node.js + http-server** | Servidor local para rodar o site (`npm start`) |
| **Playwright** | Testes automatizados no navegador, no computador e no celular |
| **axe-core** | Verificação automática de acessibilidade (WCAG 2 AA) |
| **Git + GitHub Pages** | Versionamento do código e publicação gratuita do site |

Não há banco de dados nem login neste projeto: a estrutura do curso vem do arquivo `js/data/estrutura.js`.

---

## 1. Como executar o projeto

O site precisa de um servidor local, porque os módulos JavaScript não abrem com duplo clique no `index.html`.

### Antes de começar

Instale o [**Node.js LTS**](https://nodejs.org). Se o VS Code ou o terminal já estiverem abertos, feche e abra de novo depois de instalar.

> Quem já tem Python pode usar `python -m http.server 8080` no lugar do passo 3. Para os testes, o Node.js continua sendo necessário.

### Passo a passo

1. Baixe ou clone o repositório.
2. No VS Code, abra a pasta do projeto (**File → Open Folder**) e abra o terminal com ``Ctrl + ` ``.
3. Inicie o servidor:
   ```
   npm start
   ```
   No Windows, se aparecer o erro **"a execução de scripts foi desabilitada"**, use `npm.cmd start`.
4. Quando aparecer `Available on:`, abra `http://localhost:8080` no navegador.

Deixe o terminal aberto enquanto usa o site. Para desligar o servidor, aperte `Ctrl + C` no terminal; se ele perguntar se deseja finalizar, responda `S`.

### Se algo der errado

| Problema | O que fazer |
|---|---|
| `npm` não é reconhecido | Instale o Node.js e feche e abra o terminal de novo |
| "A execução de scripts foi desabilitada" | Use `npm.cmd` e `npx.cmd` no lugar de `npm` e `npx` |
| A porta 8080 já está em uso | Feche o outro servidor (por exemplo, o da plataforma integrada) ou use outra porta: `npx --yes http-server -p 8081 -c-1` e abra `http://localhost:8081` |
| A página não abre ou fica em branco | Confira se o terminal continua rodando e se o endereço começa com `http://localhost`, não com `file://` |

## 2. Link para a plataforma integrada

No catálogo, o cartão **Acesso ao curso** explica que a matrícula é feita na plataforma integrada. Para mostrar também um botão com o link, preencha o endereço em `js/config.js`:

```js
export const PLATAFORMA_URL = 'https://usuario.github.io/Projeto_Plataforma_EAD/';
```

## 3. Publicar no GitHub Pages

1. No repositório, abra **Settings → Pages → Build and deployment**, escolha **Deploy from a branch**, depois a branch `main` e a pasta `/ (root)`, e salve.
2. Em 1 ou 2 minutos o link aparece no topo da mesma página.

## 4. Testes

No Windows, se os scripts estiverem bloqueados, use `npm.cmd` e `npx.cmd` nos comandos abaixo.

| Comando | O que faz |
|---|---|
| `npm install` e `npx playwright install chromium` | Preparação (só na primeira vez) |
| `npm start` (deixe rodando) e, em outro terminal, `npm test` | Testa a demonstração de aceite da Equipe 2 no computador e no celular (390 px), com verificação automática de acessibilidade WCAG 2 AA (axe-core). Salva prints em `testes/evidencias/` |

O registro dos testes, problemas e correções está em [`docs/TESTES.md`](docs/TESTES.md).

## 5. Como usar este projeto como base

Este projeto pode servir de ponto de partida para as etapas de desenvolvimento das demais equipes. Ele já resolve o que é comum a todas:

| Já pronto | Onde está |
|---|---|
| Identidade visual (cores, fontes, botões, cartões, avisos, campos) | `css/styles.css` |
| Cabeçalho, menu (também no celular), rodapé e foco no título a cada troca de página | `index.html` e `js/app.js` |
| Ícones, ilustrações dos módulos e avisos acessíveis | `js/ui.js` |
| Estrutura oficial do curso, com os IDs combinados entre as equipes | `js/data/estrutura.js` e `docs/ESTRUTURA.md` |
| Leitura da estrutura no mesmo formato da plataforma integrada | `js/api.js` → `api.estrutura()` |
| Testes no navegador com verificação de acessibilidade | `testes/aceite.js` |

### Para criar a tela de uma equipe

1. Crie um arquivo em `js/paginas/`, por exemplo `js/paginas/sala.js`, seguindo o modelo de `curso.js`:
   ```js
   import { api } from '../api.js';
   import { esc } from '../ui.js';

   export default async function sala({ raiz, atual }) {
     const { modulos } = await api.estrutura();
     if (!atual()) return;
     raiz.innerHTML = `<div class="container"><h1 tabindex="-1">Minha sala</h1>
       <p>${modulos.length} módulos</p></div>`;
   }
   ```
2. Em `js/app.js`, importe a tela e acrescente a rota na lista `ROTAS`:
   ```js
   import sala from './paginas/sala.js';
   // ...
   { p: '/sala', pagina: sala, titulo: 'Minha sala' },
   ```
3. Ainda em `js/app.js`, na função `cabecalho`, acrescente o link do menu: `link('/sala', 'Minha sala', 'video')`.
4. Abra `http://localhost:8080/#/sala` para ver a nova tela.

### Combinados para manter tudo integrado

- **Não mude os IDs** de curso, módulos, aulas e atividades (`info-basica`, `m1`…`m6`, `m1-a1`…`m6-a3`, `m1-at`…`m6-at`). Eles são usados por todas as equipes.
- Use os componentes e as classes do `styles.css` em vez de criar cores e estilos novos.
- Mostre textos que vêm de dados sempre com `esc()`, para evitar problemas de segurança.
- Use rótulos em todos os campos e textos de erro (não só cor), mantendo o foco visível.
- Não use links `href="#algo"` para pular para uma parte da página: o roteador entende como outra página. Use um botão com `scrollIntoView`, como o **Ver os 6 módulos** da landing.

## 6. Estrutura de pastas

```
index.html              página única (layout comum)
css/styles.css          design system: cores, tipografia, espaçamento, componentes
js/config.js            link da plataforma integrada (opcional)
js/app.js               rotas e cabeçalho
js/api.js               dados do curso, no mesmo formato da plataforma integrada
js/ui.js                componentes reutilizáveis (ícones, avisos, ilustrações)
js/data/estrutura.js    IDs e ordem de curso, módulos, aulas e atividades
js/paginas/landing.js   landing page
js/paginas/curso.js     catálogo e busca de módulos
docs/ESTRUTURA.md       contrato de IDs usado pelas outras equipes
docs/TESTES.md          registro de testes, problemas e correções
testes/aceite.js        testes automatizados
```
