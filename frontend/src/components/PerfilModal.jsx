import React from 'react';
import { X, MapPin, Briefcase, BookOpen, Award, User, Heart, MessageCircle, UserPlus, ThumbsUp, Coffee } from 'lucide-react';

export default function ModalProfissional({ isOpen, onClose, profissional }) {
  if (!isOpen || !profissional) return null;

  const handleConnect = () => {
    
  };

  const handleMessage = () => {
    
  };

  const handleRecommend = () => {
    
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 ">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-xl shadow-2xl overflow-hidden flex flex-col relative animate-in fade-in zoom-in duration-200">
        
        {/* Botão fechar  */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          title="Fechar"
          className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-200 transition-colors z-20 cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="overflow-y-auto flex-1 p-6 pt-18">
          
          {/* Cabeçalho do Perfil */}
          <div className="flex flex-col md:flex-row gap-6 mb-8 -mt-12 items-center md:items-end relative px-1">
            <img
              src={profissional.foto || ''}
              alt={profissional.nome}
              className="w-32 h-32 rounded-full border-4 border-white shadow-md bg-white object-cover z-10"
            />
            
            <div className="flex-1 text-center md:text-left mb-2 pt-2 md:pt-0"> 
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mt-2 md:mt-0">
                {profissional.nome}
              </h2>
              <p className="text-md text-gray-600 mt-1">{profissional.cargo}</p>
              <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-500 mt-2">
                <MapPin size={16} />
                <span>{profissional.localizacao}</span>
              </div>
            </div>
            
            {/* Botões de Ação Principais */}
            <div className="flex flex-wrap gap-3 mb-2 justify-center md:justify-end items-center w-full md:w-auto">
              
              {/* Botão Recomendar */}
              <button 
                onClick={handleRecommend}
                className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg font-medium hover:bg-amber-100 transition-colors text-sm"
                title="Recomendar Profissional"
              >
                <ThumbsUp size={16} />
                <span className="hidden sm:inline">Recomendar</span>
              </button>

              {/* Botão Mensagem */}
              <button 
                onClick={handleMessage}
                className="p-2.5 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                title="Enviar Mensagem"
              >
                <MessageCircle size={20} />
              </button>
              
              {/* Botão Conectar */}
              <button 
                onClick={handleConnect}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
              >
                <UserPlus size={18} />
                Conectar
              </button>
            </div>
          </div>

          {/* Grid de Informações */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Coluna Esquerda */}
            <div className="space-y-6">
              {/* Sobre */}
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <User size={20} className="text-blue-600" /> Sobre
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                  {profissional.resumo || "Nenhum resumo disponível."}
                </p>
              </section>

              {/* Habilidades Técnicas */}
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Award size={20} className="text-blue-600" /> Habilidades Técnicas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profissional.habilidadesTecnicas?.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              {/* Soft Skills */}
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Heart size={20} className="text-pink-600" /> Soft Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profissional.softSkills?.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-pink-50 text-pink-700 rounded-full text-xs font-medium border border-pink-100">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              {/* HOBBIES */}
              {profissional.hobbies && profissional.hobbies.length > 0 && (
                <section>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Coffee size={20} className="text-orange-500" /> Hobbies & Interesses
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profissional.hobbies.map((hobby, i) => (
                      <span key={i} className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-medium border border-orange-100">
                        {hobby}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Coluna Direita */}
            <div className="space-y-6">
              {/* Experiência */}
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Briefcase size={20} className="text-blue-600" /> Experiência
                </h3>
                <div className="space-y-4">
                  {profissional.experiencias?.map((exp, i) => (
                    <div key={i} className="border-l-2 border-gray-200 pl-4 pb-1">
                      <h4 className="font-semibold text-gray-900">{exp.cargo}</h4>
                      <p className="text-sm text-blue-600 font-medium">{exp.empresa}</p>
                      <p className="text-xs text-gray-500 mb-1">{exp.inicio} - {exp.fim || 'Atual'}</p>
                      <p className="text-sm text-gray-600">{exp.descricao}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Formação */}
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <BookOpen size={20} className="text-blue-600" /> Formação
                </h3>
                <div className="space-y-4">
                  {profissional.formacao?.map((form, i) => (
                    <div key={i} className="border-l-2 border-gray-200 pl-4 pb-1">
                      <h4 className="font-semibold text-gray-900">{form.curso}</h4>
                      <p className="text-sm text-gray-600">{form.instituicao}</p>
                      <p className="text-xs text-gray-500">{form.ano}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}