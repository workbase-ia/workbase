import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import ProfileCard from '../components/ProfileCard';
import PerfilModal from '../components/PerfilModal';

const API_URL = 'http://127.0.0.1:3001/api';

export default function MinhaRede() {
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [termo, setTermo] = useState('');
  const [filtroArea, setFiltroArea] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [selectedProfissional, setSelectedProfissional] = useState(null);

  const fetchUsuarios = async (isInitialLoad = false) => {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (termo) params.append('termo', termo);
        if (filtroArea) params.append('area', filtroArea);
        if (filtroEstado) params.append('estado', filtroEstado);

        const response = await fetch(`${API_URL}/usuarios?${params.toString()}`); 
        
        if (!response.ok) throw new Error('Falha ao buscar profissionais.');
        
        const data = await response.json();
        setUsuarios(data);
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar a rede de profissionais.");
      } finally {
        setIsLoading(false);
      }
  };

  useEffect(() => {
    fetchUsuarios(true);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchUsuarios();
  };

  return (
    <div className="max-w-[70%] mx-auto p-6 bg-slate-50 min-h-screen">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Minha Rede</h1>
        <p className="text-gray-600">Descubra profissionais talentosos e expanda suas conexões.</p>
      </div>

      {/* Barra de Filtros e Busca */}
      <form 
        onSubmit={handleSearchSubmit}
        className="bg-white p-4 rounded-lg  border border-gray-200 mb-8 flex flex-col lg:flex-row gap-4 items-end lg:items-center"
      >
        
        {/* Grupo de Busca por Texto  */}
        <div className="flex gap-2 w-full lg:w-auto flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text"
              placeholder="Nome, cargo ou habilidade..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
              value={termo}
              onChange={(e) => setTermo(e.target.value)}
            />
          </div>
        </div>

        {/* Filtros Dropdown e Estado */}
        <div className="flex gap-4 w-full lg:w-auto">
          <div className="relative w-1/2 lg:w-48">
            <select 
              className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-blue-500 text-gray-700 appearance-none"
              value={filtroArea}
              onChange={(e) => setFiltroArea(e.target.value)}
            >
              <option value="">Todas as Áreas</option>
              <option value="Desenvolvimento">Desenvolvimento</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Dados">Dados</option>
              <option value="Produto">Produto</option>
            </select>
             <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>

          <div className="relative w-1/2 lg:w-32">
            <input 
              type="text"
              placeholder="UF (ex: SP)"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
            />
          </div>
        </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? '...' : 'Buscar'}
          </button>
      </form>

      {/* Lista de Profissionais */}
      {isLoading ? (
        <div className="text-center py-20 text-gray-500">Carregando profissionais...</div>
      ) : error ? (
        <div className="text-center py-20 text-red-500">{error}</div>
      ) : usuarios.length === 0 ? (
        <div className="text-center py-20 text-gray-500 bg-white rounded-lg border border-dashed border-gray-300">
            Nenhum profissional encontrado com esses filtros.
        </div>
      ) : (
        <div
          className="grid gap-y-4 gap-x-4"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(14rem, 14rem))' }}
        >
           {usuarios.map(user => (
             <ProfileCard 
               key={user.id || user.Id} 
               profissional={user} 
               onClick={() => setSelectedProfissional(user)}
             />
           ))}
         </div>
       )}

      {/* Modal de Detalhes */}
      <PerfilModal 
        isOpen={!!selectedProfissional}
        onClose={() => setSelectedProfissional(null)}
        profissional={selectedProfissional}
      />

    </div>
  );
}