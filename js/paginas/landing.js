// EQUIPE 2 — Landing page do curso Informática Básica
import { api } from '../api.js';
import { esc, icone, ilustracao } from '../ui.js';

const CTA = { href: '#/curso', texto: 'Conhecer o curso' };

export default async function landing({ raiz, atual }) {
  const { curso, modulos } = await api.estrutura();
  if (!atual()) return;
  const totalAulas = modulos.reduce((n, m) => n + m.aulas.length, 0);

  raiz.innerHTML = `
  <div class="container">
    <section class="hero" aria-labelledby="titulo-curso">
      <div>
        <span class="etiqueta">Curso on-line e gratuito</span>
        <h1 id="titulo-curso">${esc(curso.titulo)}: primeiros passos no mundo digital</h1>
        <p class="lead">${esc(curso.descricao)}</p>
        <div class="linha" style="margin-top:var(--e5)">
          <a class="btn btn-primario" href="${CTA.href}" id="cta-principal">${esc(CTA.texto)} ${icone('arrow')}</a>
          <button type="button" class="btn btn-secundario" id="ver-modulos">Ver os 6 módulos</button>
        </div>
      </div>
      ${ilustracao('m1')}
    </section>

    <section class="grade grade-3" aria-label="Resumo do curso">
      <div class="card"><div style="color:var(--roxo)">${icone('video', 28)}</div><h2 class="numero-grande" style="margin:var(--e2) 0 0">${totalAulas} vídeos</h2><p class="aux">de até 3 minutos cada, com legendas.</p></div>
      <div class="card"><div style="color:var(--roxo)">${icone('edit', 28)}</div><h2 class="numero-grande" style="margin:var(--e2) 0 0">${modulos.length} atividades</h2><p class="aux">práticas, uma por módulo, com retorno do professor.</p></div>
      <div class="card"><div style="color:var(--roxo)">${icone('progress', 28)}</div><h2 class="numero-grande" style="margin:var(--e2) 0 0">No seu ritmo</h2><p class="aux">Cerca de 1 hora de vídeo, mais o tempo das práticas.</p></div>
    </section>

    <section class="secao grade grade-2" aria-labelledby="t-publico">
      <div class="card">
        <h2 id="t-publico">Para quem é este curso</h2>
        <p>Para jovens e adultos que têm pouca ou nenhuma experiência com o computador e querem ganhar autonomia no dia a dia.</p>
        <h3>O que você precisa para começar</h3>
        <ul class="lista-simples">
          <li>Um computador ou notebook com acesso à internet.</li>
          <li>Vontade de aprender. Não é preciso saber nada antes.</li>
          <li>Para o módulo 4, uma conta de e-mail (a criação da conta não faz parte do curso).</li>
        </ul>
      </div>
      <div class="card">
        <h2>Ao final, você será capaz de</h2>
        <ul class="lista-simples">${modulos.map(m => `<li>${esc(m.objetivo)}</li>`).join('')}</ul>
      </div>
    </section>

    <section class="secao" aria-labelledby="t-como">
      <h2 id="t-como">Como funciona</h2>
      <ol class="grade grade-3" style="list-style:none;padding:0;margin:0">
        <li class="card"><span class="passo-num">1</span><h3>Crie sua conta e matricule-se</h3><p>O cadastro pede só nome, e-mail e senha.</p></li>
        <li class="card"><span class="passo-num">2</span><h3>Assista às aulas na ordem</h3><p>Cada módulo tem 3 vídeos curtos. Você pode pausar, voltar e ler a transcrição.</p></li>
        <li class="card"><span class="passo-num">3</span><h3>Pratique e receba retorno</h3><p>Faça a atividade do módulo, confira a lista e acompanhe seu progresso.</p></li>
      </ol>
    </section>

    <section class="secao" id="modulos" aria-labelledby="t-modulos" tabindex="-1">
      <div class="linha entre"><h2 id="t-modulos" style="margin:0">Os 6 módulos do curso</h2><a href="#/curso">Ver detalhes de cada aula</a></div>
      <ol class="grade grade-3" style="list-style:none;padding:0;margin:var(--e5) 0 0">
        ${modulos.map(m => `
        <li class="card modulo-card">
          <span class="num">Módulo ${m.ordem}</span>
          <h3>${esc(m.titulo)}</h3>
          <p class="aux">${esc(m.objetivo)}</p>
          <ol>${m.aulas.map(a => `<li>${esc(a.titulo)}</li>`).join('')}</ol>
        </li>`).join('')}
      </ol>
    </section>

    <section class="secao">
      <div class="card linha entre" style="background:var(--indigo);color:#fff;border:0">
        <div><h2 style="color:#fff;margin-bottom:var(--e2)">Pronto para dar o primeiro passo?</h2><p style="margin:0;color:#E6E8F5">Comece pelo módulo 1 e avance no seu ritmo.</p></div>
        <a class="btn btn-destaque" href="${CTA.href}">${esc(CTA.texto)}</a>
      </div>
    </section>
  </div>`;
  raiz.querySelector('#ver-modulos').addEventListener('click', () => {
    const s = raiz.querySelector('#modulos'); s.scrollIntoView({ behavior: 'smooth' }); s.focus({ preventScroll: true });
  });
}
