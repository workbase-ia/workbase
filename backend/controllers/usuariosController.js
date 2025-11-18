import { readJSON } from '../lib/helper.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const usersFilePath = path.join(__dirname, '..', 'data', 'usuarios.json');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export const getSuggestedProfiles = async (req, res) => {
    try {
        await delay(300);
        const usuariosData = readJSON(usersFilePath);
        if (!usuariosData) {
            return res.status(500).json({ message: "Erro ao carregar dados de usuários" });
        }

        const suggestedProfiles = shuffleArray([...usuariosData]).slice(0, 3).map(user => ({
            id: user.id,
            nome: user.nome,
            foto: user.foto,
            cargo: user.cargo,
            resumo: user.resumo,
            localizacao: user.localizacao,
            habilidadesTecnicas: user.habilidadesTecnicas.slice(0, 3)
        }));

        res.status(200).json(suggestedProfiles);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar perfis sugeridos", error: error.message, stack: error.stack });
    }
};

export const getUser = async (req, res) => {
    try {
        await delay(300);
        const { id } = req.params;

        const usuariosData = readJSON(usersFilePath);
        if (!usuariosData) {
            return res.status(500).json({ message: "Erro ao carregar dados de usuários" });
        }
        const user = usuariosData.find(user => user.id === parseInt(id)); // Garante que o ID seja um número para comparação estrita

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "Usuário não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar usuário", error: error.message, stack: error.stack });
    }
};