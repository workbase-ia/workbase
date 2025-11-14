import path from 'path';
import { readJSON, writeJSON } from '../lib/helper.js';

const USUARIOS_PATH = path.resolve('data/usuarios.json');

/**
 * Busca um perfil de usuário pelo ID.
 */
export const getPerfilById = (req, res) => {
  try {
    const db = readJSON(USUARIOS_PATH);
    if (!db) {
      return res.status(404).json({ message: 'Arquivo de usuários não encontrado.' });
    }
    const user = db.find(u => u.Id.toString() === req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
  }
};

/**
 * Atualiza o perfil do usuário logado.
 */
export const updateMeuPerfil = (req, res) => {
  try {
    const userIdLogado = req.user.id; 

    const { nome, cargo, resumo, localizacao, habilidadesTecnicas, softSkills } = req.body;

    let db = readJSON(USUARIOS_PATH);
    if (!db) {
      return res.status(404).json({ message: 'Arquivo de usuários não encontrado.' });
    }

    const userIndex = db.findIndex(u => u.Id.toString() === userIdLogado);

    if (userIndex === -1) {
      return res.status(404).json({ message: 'Usuário não encontrado no DB de perfis.' });
    }

    const usuarioAtualizado = {
      ...db[userIndex],
      nome: nome || db[userIndex].nome,
      cargo: cargo || db[userIndex].cargo,
      resumo: resumo || db[userIndex].resumo,
      localizacao: localizacao || db[userIndex].localizacao,
      habilidadesTecnicas: habilidadesTecnicas || db[userIndex].habilidadesTecnicas,
      softSkills: softSkills || db[userIndex].softSkills,
    };

    db[userIndex] = usuarioAtualizado;

    writeJSON(USUARIOS_PATH, db);

    res.status(200).json(usuarioAtualizado);

  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
  }
};