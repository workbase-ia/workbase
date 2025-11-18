import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between  gap-4 mb-4">
          
          {/* Adicionar a imagem da Logo */}
          <img 
            src="#" 
            alt="Logo WorkBase AI" 
            className="h-10 w-auto object-contain" 
          />
          {/* Bloco de Texto */}
            <p className="text-slate-400 text-sm">
              Conectando talentos para o futuro do trabalho. Uma rede profissional moderna e inclusiva.
            </p>
        </div>
        {/* Divisor e Copyright */}
        <div className="border-t border-slate-700 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-slate-500 text-xs">
              &copy; {currentYear} WorkBase AI. Todos os direitos reservados.
            </p>
            <p className="text-slate-500 text-xs flex items-center gap-1">
              Feito com <Heart size={12} className="text-red-500 fill-current" /> para o futuro do trabalho
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}