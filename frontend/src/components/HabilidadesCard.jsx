import React from 'react';
import { Award } from 'lucide-react';

export default function HabilidadesCard({ habilidadesTecnicas, softSkills }) {
  const hasTecSkills = habilidadesTecnicas && habilidadesTecnicas.length > 0;
  const hasSoftSkills = softSkills && softSkills.length > 0;

  if (!hasTecSkills && !hasSoftSkills) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Award size={22} className="text-gray-700" />
        <h2 className="text-xl font-bold text-gray-900">Habilidades</h2>
      </div>

      {/* Habilidades Técnicas */}
      {hasTecSkills && (
        <div className="flex flex-wrap gap-2">
          {habilidadesTecnicas.map((skill, index) => (
            <span 
              key={`tech-${index}`} 
              className=" text-black text-sm font-medium px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Soft Skills */}
      {hasSoftSkills && (
        <div className={`flex flex-wrap gap-2 ${hasTecSkills ? 'mt-3' : ''}`}> 
          {softSkills.map((skill, index) => (
            <span 
              key={`soft-${index}`} 
              className=" text-black text-sm font-medium px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}