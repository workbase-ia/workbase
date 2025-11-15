import fs from 'fs';
import path from 'path';

export const readJSON = (filePath) => {
    try {
        const resolved = path.resolve(filePath);
        const fileData = fs.readFileSync(resolved, 'utf-8');

        console.log(`[readJSON] Lendo: ${resolved}`);
        console.log(`[readJSON] Primeiro conteúdo: "${fileData.substring(0, 80).replace(/\n/g, '\\n')}"`);

        return JSON.parse(fileData);
    } catch (error) {
        console.error(`[readJSON] Erro ao ler o arquivo JSON: ${filePath}`);
        console.error(`[readJSON] Mensagem: ${error.message}`);
        return null;
    }
};

export const writeJSON = (filePath, data) => {
    try {
        const resolved = path.resolve(filePath);
        const jsonData = JSON.stringify(data, null, 2);

        fs.writeFileSync(resolved, jsonData, 'utf-8');

        console.log(`[writeJSON] Gravado com sucesso: ${resolved}`);
        return true;
    } catch (error) {
        console.error(`[writeJSON] Erro ao escrever no arquivo JSON: ${filePath}`);
        console.error(`[writeJSON] Mensagem: ${error.message}`);
        return false;
    }
};