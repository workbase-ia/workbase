import React from 'react';
import { Languages } from 'lucide-react';

export default function IdiomasCard({ idiomas }) {
  if (!idiomas || idiomas.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Idiomas</h2>
      <div className="space-y-2">
        {idiomas.map((idioma, index) => (
          <div key={index}>
            <span className="text-md font-semibold text-gray-900">{idioma.idioma}</span>
            <p className="text-sm text-gray-600">{idioma.nivel}</p>
          </div>
        ))}
      </div>
    </div>
  );
}