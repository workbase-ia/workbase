import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function CertificacoesCard({ certificacoes }) {
  if (!certificacoes || certificacoes.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Certificações e Cursos</h2>
      <ul className="space-y-3">
        {certificacoes.map((cert, index) => (
          <li key={index} className="flex items-start gap-2">
            <ShieldCheck size={18} className="text-blue-600 shrink-0 mt-1" />
            <span className="text-md text-gray-700">{cert}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}