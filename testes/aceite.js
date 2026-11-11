// Testes automatizados da DEMONSTRAÇÃO DE ACEITE da Equipe 2.
// Uso:  npm install && npx playwright install chromium   (1ª vez)
//       npm start (deixe rodando)  →  em outro terminal: npm test
const { chromium, devices } = require('playwright');
const fs = require('fs'), path = require('path');
const AXE = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const URL = process.env.URL || 'http://localhost:8080/';
const SAIDA = path.join(__dirname, 'evidencias'); fs.mkdirSync(SAIDA, { recursive: true });

const resultados = [];
const passo = async (nome, fn) => {
  try { await fn(); resultados.push([nome, 'OK', '']); console.log(`✔ ${nome}`); }
  catch (e) { resultados.push([nome, 'FALHOU', e.message.split('\n')[0]]); console.log(`✘ ${nome}\n   ${e.message.split('\n')[0]}`); }
};
const ok = (c, m) => { if (!c) throw new Error(m); };
const foto = (p, n) => p.screenshot({ path: path.join(SAIDA, n + '.png'), fullPage: true });
async function axe(p, nome) {
  await p.addScriptTag({ content: AXE });
  const r = await p.evaluate(async () => (await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa'] })).violations.map(v => `${v.id} (${v.nodes.length})`));
  ok(r.length === 0, `${nome}: ${r.join(', ')}`);
}

(async () => {
  const b = await chromium.launch();
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })).newPage();
  const erros = []; p.on('pageerror', e => erros.push(e.message));
  await p.goto(URL); await p.waitForSelector('#conteudo h1');

  await passo('Landing page com apresentação, público, objetivos, orientações, módulos e acesso', async () => {
    const t = await p.textContent('#conteudo');
    for (const s of ['Para quem é este curso', 'Ao final, você será capaz de', 'Como funciona', 'Os 6 módulos do curso', 'Conhecer o curso']) ok(t.includes(s), 'faltou: ' + s);
    ok((await p.locator('.modulo-card').count()) === 6, 'landing com 6 módulos');
    await foto(p, 'E2-01-landing'); await axe(p, 'landing');
  });

  await passo('Botão "Ver os 6 módulos" leva o foco à lista de módulos (teclado)', async () => {
    await p.focus('#ver-modulos'); await p.keyboard.press('Enter'); await p.waitForTimeout(400);
    ok(await p.evaluate(() => document.activeElement.id) === 'modulos', 'foco na seção de módulos');
    ok((await p.evaluate(() => location.hash)) !== '#modulos', 'não trocou de rota');
  });

  await passo('Percurso landing → curso; ordem dos 6 módulos e 18 espaços de aula', async () => {
    await p.click('text=Ver detalhes de cada aula'); await p.waitForTimeout(400);
    ok(await p.evaluate(() => document.activeElement.tagName) === 'H1', 'foco no título da página');
    const mods = await p.locator('#lista-modulos > li .etiqueta').allTextContents();
    ok(mods.length === 6 && mods.every((m, i) => m.startsWith(`Módulo ${i + 1}`)), 'ordem dos módulos: ' + mods);
    const aulas = await p.locator('#lista-modulos > li ol > li').allTextContents();
    ok(aulas.length === 18, `aulas=${aulas.length}`);
    ok(aulas.every((a, i) => a.startsWith(`Aula ${(i % 3) + 1}:`)), 'ordem das aulas dentro dos módulos');
    ok((await p.locator('#lista-modulos .aux:has-text("Atividade:")').count()) === 6, '6 atividades');
    await foto(p, 'E2-02-catalogo'); await axe(p, 'catálogo');
  });

  await passo('Busca de módulos, com e sem acento, e mensagem quando não encontra', async () => {
    await p.fill('#busca', 'planilha'); ok((await p.locator('#lista-modulos > li:visible').count()) === 1, 'planilha');
    await p.fill('#busca', 'navegacao'); ok((await p.locator('#lista-modulos > li:visible').count()) >= 1, 'sem acento');
    await p.fill('#busca', 'xyzabc'); ok((await p.textContent('#busca-res')).includes('Nenhum módulo'), 'nenhum');
    await foto(p, 'E2-03-busca-vazia'); await p.fill('#busca', '');
  });

  await passo('Catálogo mostra aviso de matrícula na plataforma integrada (Equipe 1)', async () => {
    ok((await p.textContent('#acesso')).includes('plataforma integrada'), 'aviso');
    ok((await p.locator('#btn-matricular').count()) === 0, 'sem botão de matrícula');
  });

  // ---------------- CELULAR 390 px ----------------
  const m = await (await b.newContext({ ...devices['iPhone 12'], viewport: { width: 390, height: 844 } })).newPage();
  m.on('pageerror', e => erros.push(e.message));
  await m.goto(URL); await m.waitForSelector('#conteudo h1');
  await passo('Celular 390 px: landing, menu e catálogo sem rolagem horizontal', async () => {
    ok(await m.evaluate(() => document.documentElement.scrollWidth) <= 390, 'landing sem rolagem horizontal');
    await foto(m, 'MOB-01-landing'); await axe(m, 'landing celular');
    await m.click('.menu-botao'); ok(await m.isVisible('#nav-principal'), 'menu abre'); await foto(m, 'MOB-02-menu');
    await m.click('#nav-principal >> text=Curso'); await m.waitForTimeout(400);
    ok((await m.locator('#lista-modulos > li').count()) === 6, 'catálogo no celular');
    ok(await m.evaluate(() => document.documentElement.scrollWidth) <= 390, 'catálogo sem rolagem horizontal');
    await foto(m, 'MOB-03-catalogo'); await axe(m, 'catálogo celular');
  });

  await passo('Nenhum erro de JavaScript nas páginas', async () => ok(erros.length === 0, erros.join(' | ')));

  const falhas = resultados.filter(r => r[1] !== 'OK').length;
  const md = ['| Teste | Resultado | Detalhe |', '|---|---|---|', ...resultados.map(r => `| ${r.join(' | ')} |`)].join('\n');
  fs.writeFileSync(path.join(SAIDA, 'resultado.md'), `# Resultado dos testes de aceite — Equipe 2\n\nExecutado em ${new Date().toLocaleString('pt-BR')}\n\n${md}\n`);
  console.log(`\n${resultados.length - falhas} de ${resultados.length} testes OK`);
  await b.close(); process.exit(falhas ? 1 : 0);
})();
