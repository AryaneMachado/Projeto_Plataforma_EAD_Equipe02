# Estrutura do curso e contrato de identificadores (Equipe 2)

A Equipe 2 é responsável pela **organização do curso**: a ordem dos 6 módulos, dos 18 espaços de aula e das 6 atividades, e os identificadores que todas as equipes usam na plataforma integrada.

A fonte única dessa estrutura é o arquivo [`js/data/estrutura.js`](../js/data/estrutura.js). Ele é o mesmo arquivo usado na plataforma integrada; se algo mudar aqui, o arquivo de lá precisa ser atualizado também.

## Identificadores acordados

| Entidade | Padrão | Exemplo | Quantidade |
|---|---|---|---|
| Curso | texto fixo | `info-basica` | 1 |
| Módulo | `m` + ordem | `m2` | 6 (`m1` … `m6`) |
| Aula | módulo + `-a` + ordem | `m2-a3` | 18 (3 por módulo) |
| Atividade | módulo + `-at` | `m2-at` | 6 (1 por módulo) |

Mapa completo das aulas: m1-a1, m1-a2, m1-a3 · m2-a1 … m2-a3 · m3-a1 … m3-a3 · m4-a1 … m4-a3 · m5-a1 … m5-a3 · m6-a1 … m6-a3.

## Ordem do curso

| Ordem | ID | Módulo | Equipe responsável pelo conteúdo |
|---|---|---|---|
| 1 | `m1` | Primeiros passos no computador | 1 |
| 2 | `m2` | Organização de arquivos e pastas | 2 |
| 3 | `m3` | Navegação e pesquisa na internet | 3 |
| 4 | `m4` | Comunicação por e-mail | 4 |
| 5 | `m5` | Produção de documentos de texto | 5 |
| 6 | `m6` | Introdução às planilhas | 6 |

Os títulos, objetivos e conteúdos de cada aula estão em `estrutura.js`.

## Como as outras equipes usam esta estrutura

Na plataforma integrada, `api.estrutura()` devolve:

```js
{
  curso: { id, titulo, descricao },
  modulos: [
    { id, ordem, titulo, objetivo, equipe,
      aulas: [ { id, modulo_id, ordem, titulo, conteudos, ... } ],  // em ordem
      atividade: { id, modulo_id, titulo, instrucoes, modo, criterios, checklist } }
  ]                                                                  // em ordem
}
```

Este repositório mantém o **mesmo formato** em [`js/api.js`](../js/api.js), lendo os dados direto de `estrutura.js`, sem login e sem banco.

| Equipe | O que recebe da Equipe 2 |
|---|---|
| 3 · Conteúdo e publicação | O espaço de cada aula (`m1-a1` … `m6-a3`) onde o vídeo é publicado |
| 4 · Sala de aula | A ordem dos módulos e aulas para avançar e voltar |
| 5 · Atividades | A atividade de cada módulo (`m1-at` … `m6-at`) |
| 6 · Progresso | Os totais: 18 aulas e 6 atividades |
