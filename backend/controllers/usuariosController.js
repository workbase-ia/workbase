import { readJSON } from '../lib/helper.js';

const usersFilePath = '../data/usuarios.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getUser = async (req, res) => {
    try {
        await delay(300);
        const { id } = req.params;

        const usuariosData = readJSON(usersFilePath);
        if (!usuariosData) {
            return res.status(500).json({ message: "Erro ao carregar dados de usuários" });
        }
        const user = usuariosData.find(user => user.Id === id);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "Usuário não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar usuário", error: error.message });
    }
};