import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { readJSON, writeJSON } from '../lib/helper.js';

const HISTORICO_FILE_PATH = path.resolve('../data/historicoUsuario.json');

export const getHistorico = (req, res) => {
    try {
        const historico = readJSON(HISTORICO_FILE_PATH);
        if (historico) {
            res.status(200).json(historico);
        } else {
            res.status(200).json([]);
        }
    } catch (error) {
        console.error('Erro ao obter histórico:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao buscar histórico.' });
    }
};

export const addRegistro = (req, res) => {
    try {
        const novoRegistro = req.body;

        if (!novoRegistro || Object.keys(novoRegistro).length === 0) {
            return res.status(400).json({ message: 'Corpo da requisição vazio ou inválido.' });
        }

        let historico = readJSON(HISTORICO_FILE_PATH);
        if (!historico) {
            historico = [];
        }

        const registroComTimestamp = {
            timestamp: new Date().toISOString(),
            ...novoRegistro
        };
        
        historico.push(registroComTimestamp);

        writeJSON(HISTORICO_FILE_PATH, historico);

        res.status(201).json({ message: 'Registro adicionado com sucesso!', registro: registroComTimestamp });

    } catch (error) {
        console.error('Erro ao adicionar registro:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao adicionar registro.' });
    }
};

export const getRegistroByTimestamp = (req, res) => {
    try {
        const { timestamp } = req.params;
        const historico = readJSON(HISTORICO_FILE_PATH);

        if (!historico) {
            return res.status(404).json({ message: 'Histórico não encontrado ou vazio.' });
        }

        const registro = historico.find(r => r.timestamp === timestamp);

        if (registro) {
            res.status(200).json(registro);
        } else {
            res.status(404).json({ message: 'Registro não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao buscar registro por timestamp:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao buscar registro.' });
    }
};

export const clearHistorico = (req, res) => {
    try {
        writeJSON(HISTORICO_FILE_PATH, []);
        res.status(200).json({ message: 'Histórico limpo com sucesso!' });
    } catch (error) {
        console.error('Erro ao limpar histórico:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao limpar histórico.' });
    }
};