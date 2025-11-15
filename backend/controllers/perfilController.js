import path from 'path';
import { readJSON, writeJSON } from '../lib/helper.js';

const USUARIOS_PATH = path.resolve('data/usuarios.json');

export const getPerfilById = (req, res) => {
  try {
    const db = readJSON(USUARIOS_PATH);
    if (!db || !Array.isArray(db)) { 
      return res.status(404).json({ message: 'Arquivo de usuários não encontrado ou inválido.' }); 
    }

    const user = db.find(u => u.Id.toString() === req.params.id);
    if (!user) { return res.status(404).json({ message: 'Usuário não encontrado.' }); }
    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
  }
};

/**
 * Atualiza o perfil do usuário logado (Rota PUT Protegida).
 */
export const updateMeuPerfil = (req, res) => {
  try {

    const userIdLogado = req.user.id; 
    const { nome, cargo, resumo, localizacao } = req.body;

    let db = readJSON(USUARIOS_PATH);
    if (!db || !Array.isArray(db)) { 
      return res.status(500).json({ message: 'Arquivo de perfis inválido.' }); 
    }

    const userIndex = db.findIndex(u => u.Id.toString() === userIdLogado);
    if (userIndex === -1) {
      return res.status(404).json({ message: 'Usuário não encontrado no DB de perfis.' });
    }
    //Atualiza o objeto do usuário no array 
    const usuarioAtualizado = {
      ...db[userIndex],
      nome: nome || db[userIndex].nome, 
      cargo: cargo || db[userIndex].cargo,
      resumo: resumo || db[userIndex].resumo,
      localizacao: localizacao || db[userIndex].localizacao,
    };

    db[userIndex] = usuarioAtualizado;
    writeJSON(USUARIOS_PATH, db);

    // Retorna o perfil atualizado para o frontend
    res.status(200).json(usuarioAtualizado);

  } catch (error) {
    console.error('ERRO AO ATUALIZAR PERFIL:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao atualizar perfil', error: error.message });
  }
};