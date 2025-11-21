import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const USUARIOS_PATH = path.resolve(__dirname, '../data/usuarios.json');

const migrarUsuarios = () => {

  if (!fs.existsSync(USUARIOS_PATH)) {
    console.error("❌ ERRO: O arquivo usuarios.json não foi encontrado neste caminho!");
    console.error("   Verifique se a pasta 'data' está no mesmo nível da pasta 'lib'.");
    return;
  }

  try {
    // Lê o arquivo atual
    const data = fs.readFileSync(USUARIOS_PATH, 'utf8');
    const usuarios = JSON.parse(data);

    let alterados = 0;

    //Percorre e atualiza cada usuário
    const usuariosAtualizados = usuarios.map(user => {
      let mudou = false;

      // Garante array de conexões
      if (!Array.isArray(user.conexoes)) {
        user.conexoes = [];
        mudou = true;
      }

      // Garante array de convites
      if (!Array.isArray(user.convites)) {
        user.convites = []; 
        mudou = true;
      }

      // Adiciona array de mensagens se não existir
      if (!Array.isArray(user.mensagens)) {
        user.mensagens = [];
        mudou = true;
      }

      // Garante status de conexão
      if (!user.connectionStatus) {

      }

      if (mudou) {
        alterados++;
      }
      
      return user;
    });

    if (alterados === 0) {
      console.log("✅ Nenhum usuário precisou ser atualizado. Todos já possuem os campos.");
    } else {
      // Salva de volta no arquivo
      fs.writeFileSync(USUARIOS_PATH, JSON.stringify(usuariosAtualizados, null, 2), 'utf8');
      console.log(`✅ Sucesso! ${alterados} usuários foram atualizados e salvos.`);
    }

  } catch (error) {
    console.error('❌ Erro fatal ao atualizar usuários:', error.message);
  }
};

migrarUsuarios();