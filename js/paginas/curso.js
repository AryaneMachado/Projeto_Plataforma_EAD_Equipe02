// EQUIPE 2 — Catálogo e organização do curso (6 módulos × 3 aulas)
// A matrícula é da Equipe 1 e fica na plataforma integrada; aqui aparece só um aviso.
import { api } from '../api.js';
import { PLATAFORMA_URL } from '../config.js';
import { esc, icone, aviso, ilustracao } from '../ui.js';

export default async function curso({ raiz, atual }) {
  const { curso, modulos } = await api.estrutura();
  if (!atual()) return;
  const totalAulas = modulos.reduce((n, m) => n + m.aulas.length, 0);

  const blocoAcesso = `
    ${aviso('info', 'Matrícula na plataforma integrada.', 'O cadastro, a matrícula e as aulas ficam na plataforma completa do curso, que reúne o trabalho das seis equipes.')}
    ${PLATAFORMA_URL ? `<p style="margin-top:var(--e4)"><a class="btn btn-primario" href="${esc(PLATAFORMA_URL)}">${icone('globe')} Ir para a plataforma do curso</a></p>` : ''}`;

  raiz.innerHTML = `<div class="container">
    <nav class="trilha" aria-label="Você está em"><ol><li><a href="#/">Início</a></li><li aria-current="page">Curso</li></ol></nav>
    <div class="grade grade-2" style="align-items:start">
      <div>
        <h1 tabindex="-1">${esc(curso.titulo)}</h1>
        <p>${esc(curso.descricao)}</p>
        <ul class="linha" style="list-style:none;padding:0;margin:0 0 var(--e5)">
          <li class="selo">${icone('book', 16)} ${modulos.length} módulos</li>
          <li class="selo">${icone('video', 16)} ${totalAulas} aulas em vídeo</li>
          <li class="selo">${icone('edit', 16)} ${modulos.length} atividades práticas</li>
          <li class="selo">${icone('progress', 16)} Até 54 min de vídeo</li>
        </ul>
      </div>
      <div class="card" id="acesso"><h2>Acesso ao curso</h2>${blocoAcesso}</div>
    </div>

    <section class="secao" aria-labelledby="t-mod">
      <div class="linha entre" style="align-items:end">
        <h2 id="t-mod" style="margin:0">Módulos e aulas</h2>
        <div class="campo" style="margin:0;min-width:min(100%,340px)">
          <label for="busca">Buscar módulo</label>
          <input id="busca" type="search" placeholder="Pesquise por nome ou assunto" aria-describedby="busca-res">
        </div>
      </div>
      <p id="busca-res" class="aux" aria-live="polite" style="margin-top:var(--e3)">Mostrando ${modulos.length} módulos.</p>
      <ol class="pilha" id="lista-modulos" style="list-style:none;padding:0;margin:0">
        ${modulos.map(m => `
        <li class="card" data-busca="${esc((m.titulo + ' ' + m.objetivo + ' ' + m.aulas.map(a => a.titulo + ' ' + (a.conteudos || '')).join(' ')).toLowerCase())}">
          <div class="grade" style="grid-template-columns:120px 1fr;gap:var(--e5);align-items:start">
            ${ilustracao(m.id, 'ilustra-mini')}
            <div>
              <span class="etiqueta">Módulo ${m.ordem}</span>
              <h3>${esc(m.titulo)}</h3>
              <p><strong>Objetivo:</strong> ${esc(m.objetivo)}</p>
              <ol class="lista-simples">
                ${m.aulas.map(a => `<li><strong>Aula ${a.ordem}: ${esc(a.titulo)}</strong><br><span class="aux">${esc(a.conteudos || '')}</span></li>`).join('')}
              </ol>
              ${m.atividade ? `<p style="margin:var(--e4) 0 0" class="aux">${icone('edit', 16)} Atividade: ${esc(m.atividade.titulo)}</p>` : ''}
            </div>
          </div>
        </li>`).join('')}
      </ol>
    </section></div>`;

  // Busca de módulos
  const busca = raiz.querySelector('#busca'), res = raiz.querySelector('#busca-res');
  busca.addEventListener('input', () => {
    const t = busca.value.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    let n = 0;
    raiz.querySelectorAll('#lista-modulos > li').forEach(li => {
      const alvo = li.dataset.busca.normalize('NFD').replace(/[̀-ͯ]/g, '');
      const ok = !t || alvo.includes(t); li.hidden = !ok; if (ok) n++;
    });
    res.textContent = n ? `Mostrando ${n} de ${modulos.length} módulos.` : 'Nenhum módulo encontrado. Tente outra palavra.';
  });
}
