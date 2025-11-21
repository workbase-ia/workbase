import { useState } from 'react'; 
import VagasAnaliseCard from '../components/VagasAnaliseCard';

const API_URL = 'http://127.0.0.1:3001/api';

const employmentTypesEnum = {
  FULLTIME: "Tempo Integral",
  CONTRACTOR: "Contrato",
  PARTTIME: "Meio Período",
  INTERN: "Estágio"
};

export default function Vagas() {
  const [vagas, setVagas] = useState([]);
  const [analiseSkills, setAnaliseSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null);
  const [termo, setTermo] = useState('');
  const [lastSearchedTerm, setLastSearchedTerm] = useState('');
  const [country, setCountry] = useState('br'); 
  const [estado, setEstado] = useState('');
  const [employmentTypes, setEmploymentTypes] = useState({
    FULLTIME: false,
    PARTTIME: false,
    CONTRACTOR: false,
    INTERN: false,
  });

  const fetchVagas = async (termoBusca, countryBusca, typesBusca, estadoBusca) => {
    setIsLoading(true);
    setError(null);
    setVagas([]);
    setAnaliseSkills([]);

    if (!termoBusca || termoBusca.trim() === '') {
      setIsLoading(false); 
      setLastSearchedTerm('');
      return; 
      }

    try {
      // Constrói os parâmetros de busca
      const params = new URLSearchParams();
      params.append('termo', termoBusca);
      if (countryBusca) params.append('country', countryBusca);
      if (typesBusca) params.append('employment_types', typesBusca); 
      if (estadoBusca) params.append('estado', estadoBusca);

      const response = await fetch(`${API_URL}/vagas?${params.toString()}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro HTTP ${response.status}`);
      }

      const { vagas: vagasData, analise: analiseData } = await response.json();
      setVagas(vagasData);
      setAnaliseSkills(analiseData);
      setLastSearchedTerm(termoBusca);

    } catch (err) {
      console.error(err);
      setError(err.message);
      setVagas([]);
      setLastSearchedTerm('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setEmploymentTypes(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    
    const selectedTypes = Object.keys(employmentTypes)
      .filter(key => employmentTypes[key])
      .join(',');

    fetchVagas(termo, country, selectedTypes, estado); 
  };
  
  return (
    <div
      className="mx-auto p-6 bg-gray-50 min-h-screen dark:bg-slate-900"
      style={{ width: 'calc(100% - 48px)', maxWidth: '1200px' }} // margem lateral fixa de 24px cada lado
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-6 dark:text-white">Encontrar Vagas</h2>

      {/*  O formulário de filtros*/}
      <form onSubmit={handleSearchSubmit} className="p-6 bg-white border border-gray-200 rounded-lg mb-8 space-y-4 dark:bg-slate-800 dark:border-slate-700">
        {/* Filtro de Termo  */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-slate-200">Cargo ou Palavra-chave</label>
          <input 
            type="text"
            placeholder="Digite o cargo (ex: Desenvolvedor Node.js)"
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-400 bg-white text-gray-700 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200"
            disabled={isLoading}
          />
        </div>
        
        {/* Filtro de País */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-slate-200">País (código 2 dígitos)</label>
          <input 
            type="text"
            placeholder="Ex: br, us, de"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-400 bg-white text-gray-700 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200"
            disabled={isLoading}
          />
        </div>

        {/* Filtro de Estado */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-slate-200">Estado (código UF)</label>
          <input 
            type="text"
            placeholder="Ex: sp, rj, mg"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-400 bg-white text-gray-700 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200"
            disabled={isLoading}
          />
        </div>

        {/* Filtro de Tipo de Vaga */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-slate-200">Tipo de Vaga</label>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {Object.keys(employmentTypesEnum).map((key) => (
              <label key={key} className="flex items-center space-x-2 text-gray-700 dark:text-slate-200">
                <input
                  type="checkbox"
                  name={key}
                  checked={employmentTypes[key]}
                  onChange={handleCheckboxChange}
                  className="rounded text-blue-600 focus:ring-blue-500"
                  disabled={isLoading}
                />
                <span>{employmentTypesEnum[key]}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Botão de Busca */}
        <div className="flex justify-start">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-1/4 py-3 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Buscando...' : 'Ver vagas'}
          </button>
        </div>
      </form>

      <VagasAnaliseCard
          analiseSkills={analiseSkills}
          vagasLength={vagas?.length || 0}
          isLoading={isLoading}
          termo={lastSearchedTerm || termo}
        />

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded mb-4 dark:bg-red-900/20 dark:border-red-700 dark:text-red-300">
          <p className="font-bold">Erro de API:</p>
          <p>{error}</p>
        </div>
      )}

      {!isLoading && vagas.length === 0 && !error && (
         <p className="text-gray-600 text-lg text-center dark:text-slate-300">Use os filtros acima para buscar vagas.</p>
      )}

      {isLoading && (
        <p className="text-blue-600 text-lg text-center dark:text-blue-400">Carregando vagas para "{lastSearchedTerm || termo}"...</p>
      )}

      {!isLoading && vagas?.length > 0 && (
        <div className="space-y-6">
          <p className="text-sm text-gray-500 dark:text-slate-300">Exibindo {vagas.length} vagas encontradas.</p>
          
          {vagas.map(vaga => (
            <div key={vaga.id} className="p-4 border border-gray-200 bg-white rounded-lg dark:bg-slate-800 dark:border-slate-700">
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">{vaga.titulo}</h3>
              <p className="text-md font-medium text-gray-800 mt-1 dark:text-slate-200">{vaga.empresa}</p>
              <p className="text-sm text-gray-500 mt-1 dark:text-slate-300">Localização: {vaga.localizacao} | Tipo: {vaga.area}</p>
              <p className="text-sm mt-3 dark:text-slate-200">{vaga.descricao}</p>
              <a href={vaga.url} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-blue-600 hover:text-blue-700 font-medium dark:text-blue-400 dark:hover:text-blue-300">
                Ver vaga completa →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}