import path from 'path';
import { fileURLToPath } from 'url';
import { readJSON, writeJSON } from '../lib/helper.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const USUARIOS_PATH = path.resolve(__dirname, '..', 'data', 'usuarios.json');

/**
 * Envia um convite de conexão.
 */
export const enviarConvite = (req, res) => {
  try {
    const remetenteId = req.user.id; 
    const destinatarioId = req.params.id;

    if (String(remetenteId) === String(destinatarioId)) {
      return res.status(400).json({ message: 'Não pode conectar consigo mesmo.' });
    }

    const db = readJSON(USUARIOS_PATH);
    
    // Busca destinatário 
    const destinatarioIndex = db.findIndex(u => String(u.Id || u.id) === String(destinatarioId));
    
    if (destinatarioIndex === -1) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const destinatario = db[destinatarioIndex];

    if (!destinatario.convites) destinatario.convites = [];
    if (!destinatario.conexoes) destinatario.conexoes = [];

    // Verifica se já convidou (suporta objeto ou ID simples)
    const jaConvidou = destinatario.convites.some(c => {
      const idNoArray = (typeof c === 'object' && c !== null) ? c.remetenteId : c;
      return String(idNoArray) === String(remetenteId);
    });

    const jaConectado = destinatario.conexoes.map(String).includes(String(remetenteId));

    if (jaConvidou || jaConectado) {
      return res.status(400).json({ message: 'Convite já enviado ou já conectados.' });
    }

    const novoConvite = {
      id: `conv_${Date.now()}`,
      remetenteId: remetenteId,
      data: new Date().toISOString()
    };

    destinatario.convites.push(novoConvite);
    db[destinatarioIndex] = destinatario;
    writeJSON(USUARIOS_PATH, db);

    res.status(200).json({ message: 'Convite enviado com sucesso!' });

  } catch (error) {
    console.error("Erro ao enviar:", error);
    res.status(500).json({ message: 'Erro interno.' });
  }
};

/**
 * Lista convites pendentes 
 */
export const getConvitesPendentes = (req, res) => {
  try {
    const userId = req.user.id;
    const db = readJSON(USUARIOS_PATH);
    
    const user = db.find(u => String(u.Id || u.id) === String(userId));
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    const listaConvites = user.convites || [];

    const convitesDetalhados = listaConvites.map(conviteItem => {
      let remetenteId;
      let conviteId; 

      if (typeof conviteItem === 'object' && conviteItem !== null) {
        remetenteId = conviteItem.remetenteId;
        conviteId = conviteItem.id; 
      } else {
        remetenteId = conviteItem;
        conviteId = String(conviteItem); 
      }
      // Busca os dados do remetente na lista completa
      const remetente = db.find(u => String(u.Id || u.id) === String(remetenteId));

      return {
        id: conviteId, 
        // Passamos o ID real do remetente caso precise no front
        remetenteIdReal: remetenteId, 
        remetente: remetente ? {
          id: remetente.Id || remetente.id,
          nome: remetente.nome,
          foto: remetente.foto,
          cargo: remetente.cargo
        } : { 
          nome: "Usuário Desconhecido", 
          cargo: `ID: ${remetenteId}` // Mostra o ID para ajudar a debugar
        }
      };
    });

    // Filtra possíveis nulos se o ID não existir mais no banco
    res.status(200).json(convitesDetalhados);
  } catch (error) {
    console.error("Erro getConvites:", error);
    res.status(500).json({ message: 'Erro ao buscar convites.' });
  }
};

/**
 * Aceita um convite
 */
export const aceitarConvite = (req, res) => {
  try {
    const userId = req.user.id;
    const idRecebido = req.params.id; 
    const db = readJSON(USUARIOS_PATH);

    const userIndex = db.findIndex(u => String(u.Id || u.id) === String(userId));
    const user = db[userIndex];

    if (!user.convites) user.convites = [];
    if (!user.conexoes) user.conexoes = [];

    // Encontra o index do convite na lista
    const conviteIndex = user.convites.findIndex(c => {
      if (typeof c === 'object' && c !== null) {
        return String(c.id) === String(idRecebido);
      } else {
        // Se for ID solto, compara direto
        return String(c) === String(idRecebido);
      }
    });

    if (conviteIndex === -1) return res.status(404).json({ message: 'Convite não encontrado.' });

    // Recupera o ID do remetente
    const itemConvite = user.convites[conviteIndex];
    const remetenteId = (typeof itemConvite === 'object') ? itemConvite.remetenteId : itemConvite;

    // 1. Adiciona conexão no usuário logado
    if (!user.conexoes.map(String).includes(String(remetenteId))) {
      user.conexoes.push(remetenteId);
    }

    //Adiciona conexão no remetente (Bidirecional)
    const remetenteIndex = db.findIndex(u => String(u.Id || u.id) === String(remetenteId));
    if (remetenteIndex !== -1) {
      const remetente = db[remetenteIndex];
      if (!remetente.conexoes) remetente.conexoes = [];
      
      if (!remetente.conexoes.map(String).includes(String(userId))) {
        remetente.conexoes.push(userId); 
        db[remetenteIndex] = remetente;
      }
    }

    // Remove o convite da lista
    user.convites.splice(conviteIndex, 1);
    db[userIndex] = user;
    
    writeJSON(USUARIOS_PATH, db);

    res.status(200).json({ message: 'Conexão aceita!' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao aceitar convite.' });
  }
};

/**
 * Ignora um convite
 */
export const ignorarConvite = (req, res) => {
  try {
    const userId = req.user.id;
    const idRecebido = req.params.id;
    const db = readJSON(USUARIOS_PATH);

    const userIndex = db.findIndex(u => String(u.Id || u.id) === String(userId));
    const user = db[userIndex];

    if (user && user.convites) {
      // Filtra removendo o item que bate com o ID recebido
      user.convites = user.convites.filter(c => {
        if (typeof c === 'object' && c !== null) {
          return String(c.id) !== String(idRecebido);
        } else {
          return String(c) !== String(idRecebido);
        }
      });
      
      db[userIndex] = user;
      writeJSON(USUARIOS_PATH, db);
    }

    res.status(200).json({ message: 'Convite ignorado.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao ignorar convite.' });
  }
};