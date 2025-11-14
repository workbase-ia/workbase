import React from 'react';
import { Briefcase } from 'lucide-react';

export default function ExperienciaCard({ experiencias }) {
  if (!experiencias || experiencias.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Experiência</h2>
      <div className="space-y-6">
        {experiencias.map((exp, index) => (
          <div key={index} className="flex gap-4">
            <Briefcase size={32} className="text-gray-500 shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{exp.cargo}</h3>
              <p className="text-gray-600">{exp.empresa}</p>
              <p className="text-sm text-gray-500 mt-1">
                {exp.inicio} - {exp.fim || 'Atual'}
              </p>
              <p className="text-gray-700 mt-2">{exp.descricao}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}