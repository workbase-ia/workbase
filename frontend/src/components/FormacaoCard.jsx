import React from 'react';
import { BookOpen } from 'lucide-react';

export default function FormacaoCard({ formacao }) {
  if (!formacao || formacao.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Formação</h2>
      <div className="space-y-6">
        {formacao.map((form, index) => (
          <div key={index} className="flex gap-4">
            <BookOpen size={32} className="text-gray-500 shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{form.curso}</h3>
              <p className="text-gray-600">{form.instituicao}</p>
              <p className="text-sm text-gray-500 mt-1">{form.ano}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}