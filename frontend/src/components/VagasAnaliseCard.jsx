import React from 'react';
import skillsData from '../../../backend/data/skillKeywords.json';

export default function VagasAnaliseCard({ analiseSkills, vagasLength, isLoading, termo }) {
  
  const safeAnaliseSkills = Array.isArray(analiseSkills) ? analiseSkills : [];
  const hasData = safeAnaliseSkills.length > 0;
  
  if (isLoading || !hasData) {
    return null; 
  }

  // Acessa a lista diretamente do arquivo JSON importado
  const listaSoftSkillsConhecidas = skillsData.soft_skills;

  //Compara com a lista do JSON
  const softSkillsEncontradas = safeAnaliseSkills.filter(skill => {
    return listaSoftSkillsConhecidas.some(ref => skill.nome.toLowerCase().includes(ref.toLowerCase()));
  }).slice(0, 3);

  const hardSkillsEncontradas = safeAnaliseSkills.filter(skill => {
    return !listaSoftSkillsConhecidas.some(ref => skill.nome.toLowerCase().includes(ref.toLowerCase()));
  }).slice(0, 5);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 dark:bg-slate-900 dark:border-slate-800 transition-colors">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 dark:text-white">
        Análise de Requisitos para: {termo}
        <span className="text-sm font-normal text-gray-500 block mt-1 dark:text-slate-400">
          Baseado em {vagasLength} {vagasLength === 1 ? 'vaga' : 'vagas'} encontradas.
        </span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        
        {/* Coluna 1: Hard Skills */}
        <div>
          <h4 className="font-semibold text-lg text-gray-900 mb-2 border-b border-gray-200 pb-1 dark:text-white dark:border-slate-700">
            Top 5 Hard Skills
          </h4>
          {hardSkillsEncontradas.length > 0 ? (
            <ul className="space-y-2">
              {hardSkillsEncontradas.map((skill, index) => (
                <li key={index} className="flex justify-between items-center text-sm group">
                  <span className="text-gray-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {skill.nome}
                  </span>
                  <span className="text-gray-700 dark:text-slate-400  dark:bg-slate-800 px-2 py-0.5 rounded text-xs font-medium">
                    {skill.contagem} {skill.contagem === 1 ? 'Vaga' : 'Vagas'}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 dark:text-slate-400 italic">Nenhuma habilidade técnica identificada.</p>
          )}
        </div>

        {/* Coluna 2: Soft Skills */}
        <div>
          <h4 className="font-semibold text-lg text-gray-900 mb-2 border-b border-gray-200 pb-1 dark:text-white dark:border-slate-700">
            Top 3 Soft Skills
          </h4>
          {softSkillsEncontradas.length > 0 ? (
            <ul className="space-y-2">
              {softSkillsEncontradas.map((skill, index) => (
                <li key={index} className="flex justify-between items-center text-sm group">
                  <span className="text-gray-700 dark:text-slate-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    {skill.nome}
                  </span>
                  <span className="text-gray-700 dark:text-slate-400 dark:bg-slate-800 px-2 py-0.5 rounded text-xs font-medium">
                    {skill.contagem} {skill.contagem === 1 ? 'Vaga' : 'Vagas'}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 dark:text-slate-400 italic">Nenhuma soft skill identificada.</p>
          )}
        </div>
      </div>
    </div>
  );
}