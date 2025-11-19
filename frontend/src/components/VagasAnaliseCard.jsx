import React from 'react';

export default function VagasAnaliseCard({ analiseSkills, vagasLength, isLoading, termo }) {
  
  const safeAnaliseSkills = Array.isArray(analiseSkills) ? analiseSkills : [];
  const hasData = safeAnaliseSkills.length > 0;
  
  if (isLoading || !hasData) {
    return null; 
  }

  // Lógica para separar Soft Skills de Hard Skills para exibição
  const softSkills = safeAnaliseSkills.filter(s => 
    s.nome.includes('Comunicação') || s.nome.includes('Liderança') || s.nome.includes('Resolução') || s.nome.includes('Adaptabilidade')
  ).slice(0, 3); 

  const hardSkills = safeAnaliseSkills.filter(s => 
    !softSkills.some(ss => ss.nome === s.nome)
  ).slice(0, 5);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        📊 Análise de Requisitos para "{termo}"
        <span className="text-sm font-normal text-gray-500 block mt-1">
          Baseado em {vagasLength} {vagasLength === 1 ? 'vaga' : 'vagas'} encontradas.
        </span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        
        {/* Coluna 1: Hard Skills */}
        <div>
          <h4 className="font-semibold text-lg text-black mb-2 border-b pb-1">Top 5 Habilidades Técnicas</h4>
          <ul className="space-y-2">
            {hardSkills.map((skill, index) => (
              <li key={index} className="flex justify-between items-center text-sm">
                <span>{skill.nome}</span>
                <span className=" text-black ">
                  {skill.contagem} Vagas
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Coluna 2: Soft Skills */}
        <div>
          <h4 className="font-semibold text-lg text-black mb-2 border-b pb-1">Top 3 Soft Skills</h4>
          <ul className="space-y-2">
            {softSkills.map((skill, index) => (
              <li key={index} className="flex justify-between items-center text-sm">
                <span>{skill.nome}</span>
                <span className=" text-black ">
                  {skill.contagem} Vagas
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}