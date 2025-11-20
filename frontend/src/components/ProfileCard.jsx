import React from 'react';
import { MapPin, UserPlus } from 'lucide-react';

const handleConnect = () => {
    
  };

export default function CardProfissional({ profissional, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer flex flex-col items-center text-center h-72 w-56"
    >
      {/* Foto */}
      <img
        src={profissional.foto || ''}
        alt={profissional.nome}
        className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-gray-100"
      />
      
      {/* Nome e Cargo */}
      <h3 className="text-lg font-bold text-gray-900 mb-1">{profissional.nome}</h3>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{profissional.cargo}</p>
      
      {/* Localização */}
      <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
        <MapPin size={14} />
        <span>{profissional.localizacao}</span>
      </div>
      
      {/* Botão de Ação */}
      <button 
      onClick={handleConnect}
      className="flex items-center gap-2 mt-auto w-full py-2 px-12 border border-blue-600 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors">
        <UserPlus size={18} />
        Conectar
      </button>
    </div>
  );
}