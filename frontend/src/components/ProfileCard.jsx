import { useState, useEffect } from 'react';
import { MapPin, UserPlus, Check, Loader2, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const API_URL = 'http://127.0.0.1:3001/api';

export default function CardProfissional({ profissional, onClick }) {
  const { token } = useAuth();

  const [status, setStatus] = useState(profissional.connectionStatus || 'idle');

  useEffect(() => {
    setStatus(profissional.connectionStatus || 'idle');
  }, [profissional.connectionStatus]);

  const handleConnect = async (e) => {
    e.stopPropagation();

    if (status !== 'idle') return;
    
    setStatus('loading');

    try {
      const targetId = profissional.id || profissional.Id;

      const response = await fetch(`${API_URL}/conexoes/convidar/${targetId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      } else {
        throw new Error("Erro na resposta do servidor.");
      }

      if (response.ok) {
        setStatus('pending'); 
      } else {
        if (data.message && data.message.toLowerCase().includes('já enviado')) {
          setStatus('pending');
        } else if (data.message && data.message.toLowerCase().includes('já conectados')) {
          setStatus('connected');
        } else {
          setStatus('idle'); 
          alert(data.message || 'Erro ao enviar convite');
        }
      }
    } catch (error) {
      console.error("Erro na conexão:", error);
      setStatus('idle');
      alert('Erro ao comunicar com o servidor.');
    }
  };

  const renderButton = () => {
    if (status === 'loading') {
      return (
        <button disabled className="flex items-center justify-center gap-2 mt-auto w-full py-2 px-4 border border-blue-600 text-blue-600 rounded-full text-sm font-medium opacity-70 cursor-wait bg-white dark:bg-slate-800">
          <Loader2 size={18} className="animate-spin" />
        </button>
      );
    }

    if (status === 'connected') {
      return (
      <button disabled className="flex items-center justify-center gap-2 mt-auto w-full py-2 px-4 border border-gray-300 bg-gray-100 text-gray-600 rounded-full text-sm font-medium cursor-default dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
        <Users size={18} /> Conectado
      </button>
    );
    }

    if (status === 'pending') {
      return (
      <button disabled className="flex items-center justify-center gap-2 mt-auto w-full py-2 px-4 border border-green-200 bg-green-50 text-green-700 rounded-full text-sm font-medium cursor-default dark:bg-green-900/30 dark:text-green-300 dark:border-green-700">
        <Check size={18} /> Enviado
      </button>
      );
  }

    return (
      <button 
        onClick={handleConnect}
        className="flex items-center justify-center gap-2 mt-auto w-full py-2 px-4 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-full text-sm font-medium transition-colors dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-900/40"
      >
        <UserPlus size={18} /> Conectar
      </button>
    );
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer flex flex-col items-center text-center h-72 w-56 relative hover:shadow-md transition-shadow dark:bg-slate-800 dark:border-slate-700"
    >
      <img
        src={profissional.foto || '../../public/profilePicture.png'}
        alt={profissional.nome}
        className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-gray-100"
      />
      
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 truncate w-full">{profissional.nome}</h3>
      <p className="text-sm text-gray-600 dark:text-slate-300 mb-3 line-clamp-2 min-h-40px">{profissional.cargo}</p>
      
      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-slate-300 mb-4">
        <MapPin size={14} />
        <span className="truncate max-w-[150px]">{profissional.localizacao || 'Brasil'}</span>
      </div>
      
      {renderButton()}
    </div>
  );
}