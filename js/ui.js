// Componentes reutilizáveis do design system usados pelas telas da Equipe 2
// (mesmos da plataforma integrada, sem os componentes de formulário e de aula).

export const esc = (v) => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Ícones base 24 px, traço 2 px (Assets / Icons) — sempre com rótulo textual ao lado
const P = {
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  video: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m10 9 5 3-5 3z"/>',
  progress: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>',
  book: '<path d="M12 6c-2-1.5-5-2-8-1.5v14c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5v-14c-3-.5-6 0-8 1.5zM12 6v14"/>',
};
export const icone = (nome, tam = 20) =>
  `<svg aria-hidden="true" focusable="false" width="${tam}" height="${tam}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${P[nome] || ''}</svg>`;

// Marca: monitor com cursor
export const logo = (tam = 40) => `
<svg aria-hidden="true" width="${tam}" height="${tam}" viewBox="0 0 40 40" fill="none">
  <rect x="4" y="7" width="30" height="20" rx="3" stroke="#260B8C" stroke-width="2.5"/>
  <path d="M15 33h10M20 27v6" stroke="#260B8C" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M22 14l11 4.5-4.6 1.6-1.6 4.6z" fill="#F2484B" stroke="#BC2835" stroke-width="1.2" stroke-linejoin="round"/>
</svg>`;

// Cenas ilustradas por módulo (Assets / Illustrations) — decorativas, ocultas de leitores de tela
const SIMBOLOS = {
  m1: '<path d="M94 54l22 14-22 14z" fill="#F2484B"/>',
  m2: '<rect x="96" y="58" width="18" height="18" rx="2" fill="none" stroke="#F2484B" stroke-width="3"/><rect x="101" y="63" width="8" height="8" fill="#F2484B"/>',
  m3: '<circle cx="105" cy="67" r="10" fill="none" stroke="#F2484B" stroke-width="3"/><circle cx="105" cy="67" r="5" fill="none" stroke="#F2484B" stroke-width="3"/>',
  m4: '<rect x="92" y="58" width="26" height="18" rx="2" fill="#E5E7EB"/><path d="m92 59 13 9 13-9" fill="none" stroke="#B5BAC4" stroke-width="2"/>',
  m5: '<path d="M96 60h18M96 67h18M96 74h18" stroke="#F2484B" stroke-width="3" stroke-linecap="round"/>',
  m6: '<rect x="94" y="57" width="22" height="20" fill="none" stroke="#F2484B" stroke-width="2"/><path d="M94 64h22M94 70h22M101 57v20M108 57v20" stroke="#F2484B" stroke-width="1.5"/>',
};
export function ilustracao(chave = 'm1', classe = 'ilustra') {
  const cor = chave === 'm2' ? '#F59E0B' : '#3711BF';
  return `<svg class="${classe}" aria-hidden="true" viewBox="0 0 210 134" fill="none">
    <circle cx="105" cy="67" r="66" fill="#EBEBF5"/>
    <rect x="55" y="34" width="100" height="70" rx="8" fill="${cor}"/>
    <rect x="63" y="40" width="84" height="46" rx="4" fill="#fff"/>
    ${SIMBOLOS[chave] || ''}
  </svg>`;
}

// ---------- Avisos acessíveis ----------
export function anunciar(texto) {
  const r = document.getElementById('anuncio');
  if (!r) return;
  r.textContent = '';
  setTimeout(() => { r.textContent = texto; }, 50);
}

export const aviso = (tipo, titulo, texto = '') =>
  `<div class="aviso st-${tipo}" ${tipo === 'erro' ? 'role="alert"' : ''}><p><span class="st-txt">${esc(titulo)}</span>${texto ? ` ${esc(texto)}` : ''}</p></div>`;
