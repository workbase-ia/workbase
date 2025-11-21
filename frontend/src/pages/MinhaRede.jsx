import { useState, useEffect } from 'react';
import { Search, Filter, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard'; 
import PerfilModal from '../components/PerfilModal';
import ConexaoCard from '../components/ConexaoCard';
import { useAuth } from '../contexts/AuthContext';

const API_URL = 'http://127.0.0.1:3001/api';

export default function MinhaRede() {
  const { user, token, loading } = useAuth(); 
  const navigate = useNavigate();
  
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [termo, setTermo] = useState('');
  const [filtroArea, setFiltroArea] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [selectedProfissional, setSelectedProfissional] = useState(null);
  const [convites, setConvites] = useState([]);

  const fetchConvites = async () => {
    try {
      const response = await fetch(`${API_URL}/conexoes/pendentes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setConvites(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Erro ao buscar convites:", error);
    }
  };

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

      const userIdStr = String(user?.id);

      const sugestoes = data
        .filter(u => {
          const targetIdStr = String(u.Id || u.id);
          if (user && targetIdStr === userIdStr) return false;
          return true;
        })
        .map(u => {
          const targetIdStr = String(u.Id || u.id);
          
          const isConnected = (u.conexoes && u.conexoes.map(String).includes(userIdStr)) || (user?.conexoes && user.conexoes.map(String).includes(targetIdStr));
          
          const isPending = u.convites && u.convites.some(c => String(c.remetenteId) === userIdStr);

          let status = 'idle'; 
          if (isConnected) status = 'connected';
          else if (isPending) status = 'pending';

          return {
            ...u,
            connectionStatus: status 
          };
        })
        .sort((a, b) => {
          const score = (s) => {
            if (s === 'idle') return 0;
            if (s === 'pending') return 1;
            if (s === 'connected') return 2;
            return 3;
          };
          return score(a.connectionStatus) - score(b.connectionStatus);
        });

      setUsuarios(sugestoes);
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar a rede de profissionais.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchConvites().then(() => {
        fetchUsuarios(true);
      });
    }
  }, [user]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchUsuarios();
  };

  const handleAceitarConvite = async (conviteId) => {
    try {
      await fetch(`${API_URL}/conexoes/aceitar/${conviteId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });

      setConvites(convites.filter(c => c.id !== conviteId));
      alert('Convite aceito com sucesso!');
      fetchUsuarios(); 
    } catch (error) {
      console.error("Erro ao aceitar convite:", error);
    }
  };

  const handleIgnorarConvite = async (conviteId) => {
    try {
      await fetch(`${API_URL}/conexoes/ignorar/${conviteId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });

      setConvites(convites.filter(c => c.id !== conviteId));
    } catch (error) {
      console.error("Erro ao ignorar convite:", error);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

  return (
    <div
      className="mx-auto p-6 min-h-screen bg-slate-50 dark:bg-slate-900"
      style={{ width: 'calc(100% - 48px)', maxWidth: '1200px' }} // margem lateral fixa de 24px cada lado
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Minha Rede</h1>
        <p className="text-gray-600 dark:text-slate-300">Descubra profissionais talentosos e expanda suas conexões.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-y-6 gap-x-6">
      
        {/* COLUNA ESQUERDA: Convites */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4 dark:bg-slate-800 dark:border-slate-700">
            <h3 className="font-bold text-gray-700 dark:text-slate-200 flex items-center gap-2">
              <UserPlus size={20} />
              Convites ({convites.length})
            </h3>
          </div>
          {convites.length === 0 ? (
            <div className="p-4 text-center text-gray-500 text-sm bg-white rounded-lg border border-dashed border-gray-300 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
              Nenhum convite pendente.
            </div>
          ) : (
            convites.map((convite, index) => (
              <ConexaoCard 
                key={convite.id || index}
                convite={convite}
                onAceitar={handleAceitarConvite}
                onIgnorar={handleIgnorarConvite}
              />
            ))
          )}
        </div>

        {/* COLUNA DIREITA: Busca e Lista */}
        <div className="lg:col-span-3">
          <form onSubmit={handleSearchSubmit} className="bg-white p-4 rounded-lg border border-gray-200 mb-8 flex flex-col md:flex-row gap-4 items-end md:items-center dark:bg-slate-800 dark:border-slate-700">
            <div className="flex gap-2 w-full md:w-auto flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Nome, cargo ou habilidade..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-gray-700 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200"
                  value={termo}
                  onChange={(e) => setTermo(e.target.value)}
                />
              </div>
              <button type="submit" disabled={isLoading} className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
                {isLoading ? '...' : 'Buscar'}
              </button>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <div className="relative w-1/2 md:w-40">
                <select className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-blue-500 text-gray-700 appearance-none dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200" value={filtroArea} onChange={(e) => setFiltroArea(e.target.value)}>
                  <option value="">Todas as Áreas</option>
                  <option value="Desenvolvimento">Desenvolvimento</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Dados">Dados</option>
                  <option value="Produto">Produto</option>
                </select>
                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none dark:text-slate-400" size={16} />
              </div>
              <div className="relative w-1/2 md:w-28">
                <input type="text" placeholder="UF" className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200" value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)} />
              </div>
            </div>
          </form>

          {isLoading ? (
            <div className="text-center py-20 text-gray-500 dark:text-slate-300">Carregando profissionais...</div>
          ) : error ? (
            <div className="text-center py-20 text-red-500">{error}</div>
          ) : usuarios.length === 0 ? (
            <div className="text-center py-20 text-gray-500 bg-white rounded-lg border border-dashed border-gray-300 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
              Nenhum profissional encontrado.
            </div>
          ) : (
            // grid com colunas de largura fixa (14rem) — gap permanece fixo ao redimensionar
            <div
              className="grid gap-y-6 gap-x-6"
              style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(14rem, 14rem))', justifyContent: 'start' }}
            >
              {usuarios.map((u, index) => (
                <ProfileCard
                  key={u.id || u.Id || index} 
                  profissional={u} 
                  onClick={() => setSelectedProfissional(u)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <PerfilModal 
        isOpen={!!selectedProfissional}
        onClose={() => setSelectedProfissional(null)}
        profissional={selectedProfissional}
      />
    </div>
  );
}