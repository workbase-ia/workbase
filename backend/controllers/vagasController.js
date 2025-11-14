import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const JSEARCH_API_KEY = process.env.JSEARCH_API_KEY;
const API_URL = 'https://api.openwebninja.com/jsearch/search';

export const buscarVagas = async (req, res) => {
  if (!JSEARCH_API_KEY) {
    console.error("ERRO: JSEARCH_API_KEY não configurada no .env");
    return res.status(500).json({ message: 'Erro de configuração: Chave da API ausente.' });
  }

  const { termo, country, employment_types } = req.query;

  const options = {
    method: 'GET',
    url: API_URL,

    params: {
      query: termo || 'Desenvolvedor React', 
      page: '1', 
      num_pages: '10', 
      country: country || 'br', 
      employment_types: employment_types || '' 
    },
    
    headers: {
      'X-API-Key': JSEARCH_API_KEY 
    }
  };

  try {
    const response = await axios.request(options);
    
    if (!response.data || !Array.isArray(response.data.data)) {
        return res.status(200).json([]); 
    }

    const vagasOriginais = response.data.data;
    const vagasFormatadas = vagasOriginais.map(vaga => {

      return {
        id: vaga.job_id,
        titulo: vaga.job_title,
        empresa: vaga.employer_name,
        localizacao: vaga.job_city || vaga.job_country,
        area: vaga.job_employment_type, 
        descricao: vaga.job_description.substring(0, 150) + '...',
        url: vaga.job_apply_link || vaga.job_google_link
      };
    });

    res.status(200).json(vagasFormatadas);

  } catch (error) {
    if (error.response) {
      console.error(`ERRO DA OPENWEB/JSEARCH: ${error.response.status}`);
      console.error(error.response.data); 
      res.status(error.response.status).json({ 
          message: 'Falha na comunicação com a API JSearch.', 
          details: error.response.data 
      });
    } else {
      console.error("Erro ao buscar vagas:", error.message);
      res.status(500).json({ 
          message: 'Falha de rede ao tentar contatar a API externa.', 
          details: error.message 
      });
    }
  }
};