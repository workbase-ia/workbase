import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

export default function ProjetosCard({ projetos }) {
  if (!projetos || projetos.length === 0) {
    return null; 
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Projetos</h2>
      <div className="space-y-4">
        {projetos.map((projeto, index) => (
          <div key={index}>
            <div className="flex items-center gap-2">
              <Github size={18} className="text-gray-600" />
              <h3 className="text-md font-semibold text-gray-900">{projeto.titulo}</h3>
            </div>
            <p className="text-sm text-gray-700 mt-1 mb-2">{projeto.descricao}</p>
            <a
              href={projeto.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              Ver projeto <ExternalLink size={14} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}