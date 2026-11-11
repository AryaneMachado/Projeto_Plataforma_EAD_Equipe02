// =====================================================================
// ESTRUTURA COMPARTILHADA DO CURSO — responsabilidade da Equipe 2
// Identificadores e ordem de curso, módulo, aula e atividade usados por
// todas as equipes (conteúdo, sala, atividades e progresso).
// Esta é a ÚNICA fonte da estrutura. Na plataforma integrada, o modo
// demonstração lê daqui e o supabase/seed.sql é gerado a partir daqui.
// Ao mudar algo aqui, atualize também o mesmo arquivo na plataforma integrada.
// Padrão de IDs:  curso "info-basica" · módulos m1…m6 · aulas m1-a1…m6-a3
//                 atividades m1-at…m6-at
// =====================================================================

export const CURSO = {
  id: 'info-basica',
  titulo: 'Informática Básica',
  subtitulo: 'primeiros passos no mundo digital',
  descricao:
    'Curso on-line e assíncrono para jovens e adultos com pouca experiência no computador. ' +
    'Você vai aprender a usar o computador com autonomia: organizar arquivos, navegar na internet, ' +
    'comunicar-se por e-mail e produzir documentos e planilhas simples.',
};

const teste = '[Conteúdo de teste — o vídeo final será publicado na etapa 3]';

