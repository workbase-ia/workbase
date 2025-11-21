import React from 'react';

export default function SobreCard({ resumo }) {
  if (!resumo) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 dark:bg-slate-900 dark:border-slate-800">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 dark:text-white">Sobre</h2>
      <p className="text-gray-700 whitespace-pre-line dark:text-slate-300">{resumo}</p>
    </div>
  );
}