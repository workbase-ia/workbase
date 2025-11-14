import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HISTORICO_PATH = path.join(__dirname, '..', 'data', 'historicoUsuario.json');


export const verificarConsentimento = () => {
  return true;
};


export const excluirDadosUsuario = () => {
  try {

    const historicoVazio = [];
    

    fs.writeFileSync(HISTORICO_PATH, JSON.stringify(historicoVazio, null, 2), 'utf8');
    
    console.log('Dados do histórico excluídos com sucesso (LGPD).');
    return true; // Sucesso
  } catch (error) {
    console.error('Erro ao excluir dados (LGPD):', error.message);
    return false; // Falha
  }
};