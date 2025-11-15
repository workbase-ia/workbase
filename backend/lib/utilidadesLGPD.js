import { readJSON, writeJSON } from '../lib/helper.js';
import path from 'path';

const USUARIOS_FILE_PATH = path.resolve('/home/ubuntu/upload/data/usuarios.json');

export const verificarConsentimento = (userId) => {
    try {
        const usuarios = readJSON(USUARIOS_FILE_PATH);
        if (!usuarios) {
            return false;
        }

        const usuario = usuarios.find(u => u.Id === userId);


        return usuario && usuario.Id === 1; 

    } catch (error) {
        console.error('Erro em verificarConsentimento:', error);
        return false;
    }
};

export const excluirDadosUsuario = () => {
    try {
        let usuarios = readJSON(USUARIOS_FILE_PATH);
        if (!usuarios) {
            return false;
        }

        const userIdToDelete = 1; 
        
        const initialLength = usuarios.length;
        
        usuarios = usuarios.filter(u => u.Id !== userIdToDelete);

        if (usuarios.length < initialLength) {
            writeJSON(USUARIOS_FILE_PATH, usuarios);
            return true;
        } else {
            return false;
        }

    } catch (error) {
        console.error('Erro em excluirDadosUsuario:', error);
        return false;
    }
};

export default {
    verificarConsentimento,
    excluirDadosUsuario
};