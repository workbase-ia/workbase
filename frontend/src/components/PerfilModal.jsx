import React, { useState, useEffect } from 'react';
import { X, MapPin, Briefcase, BookOpen, Award, User, Heart, MessageCircle, UserPlus, ThumbsUp, Coffee, Loader2, Check, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const API_URL = 'http://127.0.0.1:3001/api';

export default function ModalProfissional({ isOpen, onClose, profissional, onOpenMensagem }) {
  const { token } = useAuth();
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (isOpen && profissional) {
      setStatus(profissional.connectionStatus || 'idle');
  }
  }, [isOpen, profissional]);

    if (!isOpen || !profissional) return null;

  const handleConnect = async () => {
    if (status !== 'idle') return;
      
  setStatus('loading');

  try {
    const targetId = profissional.id || profissional.Id;
    const response = await fetch(`${API_URL}/conexoes/convidar/${targetId}`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.ok) {
    setStatus('pending');
    } else {
    setStatus('idle');
    alert('Não foi possível conectar.');
    }
  } catch (error) {
    console.error(error);
    setStatus('idle');
  }
  };

  const handleMessage = () => {
    onClose();
    if (onOpenMensagem){
      onOpenMensagem(profissional);
    }
  };

  const handleRecommend = () => {
  
  };

  const renderConnectButton = () => {
    if (status === 'loading') {
      return (
      <button disabled className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm text-white bg-blue-600 opacity-70 cursor-wait">
        <Loader2 size={18} className="animate-spin" />
      </button>
      );
    }
    
    if (status === 'connected') {
      return (
      <button disabled className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm text-gray-600 bg-gray-200 cursor-default border border-gray-300 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
        <Users size={18} /> Conectado
      </button>
      );
    }
    
    if (status === 'pending') {
      return (
      <button disabled className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm text-green-700 bg-green-50 border border-green-200 cursor-default dark:bg-green-900/30 dark:text-green-300 dark:border-green-700">
        <Check size={18} /> Enviado
      </button>
      );
    }

    return (
    <button 
      onClick={handleConnect}
      className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700"
    >
      <UserPlus size={18} /> Conectar
    </button>
    );
  };

  return (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
    <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-xl shadow-2xl overflow-hidden flex flex-col relative dark:bg-slate-900 dark:border-slate-800">
    <button
      type="button"
      onClick={onClose}
      className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-200 transition-colors z-20 cursor-pointer dark:hover:bg-slate-700 dark:text-slate-200"
    >
      <X size={20} />
    </button>

    <div className="overflow-y-auto flex-1 p-6 pt-18">
      <div className="flex flex-col md:flex-row gap-6 mb-8 items-center md:items-end relative px-1">
      <img
        src={profissional.foto || '../../public/profilePicture.png'}
        alt={profissional.nome}
        className="w-32 h-32 rounded-full border-4 border-white bg-white object-cover z-10"
      />
      
      <div className="flex-1 text-center md:text-left mb-2 pt-2 md:pt-0"> 
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mt-2 md:mt-0 dark:text-white">
        {profissional.nome}
        </h2>
        <p className="text-md text-gray-600 mt-1 dark:text-slate-300">{profissional.cargo}</p>
        <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-500 mt-2 dark:text-slate-300">
        <MapPin size={16} />
        <span>{profissional.localizacao || 'Brasil'}</span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3 mb-2 justify-center md:justify-end items-center w-full md:w-auto">
        <button 
        onClick={handleRecommend}
        className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg font-medium hover:bg-amber-100 transition-colors text-sm dark:bg-amber-900/10 dark:text-amber-300 dark:border-amber-700 dark:hover:bg-amber-800/20"
        >
        <ThumbsUp size={16} />
        <span className="hidden sm:inline">Recomendar</span>
        </button>

        <button 
        onClick={handleMessage}
        className="p-2.5 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        title="Enviar Mensagem"
        >
        <MessageCircle size={20} />
        </button>
        
        {renderConnectButton()}
      </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <section>
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2 dark:text-white">
          <User size={20} className="text-blue-600" /> Sobre
        </h3>
        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line dark:text-slate-300">
          {profissional.resumo || "Nenhum resumo disponível."}
        </p>
        </section>

        <section>
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2 dark:text-white">
          <Award size={20} className="text-blue-600" /> Habilidades Técnicas
        </h3>
        <div className="flex flex-wrap gap-2">
          {profissional.habilidadesTecnicas?.map((skill, i) => (
          <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100 dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-700">
            {skill}
          </span>
          ))}
        </div>
        </section>

        <section>
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2 dark:text-white">
          <Heart size={20} className="text-pink-600" /> Soft Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {profissional.softSkills?.map((skill, i) => (
          <span key={i} className="px-3 py-1 bg-pink-50 text-pink-700 rounded-full text-xs font-medium border border-pink-100 dark:bg-pink-900/30 dark:text-pink-200 dark:border-pink-700">
            {skill}
          </span>
          ))}
        </div>
        </section>

        {profissional.hobbies && profissional.hobbies.length > 0 && (
        <section>
          <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2 dark:text-white">
          <Coffee size={20} className="text-orange-500" /> Hobbies & Interesses
          </h3>
          <div className="flex flex-wrap gap-2">
          {profissional.hobbies.map((hobby, i) => (
            <span key={i} className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-medium border border-orange-100 dark:bg-orange-900/30 dark:text-orange-200 dark:border-orange-700">
            {hobby}
            </span>
          ))}
          </div>
        </section>
        )}
      </div>

      <div className="space-y-6">
        <section>
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2 dark:text-white">
          <Briefcase size={20} className="text-blue-600" /> Experiência
        </h3>
        <div className="space-y-4">
          {profissional.experiencias?.map((exp, i) => (
          <div key={i} className="border-l-2 border-gray-200 pl-4 pb-1 dark:border-slate-700">
            <h4 className="font-semibold text-gray-900 dark:text-white">{exp.cargo}</h4>
            <p className="text-sm text-blue-600 font-medium dark:text-blue-300">{exp.empresa}</p>
            <p className="text-xs text-gray-500 mb-1 dark:text-slate-400">{exp.inicio} - {exp.fim || 'Atual'}</p>
            <p className="text-sm text-gray-600 dark:text-slate-300">{exp.descricao}</p>
          </div>
          ))}
        </div>
        </section>

        <section>
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2 dark:text-white">
          <BookOpen size={20} className="text-blue-600" /> Formação
        </h3>
        <div className="space-y-4">
          {profissional.formacao?.map((form, i) => (
          <div key={i} className="border-l-2 border-gray-200 pl-4 pb-1 dark:border-slate-700">
            <h4 className="font-semibold text-gray-900 dark:text-white">{form.curso}</h4>
            <p className="text-sm text-gray-600 dark:text-slate-300">{form.instituicao}</p>
            <p className="text-xs text-gray-500 dark:text-slate-400">{form.ano}</p>
          </div>
          ))}
        </div>
        </section>
      </div>
      </div>
    </div>
    </div>
  </div>
  );
}