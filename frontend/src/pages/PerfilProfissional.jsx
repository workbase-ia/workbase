import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { MapPin, Briefcase, BookOpen, Plus, Send, Edit } from 'lucide-react';
import HabilidadesCard from '../components/HabilidadesCard.jsx';
import ProjetosCard from '../components/ProjetosCard.jsx';
import CertificacoesCard from '../components/CertificacoesCard.jsx';
import IdiomasCard from '../components/IdiomasCard.jsx';
import SobreCard from '../components/SobreCard.jsx';
import ExperienciaCard from '../components/ExperienciaCard.jsx';
import FormacaoCard from '../components/FormacaoCard.jsx';

const API_URL = 'http://127.0.0.1:3001/api'; 

export default function PerfilProfissional() {
  const [perfil, setPerfil] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams(); 
  const { user: usuarioLogado } = useAuth(); 

  useEffect(() => {
    const fetchPerfil = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/perfil/${id}`);
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
  }, [id]); 

  const ehMeuPerfil = usuarioLogado && usuarioLogado.id === id;

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
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">

      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Card Principal do Perfil*/}
        <div className="bg-white border border-gray-200 rounded-lg ">
          {/* Placeholder da capa - mudar para ser foto depois */}
          <div className="h-32 md:h-48 bg-gray-200 rounded-t-lg"></div>
          
          <div className="p-6 relative">
            <img
              src={perfil.foto || ''} 
              alt={perfil.nome}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white absolute -mt-20 md:-mt-24 left-6"
            />
            
            {ehMeuPerfil && (
              <Link 
                to="/perfil/editar"
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
                title="Editar perfil"
              >
                <Edit size={20} className="text-gray-600" />
              </Link>
            )}

            <div className="mt-16 md:mt-20"> 
              <h1 className="text-3xl font-bold text-gray-900">{perfil.nome}</h1>
              <p className="text-lg text-gray-700 mt-1">{perfil.cargo}</p>
              <div className="flex items-center gap-2 text-gray-500 mt-2">
                <MapPin size={16} />
                <span>{perfil.localizacao}</span>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="mt-6 flex gap-3 flex-wrap">
              {!ehMeuPerfil && (
                <>
                  <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    <Plus size={18} />
                    Conectar
                  </button>
                  <button className="flex items-center gap-2 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                    <Send size={18} />
                    Mensagem
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Card de Criar Publicação*/}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <input 
            type="text"
            placeholder="Começar uma publicação..."
            className="w-full border border-gray-300 rounded-full px-4 py-3 bg-gray-50 hover:bg-gray-100 cursor-pointer"
          />
        </div>

        {/* Card de Publicações */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Publicações</h2>
          <p className="text-gray-500 text-center">
            Nenhuma publicação ainda.
          </p>
        </div>
        
        <SobreCard resumo={perfil.resumo} />
        
        <ExperienciaCard experiencias={perfil.experiencias} />
        
        <FormacaoCard formacao={perfil.formacao} />

        <HabilidadesCard 
          habilidadesTecnicas={perfil.habilidadesTecnicas}
          softSkills={perfil.softSkills}
        />
        
        <ProjetosCard projetos={perfil.projetos} />
        
        <CertificacoesCard certificacoes={perfil.certificacoes} />
        
        <IdiomasCard idiomas={perfil.idiomas} />

      </div> 
    </div>
  );
}