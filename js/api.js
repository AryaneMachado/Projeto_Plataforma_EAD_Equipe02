// Camada de dados da versão da Equipe 2.
// Mantém o mesmo contrato de api.estrutura() da plataforma integrada:
// { curso, modulos: [{ ...modulo, aulas: [...], atividade }] }, em ordem.
// Aqui os dados vêm direto de js/data/estrutura.js (sem login nem banco).
import { linhasIniciais } from './data/estrutura.js';

export const api = {
  async estrutura() {
    const db = linhasIniciais();
    const modulos = [...db.modulos].sort((a, b) => a.ordem - b.ordem).map(m => ({
      ...m,
      aulas: db.aulas.filter(a => a.modulo_id === m.id && a.status === 'publicado').sort((a, b) => a.ordem - b.ordem),
      atividade: db.atividades.find(t => t.modulo_id === m.id) || null,
    }));
    return { curso: db.curso, modulos };
  },
};
