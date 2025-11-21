import path from 'path';
import { fileURLToPath } from 'url';
import { readJSON, writeJSON } from '../lib/helper.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const USUARIOS_PATH = path.resolve(__dirname, '..', 'data', 'usuarios.json');

/**
 * Envia uma mensagem para um usuário.
 * Rota: POST /api/mensagens/enviar/:id
 */
export const enviarMensagem = (req, res) => {
    try {
        const remetenteId = req.user.id;
        const destinatarioId = req.params.id;
        const { conteudo } = req.body;

        if (!conteudo || !conteudo.trim()) {
            return res.status(400).json({ message: 'O conteúdo da mensagem é obrigatório.' });
        }

        const db = readJSON(USUARIOS_PATH);
        
        // Busca o destinatário
        const destinatarioIndex = db.findIndex(u => String(u.Id || u.id) === String(destinatarioId));

        if (destinatarioIndex === -1) {
            return res.status(404).json({ message: 'Destinatário não encontrado.' });
        }

        const destinatario = db[destinatarioIndex];

        // Garante que o array de mensagens existe
        if (!destinatario.mensagens) destinatario.mensagens = [];

        // Cria o objeto da mensagem
        const novaMensagem = {
            id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            remetenteId: remetenteId,
            conteudo: conteudo,
            data: new Date().toISOString(),
            lida: false
        };

        // Adiciona à caixa de entrada do destinatário
        destinatario.mensagens.push(novaMensagem);
        
        // Salva no arquivo
        db[destinatarioIndex] = destinatario;
        writeJSON(USUARIOS_PATH, db);

        res.status(200).json({ message: 'Mensagem enviada com sucesso!', dados: novaMensagem });

    } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
        res.status(500).json({ message: 'Erro interno ao enviar mensagem.' });
    }
};