export const MODULOS = [
  {
    id: 'm1', ordem: 1, equipe: 1,
    titulo: 'Primeiros passos no computador',
    objetivo: 'Reconhecer os principais componentes e utilizar mouse e teclado para ações básicas.',
    aulas: [
      ['Conhecendo o computador', 'Funções de monitor, gabinete, teclado e mouse; diferenças básicas entre computador de mesa e notebook; botão de energia.', 'Apresentar os componentes e explicar sua função com exemplos simples.'],
      ['Utilizando o mouse', 'Ponteiro, clique simples, clique duplo, botão direito, rolagem e ação de arrastar.', 'Selecionar e abrir um item, exibir um menu e rolar uma página.'],
      ['Utilizando o teclado', 'Letras, números, espaço, Enter, Backspace, Shift e Caps Lock.', 'Digitar uma frase, inserir maiúscula, corrigir uma palavra e iniciar outra linha.'],
    ],
    atividade: {
      titulo: 'Prática: digitando no editor',
      instrucoes: 'Abra um editor de texto simples (como o Bloco de Notas) e digite seu nome e uma frase de apresentação. Corrija uma palavra e insira uma segunda linha. Depois, tire um print da tela e envie aqui.',
      modo: 'arquivo',
      criterios: ['Abertura do programa', 'Digitação do nome e da frase', 'Correção de uma palavra', 'Texto em duas linhas'],
      checklist: ['O editor aparece aberto no print', 'Meu nome e a frase estão digitados', 'O texto tem duas linhas'],
    },
  },
  {
    id: 'm2', ordem: 2, equipe: 2,
    titulo: 'Organização de arquivos e pastas',
    objetivo: 'Criar pastas e organizar arquivos, compreendendo onde estão armazenados.',
    aulas: [
      ['Área de trabalho e janelas', 'Área de trabalho, ícones, barra de tarefas; abrir, minimizar, maximizar e fechar janelas.', 'Abrir o gerenciador de arquivos e demonstrar os controles da janela.'],
      ['Criando e nomeando pastas', 'Diferença entre arquivo e pasta; pasta e subpasta; nomes que facilitam identificação.', 'Criar "Curso de Informática" e as subpastas "Documentos" e "Imagens".'],
      ['Organizando e localizando arquivos', 'Copiar, recortar e colar; diferença entre copiar e mover; pasta Downloads.', 'Localizar um arquivo de exemplo, copiá-lo para uma pasta e movê-lo para outra.'],
    ],
    atividade: {
      titulo: 'Prática: organizando minhas pastas',
      instrucoes: 'Crie a pasta "Curso de Informática" com as subpastas "Documentos" e "Imagens". Baixe os dois arquivos de exemplo da aula e coloque cada um na subpasta correta. Tire um print do gerenciador de arquivos mostrando a estrutura e envie aqui.',
      modo: 'arquivo',
      criterios: ['Nomes das pastas', 'Local correto de cada arquivo'],
      checklist: ['Arquivo na pasta do módulo', 'Nome identifica a atividade', 'Formato e tamanho permitidos'],
    },
  },
  {
    id: 'm3', ordem: 3, equipe: 3,
    titulo: 'Navegação e pesquisa na internet',
    objetivo: 'Acessar páginas e realizar pesquisas simples, observando a origem das informações.',
    aulas: [
      ['Acessando páginas', 'Função do navegador; barra de endereços; links; abas; voltar e atualizar.', 'Digitar um endereço institucional, abrir um link e retornar à página anterior.'],
      ['Realizando uma pesquisa', 'Endereço e termo de pesquisa; palavras-chave; títulos e descrições dos resultados.', 'Pesquisar "curso gratuito de informática básica" e tornar a busca específica acrescentando uma cidade.'],
      ['Verificando uma informação', 'Instituição ou autoria; data, quando disponível; comparação de fontes; resultados patrocinados.', 'Mostrar onde procurar a origem e a data. Explicar que aparecer primeiro não garante confiabilidade.'],
    ],
    atividade: {
      titulo: 'Prática: encontrando uma informação confiável',
      instrucoes: 'Localize uma informação sobre um serviço ou curso em um site institucional. Registre abaixo o título da página, a instituição responsável e o link.',
      modo: 'texto',
      criterios: ['O link corresponde à informação', 'A origem (instituição) foi identificada'],
      checklist: ['Escrevi o título da página', 'Escrevi a instituição responsável', 'Colei o link completo'],
    },
  },
  {
    id: 'm4', ordem: 4, equipe: 4,
    titulo: 'Comunicação por e-mail',
    objetivo: 'Escrever e enviar mensagens claras, incluindo arquivos anexos.',
    aulas: [
      ['Conhecendo o ambiente de e-mail', 'Caixa de entrada, enviados, rascunhos e lixeira; destinatário, assunto e corpo da mensagem.', 'Apresentar as áreas e abrir uma nova mensagem em conta de demonstração.'],
      ['Escrevendo e respondendo', 'Assunto, saudação, mensagem e identificação; revisão do destinatário; responder e responder a todos.', 'Preparar pedido de informações sobre um curso e mostrar como responder a uma mensagem.'],
      ['Trabalhando com anexos', 'Anexar, conferir e baixar arquivos; cuidados com anexos desconhecidos.', 'Anexar documento de exemplo e mostrar onde localizar um arquivo baixado.'],
    ],
    atividade: {
      titulo: 'Prática: enviando um e-mail com anexo',
      instrucoes: 'Envie ao endereço indicado pelo professor uma mensagem com o assunto "Atividade — Informática Básica", uma breve apresentação e o arquivo de exemplo anexado. Depois, confirme aqui que enviou. Pré-requisito: ter acesso a uma conta de e-mail.',
      modo: 'autodeclaracao',
      criterios: ['Destinatário correto', 'Assunto correto', 'Mensagem clara', 'Anexo presente'],
      checklist: ['Conferi o destinatário', 'Usei o assunto pedido', 'Anexei o arquivo de exemplo'],
    },
  },
  {
    id: 'm5', ordem: 5, equipe: 5,
    titulo: 'Produção de documentos de texto',
    objetivo: 'Criar, formatar e salvar um documento simples.',
    aulas: [
      ['Criando um documento', 'Documento em branco; título e parágrafo; seleção e correção de trechos.', 'Criar "Minha apresentação" com um parágrafo contendo dados fictícios.'],
      ['Formatando o conteúdo', 'Tamanho da fonte, negrito, alinhamento e lista com marcadores.', 'Destacar o título, alinhar o parágrafo à esquerda e listar três habilidades a aprender.'],
      ['Salvando e exportando', 'Nome e local do arquivo; documento editável e PDF; exportação ou download.', 'Salvar "Minha_apresentacao" em formato editável e gerar PDF, mostrando onde encontrá-los.'],
    ],
    atividade: {
      titulo: 'Prática: minha apresentação',
      instrucoes: 'Produza um documento com título, um parágrafo de apresentação e uma lista de três objetivos de aprendizagem. Salve a versão editável e a versão em PDF. Envie aqui o arquivo PDF.',
      modo: 'arquivo',
      criterios: ['Elementos solicitados (título, parágrafo e lista)', 'Legibilidade', 'Abertura dos dois arquivos'],
      checklist: ['O documento tem título, parágrafo e lista', 'Salvei a versão editável', 'Estou enviando a versão em PDF'],
    },
  },
  {
    id: 'm6', ordem: 6, equipe: 6,
    titulo: 'Introdução às planilhas',
    objetivo: 'Organizar valores em uma tabela e calcular um total com fórmula simples.',
    aulas: [
      ['Conhecendo uma planilha', 'Células, linhas, colunas; endereços A1 e B2; textos e números.', 'Inserir "Item" em A1 e "Valor" em B1.'],
      ['Organizando despesas', 'Preenchimento, largura das colunas, destaque do cabeçalho e formatação monetária.', 'Inserir caderno R$ 15,00, caneta R$ 5,00 e pasta R$ 10,00 nas linhas 2 a 4.'],
      ['Calculando e atualizando o total', 'Sinal de igual, referências a células, soma e atualização automática.', 'Inserir =B2+B3+B4, obter R$ 30,00 e alterar um valor para mostrar o recálculo.'],
    ],
    atividade: {
      titulo: 'Prática: minha tabela de despesas',
      instrucoes: 'Crie uma tabela com três despesas fictícias e calcule o total por fórmula. Altere um valor e observe o resultado. Envie um print mostrando a fórmula e o total.',
      modo: 'arquivo',
      criterios: ['Organização da tabela', 'Uso de fórmula', 'Atualização do total'],
      checklist: ['A tabela tem três despesas', 'O total usa fórmula', 'O print mostra a fórmula'],
    },
  },
];

