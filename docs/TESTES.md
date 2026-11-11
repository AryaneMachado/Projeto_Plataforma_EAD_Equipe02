# Registro de testes, problemas e correções (Equipe 2)

Formato pedido no caderno: **teste → problema encontrado → correção realizada**.
Os testes automatizados estão em [`testes/aceite.js`](../testes/aceite.js). Os prints de evidência são gerados em `testes/evidencias/`.

## Demonstração de aceite (automatizada)

Demonstração exigida no caderno: **percurso da landing page até o curso; ordem dos 6 módulos e dos 18 espaços**.

| Teste | O que confere | Evidência |
|---|---|---|
| Landing page | Apresentação, público, objetivos, orientações ("Como funciona"), os 6 módulos e o botão de acesso | `E2-01-landing` |
| Teclado na landing | O botão **Ver os 6 módulos** leva o foco até a lista, sem trocar de página | — |
| Percurso landing → curso | Ordem dos módulos 1 a 6, 18 aulas na ordem 1-2-3 de cada módulo, 6 atividades e foco no título da página | `E2-02-catalogo` |
| Busca de módulos | Encontra com e sem acento e avisa quando não encontra nada | `E2-03-busca-vazia` |
| Acesso ao curso | Mostra o aviso de matrícula na plataforma integrada (a matrícula é da Equipe 1) | — |
| Celular 390 px | Landing, menu e catálogo sem rolagem horizontal | `MOB-01` a `MOB-03` |
| Erros de JavaScript | Nenhum erro nas páginas durante os testes | — |

Em cada tela testada roda também uma verificação automática de **acessibilidade WCAG 2 A/AA** (axe-core), que inclui contraste, rótulos, nomes de botões e estrutura.

## Problemas encontrados e correções

Problemas das telas da Equipe 2, encontrados durante o desenvolvimento da plataforma integrada:

| # | Teste | Problema encontrado | Correção realizada |
|---|---|---|---|
| 1 | Visual da landing (1440 px) | O botão **Menu** do celular aparecia também no computador, porque o estilo `.btn` sobrescrevia `.menu-botao { display: none }` | Seletor mais específico (`.topo .menu-botao`), exibido só abaixo de 720 px |
| 2 | Visual do cabeçalho | O nome **Informática Básica** aparecia cinza, porque a regra do subtítulo atingia também o título | Seletor restrito ao subtítulo (`.marca > span > span`) |
| 3 | Navegação na landing | O botão **Ver os 6 módulos** usava o link `#modulos`, que o roteador interpretava como página inexistente | Troca por botão que rola até a seção e move o foco para ela |
| 4 | Celular 390 px | O nome da marca quebrava em duas linhas e empurrava o cabeçalho | No celular, a marca fica em 17 px numa linha só e o subtítulo é ocultado |
| 5 | Acessibilidade (contraste) | O coral da marca (#F2484B) com texto branco fica abaixo de 4,5:1 | Botões de destaque usam o coral semântico #BC2835 (6,01:1), como orienta a auditoria do Figma |

## Testes manuais recomendados antes da apresentação

- [ ] Fazer o percurso landing → curso com o **leitor de tela** (NVDA no Windows ou TalkBack no Android).
- [ ] Testar com **zoom de 200%** no navegador.
- [ ] Navegar só com o **teclado** (Tab, Shift+Tab, Enter), conferindo o foco visível.
- [ ] Testar em um **celular de verdade**, além do navegador.
