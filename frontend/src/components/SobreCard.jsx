import React from 'react';

export default function SobreCard({ resumo }) {
  // Não mostra o card se não houver resumo
  if (!resumo) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Sobre</h2>
      {/* whitespace-pre-line preserva as quebras de linha do JSON */}
      <p className="text-gray-700 whitespace-pre-line">{resumo}</p>
    </div>
  );
}