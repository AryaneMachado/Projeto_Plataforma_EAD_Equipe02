// Aplicação da Equipe 2: layout comum e roteamento por hash.
// Telas: landing page (#/) e catálogo/organização do curso (#/curso).
import { icone, logo, anunciar, aviso } from './ui.js';
import landing from './paginas/landing.js';
import curso from './paginas/curso.js';

const ROTAS = [
  { p: '/', pagina: landing, titulo: 'Início' },
  { p: '/curso', pagina: curso, titulo: 'Curso e módulos' },
];

function cabecalho(caminho) {
  const link = (href, txt, ic) => `<li><a href="#${href}" ${caminho === href ? 'aria-current="page"' : ''}>${icone(ic)}<span>${txt}</span></a></li>`;
  const itens = [link('/', 'Início', 'home'), link('/curso', 'Curso', 'book')];
  return `
  <div class="container">
    <a class="marca" href="#/">${logo()}<span><strong>Informática Básica</strong><span>primeiros passos no mundo digital</span></span></a>
    <button type="button" class="btn btn-secundario menu-botao" aria-expanded="false" aria-controls="nav-principal">${icone('menu')}<span>Menu</span></button>
    <nav class="nav" id="nav-principal" aria-label="Principal"><ul>${itens.join('')}</ul></nav>
  </div>`;
}

function ligarCabecalho() {
  const topo = document.getElementById('topo');
  const btn = topo.querySelector('.menu-botao'), nav = topo.querySelector('.nav');
  btn?.addEventListener('click', () => { const ab = nav.classList.toggle('aberto'); btn.setAttribute('aria-expanded', String(ab)); });
  nav.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('aberto')) { nav.classList.remove('aberto'); btn.setAttribute('aria-expanded', 'false'); btn.focus(); } });
}

let contador = 0;
async function render() {
  const n = ++contador;
  const caminho = (location.hash.slice(1) || '/').split('?')[0];
  const raiz = document.getElementById('conteudo');

  document.getElementById('topo').innerHTML = cabecalho(caminho);
  ligarCabecalho();

  const rota = ROTAS.find(r => r.p === caminho);
  if (!rota) {
    raiz.innerHTML = `<div class="container"><div class="card vazio"><h1 tabindex="-1">Página não encontrada</h1><p style="margin:0 auto var(--e5)">O endereço pode ter mudado.</p><a class="btn btn-primario" href="#/">Voltar ao início</a></div></div>`;
    return focar('Página não encontrada');
  }
  document.title = `${rota.titulo} · Informática Básica`;

  raiz.innerHTML = '<div class="carregando" role="status">Carregando…</div>';
  try {
    await rota.pagina({ raiz, atual: () => n === contador });
  } catch (e) {
    if (n !== contador) return;
    raiz.innerHTML = `<div class="container"><div class="card vazio" style="max-width:640px;margin:0 auto"><h1 tabindex="-1">Não foi possível abrir esta página</h1>${aviso('erro', 'Erro.', e.message)}<p style="margin:var(--e5) auto 0"><a class="btn btn-primario" href="#/">Voltar ao início</a></p></div></div>`;
  }
  if (n === contador) focar(document.querySelector('#conteudo h1')?.textContent || rota.titulo);
}

let primeira = true;
function focar(titulo) {
  if (primeira) { primeira = false; return; } // na 1ª carga mantém o foco natural
  const h1 = document.querySelector('#conteudo h1');
  if (h1) { h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: false }); }
  window.scrollTo(0, 0);
  anunciar(`Página: ${titulo}`);
}

window.addEventListener('hashchange', render);
render();
