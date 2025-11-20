import path from 'path';
import { fileURLToPath } from 'url';
import { readJSON } from '../lib/helper.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const USUARIOS_PATH = path.resolve(__dirname, '..', 'data', 'usuarios.json');

/**
 * Retorna a lista de todos os usuários (com filtros opcionais).
 * Rota: GET /api/usuarios
 */
export const getAllUsuarios = (req, res) => {
  try {
    const db = readJSON(USUARIOS_PATH);
    
    if (!db || !Array.isArray(db)) {
      return res.status(500).json({ message: 'Erro ao ler base de usuários.' });
    }

    // Pegamos os filtros da query string 
    const { termo, area, estado } = req.query;

    // Filtra os usuários
    const usuariosFiltrados = db.filter(usuario => {
      let match = true;
      // Filtro por Termo
      if (termo) {
        const termoLower = termo.toLowerCase();
        const nomeMatch = usuario.nome?.toLowerCase().includes(termoLower);
        const cargoMatch = usuario.cargo?.toLowerCase().includes(termoLower);
        const skillMatch = usuario.habilidadesTecnicas?.some(skill => skill.toLowerCase().includes(termoLower));
        
        if (!nomeMatch && !cargoMatch && !skillMatch) match = false;
      }

      // Filtro por Área
      if (area && match) {
        if (!usuario.area?.toLowerCase().includes(area.toLowerCase())) match = false;
      }

      if (estado && match) {
        if (!usuario.localizacao?.toLowerCase().includes(estado.toLowerCase())) match = false;
      }

      return match;
    });

    res.status(200).json(usuariosFiltrados);

  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ message: 'Erro interno ao buscar usuários.' });
  }
};