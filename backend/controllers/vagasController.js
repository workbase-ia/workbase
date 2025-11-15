import axios from 'axios';
import dotenv from 'dotenv';
import { analisarHabilidadesVagas } from '../lib/analisarVagas.js';  

dotenv.config();

const JSEARCH_API_KEY = process.env.JSEARCH_API_KEY;
const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID;
const ADZUNA_APP_KEY = process.env.ADZUNA_APP_KEY;
const JSEARCH_URL = 'https://api.openwebninja.com/jsearch/search';
const ADZUNA_URL_BASE = 'https://api.adzuna.com/v1/api/jobs'; 

/**
 * Helper para normalizar strings para criar uma chave de comparação
 */
const normalizeKey = (titulo = '', empresa = '') => {
  const cleanTitulo = titulo.toLowerCase().replace(/[^a-z0-9]/g, '');
  const cleanEmpresa = empresa.toLowerCase().replace(/[^a-z0-9]/g, '');
  return `${cleanTitulo}_${cleanEmpresa}`;
};

/**
 * Buscar Vagas no JSearch (OpenWebNinja)
 */
async function buscarNoJSearch(query) {
  if (!JSEARCH_API_KEY) {
    console.warn('JSearch API Key não configurada. Pulando busca.');
    return []; 
  }

  const queryJSearch = `${query.termo}${query.estado ? ' ' + query.estado : ''}`;

  const options = {
    method: 'GET',
    url: JSEARCH_URL,
    params: {
      query: queryJSearch.trim(),
      page: '1',
      num_pages: '10', 
      country: query.country || 'br',
      employment_types: query.employment_types || ''
    },
    headers: {
      'X-API-Key': JSEARCH_API_KEY 
    }
  };

  try {
    const response = await axios.request(options);
    if (!response.data || !Array.isArray(response.data.data)) {
      return []; 
    }
    
    // Formata os dados do JSearch
    return response.data.data.map(vaga => ({
      id: `jsearch_${vaga.job_id}`,
      titulo: vaga.job_title,
      empresa: vaga.employer_name,
      localizacao: vaga.job_city || vaga.job_country,
      area: vaga.job_employment_type, 
      descricao: vaga.job_description.substring(0, 150) + '...',
      url: vaga.job_apply_link || vaga.job_google_link
    }));
  } catch (error) {
    console.error(`ERRO AO BUSCAR NO JSEARCH: ${error.response?.status || error.message}`);
    return []; 
  }
}

/**
 Buscar Vagas na Adzuna
 */
async function buscarNoAdzuna(query) {
  if (!ADZUNA_APP_ID || !ADZUNA_APP_KEY) {
    console.warn('Adzuna App ID/Key não configurada. Pulando busca.');
    return [];
  }

  const country = query.country || 'br'; 
  const url = `${ADZUNA_URL_BASE}/${country}/search/1`;

  const params = {
    app_id: ADZUNA_APP_ID,
    app_key: ADZUNA_APP_KEY,
    what: query.termo,
    where: query.estado || '',
    results_per_page: 50, 
  };

  try {
    const response = await axios.get(url, { params });
    if (!response.data || !Array.isArray(response.data.results)) {
      return [];
    }

    return response.data.results.map(vaga => ({
      id: `adzuna_${vaga.id}`,
      titulo: vaga.title,
      empresa: vaga.company.display_name,
      localizacao: vaga.location.display_name,
      area: vaga.contract_type ? vaga.contract_type.toUpperCase() : 'N/A', 
      descricao: vaga.description.substring(0, 150) + '...',
      url: vaga.redirect_url
    }));
  } catch (error) {
    console.error(`ERRO AO BUSCAR NA ADZUNA: ${error.response?.status || error.message}`);
    return [];
  }
}


export const buscarVagas = async (req, res) => {

  const {termo} = req.query;

  if (!termo || termo.trim() === '') { return res.status(200).json({ vagas: [], analise: [] }); }

  try {
    // Chama as duas APIs em paralelo
    const resultados = await Promise.allSettled([
      buscarNoJSearch(req.query),
      buscarNoAdzuna(req.query)
    ]);

    let todasAsVagas = [];
    
    // Coleta os resultados de ambas APIs
    if (resultados[0].status === 'fulfilled') {
      todasAsVagas = todasAsVagas.concat(resultados[0].value);
    }
    if (resultados[1].status === 'fulfilled') {
      todasAsVagas = todasAsVagas.concat(resultados[1].value);
    }

    // Funil para retirar duplicadas
    const vagasUnicas = new Map(); 
    
    todasAsVagas.forEach(vaga => {
      // Cria uma chave única (ex: devpython_google)
      const chave = normalizeKey(vaga.titulo, vaga.empresa);
      
      if (!vagasUnicas.has(chave)) {
        vagasUnicas.set(chave, vaga);
      }
    });

    const vagasFiltradas = Array.from(vagasUnicas.values());
    const analiseSkills = analisarHabilidadesVagas(vagasFiltradas);

    res.status(200).json({
      vagas: vagasFiltradas,
      analise: analiseSkills,
    });

  } catch (error) {
    console.error("Erro ao agregar vagas:", error.message);
    res.status(500).json({ message: 'Erro ao processar vagas.' });
  }
};