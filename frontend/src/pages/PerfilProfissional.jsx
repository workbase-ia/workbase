import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { MapPin, Plus, Send, Edit } from 'lucide-react';
import HabilidadesCard from '../components/HabilidadesCard.jsx';
import ProjetosCard from '../components/ProjetosCard.jsx';
import CertificacoesCard from '../components/CertificacoesCard.jsx';
import IdiomasCard from '../components/IdiomasCard.jsx';
import SobreCard from '../components/SobreCard.jsx';
import ExperienciaCard from '../components/ExperienciaCard.jsx';
import FormacaoCard from '../components/FormacaoCard.jsx';
import PerfilEditarModal from '../components/PerfilEditarModal.jsx';
import MensagemModal from '../components/MensagemModal.jsx';

const API_URL = 'http://127.0.0.1:3001/api'; 

export default function PerfilProfissional() {
  const [perfil, setPerfil] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMensagemModalOpen, setIsMensagemModalOpen] = useState(false);
  
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { user: usuarioLogado, loading, logout } = useAuth(); 
  
  useEffect(() => {
    if (!loading && !usuarioLogado) {
      navigate('/login');
    }
  }, [usuarioLogado, loading, navigate]);

  
  useEffect(() => {
    if (!usuarioLogado && !loading) return;
    const fetchPerfil = async () => {
      setIsLoading(true);
      setError(null);
      try {

        const response = await fetch(`${API_URL}/perfil/${id}`);
        
        if (response.status === 401) {
            logout(); 
            navigate('/login');
            return;
        }

        if (!response.ok) { throw new Error('Perfil não encontrado'); }
        const data = await response.json();
        setPerfil(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPerfil();
  }, [id, usuarioLogado, loading, logout, navigate]); 

  const handleProfileUpdate = () => {
    window.location.reload();
  };

  const handleOpenMensagem = () =>{
    setIsMensagemModalOpen(true);
  }

  const loggedId = usuarioLogado ? String(usuarioLogado.id ?? usuarioLogado.Id ?? '') : '';
  const perfilId = perfil ? String(perfil.id ?? perfil.Id ?? '') : '';
  const MeuPerfil = Boolean(loggedId && perfilId && loggedId === perfilId);

  if (loading) {
      return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  }

  if (!usuarioLogado) return null;

  if (isLoading) {
    return <div className="text-center p-10">Carregando perfil...</div>;
  }
  if (error) {
    return <div className="text-center p-10 text-red-600">Erro: {error}</div>;
  }
  if (!perfil) {
    return null; 
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/*  COLUNA ESQUERDA - Perfil Principal*/}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg ">
            {/* Capa */}
            <div className="h-24 md:h-28 bg-slate-200 dark:bg-slate-800 rounded-t-lg"></div>
            
            <div className="p-6 relative">
              <img
                src={perfil.foto || '../../public/profilePicture.png'} 
                alt={perfil.nome}
                className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-white dark:border-slate-900 absolute -mt-16 md:-mt-20 left-6 object-cover bg-white dark:bg-slate-800"
              />
              
              {MeuPerfil && (
                <button 
                  onClick={() => setIsModalOpen(true)} 
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 z-10 transition-colors"
                  title="Editar perfil"
                >
                <Edit size={20} className="text-slate-600 dark:text-slate-400" />
              </button>
              )}
              <PerfilEditarModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                perfil={perfil}
                onProfileUpdate={handleProfileUpdate} 
              />
              
              <div className="mt-12 md:mt-16"> 
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{perfil.nome}</h1>
                <p className="text-md text-slate-600 dark:text-slate-300 mt-1">{perfil.cargo}</p>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mt-2">
                  <MapPin size={16} />
                  <span className="text-sm">{perfil.localizacao}</span>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="mt-6 flex gap-3 flex-wrap">
                {!MeuPerfil && (
                  <>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      <Plus size={18} />
                      Conectar
                    </button>
                    <button 
                    onClick={handleOpenMensagem}
                    className="flex items-center gap-2 px-4 py-2 text-sm border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <Send size={18} />
                      Mensagem
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
    
          <SobreCard resumo={perfil.resumo} MeuPerfil={MeuPerfil}/>

          <ExperienciaCard experiencias={perfil.experiencias} MeuPerfil={MeuPerfil} onProfileUpdate={handleProfileUpdate}/>
          
          <FormacaoCard formacao={perfil.formacao} MeuPerfil={MeuPerfil} onProfileUpdate={handleProfileUpdate}/>

          <HabilidadesCard habilidadesTecnicas={perfil.habilidadesTecnicas} softSkills={perfil.softSkills} MeuPerfil={MeuPerfil} onProfileUpdate={handleProfileUpdate}/>

          <ProjetosCard projetos={perfil.projetos} MeuPerfil={MeuPerfil} onProfileUpdate={handleProfileUpdate}/>
          
          <CertificacoesCard certificacoes={perfil.certificacoes} MeuPerfil={MeuPerfil} onProfileUpdate={handleProfileUpdate}/>

          <IdiomasCard idiomas={perfil.idiomas} MeuPerfil={MeuPerfil} onProfileUpdate={handleProfileUpdate}/>
          
        </div>

        {/* COLUNA DIREITA - Feed/Publicações*/}
        <div className="md:col-span-2 space-y-6">
          
          {/* Card de Criar Publicação */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
              <input 
                type="text"
                placeholder="Começar uma publicação..."
                className="w-full border border-gray-300 rounded-full px-4 py-3 bg-gray-50  hover:bg-gray-100 cursor-pointer focus:outline-none focus:border-gray-400 focus:bg-gray-100"
              />
            </div>

          {/* Card de Publicações */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Publicações</h2>
            <p className="text-slate-500 dark:text-slate-400 text-center py-8">
              Nenhuma publicação ainda.
            </p>
          </div>
          
        </div>

      </div>
    </div>
  );
}