/** Linhas "planas" prontas para o banco (mesma forma no modo demo e no Supabase). */
export function linhasIniciais() {
  const modulos = [], aulas = [], atividades = [];
  for (const m of MODULOS) {
    modulos.push({ id: m.id, curso_id: CURSO.id, ordem: m.ordem, titulo: m.titulo, objetivo: m.objetivo, equipe: m.equipe });
    m.aulas.forEach(([titulo, conteudos, demonstracao], i) => {
      aulas.push({
        id: `${m.id}-a${i + 1}`, modulo_id: m.id, ordem: i + 1,
        titulo, objetivo: m.objetivo, conteudos, demonstracao,
        orientacao: teste, video_url: '', legenda_url: '', transcricao: '',
        material_url: '', material_nome: '', creditos: `Equipe ${m.equipe}`,
        status: 'publicado', conteudo_teste: true,
      });
    });
    atividades.push({
      id: `${m.id}-at`, modulo_id: m.id, titulo: m.atividade.titulo,
      instrucoes: m.atividade.instrucoes, modo: m.atividade.modo,
      criterios: m.atividade.criterios.map((texto, i) => ({ id: `c${i + 1}`, texto })),
      checklist: m.atividade.checklist,
    });
  }
  return { curso: { id: CURSO.id, titulo: CURSO.titulo, descricao: CURSO.descricao }, modulos, aulas, atividades };
}

export const TOTAL_AULAS = 18;
export const TOTAL_ATIVIDADES = 6;
