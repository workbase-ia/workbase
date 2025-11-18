import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, Plus, Edit, Trash2, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';

const API_URL = 'http://127.0.0.1:3001/api';

export default function HabilidadesCard({ habilidadesTecnicas, softSkills, MeuPerfil, onProfileUpdate }) {
  const { token } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  
  // Estados temporários para as listas
  const [tempTechSkills, setTempTechSkills] = useState(habilidadesTecnicas || []);
  const [tempSoftSkills, setTempSoftSkills] = useState(softSkills || []);
  
  // Estados para o novo input de adicionar
  const [newSkillText, setNewSkillText] = useState('');
  const [newSkillType, setNewSkillType] = useState(''); 
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const isEmpty = (!habilidadesTecnicas || habilidadesTecnicas.length === 0) &&
                  (!softSkills || softSkills.length === 0);

  // Sincroniza os estados temporários se as props mudarem (após salvar)
  useEffect(() => {
    setTempTechSkills(habilidadesTecnicas || []);
    setTempSoftSkills(softSkills || []);
  }, [habilidadesTecnicas, softSkills]);

  //  Funções de Manipulação da Lista
  const handleAddSkill = (e) => {
    e.preventDefault(); 
    if (newSkillText.trim() === '') return; 

    if (newSkillType === 'tech') {
      setTempTechSkills([...tempTechSkills, newSkillText.trim()]);
    } else {
      setTempSoftSkills([...tempSoftSkills, newSkillText.trim()]);
    }
    setNewSkillText(''); 
  };

  const handleRemoveSkill = (type, index) => {
    if (type === 'tech') {
      setTempTechSkills(tempTechSkills.filter((_, i) => i !== index));
    } else {
      setTempSoftSkills(tempSoftSkills.filter((_, i) => i !== index));
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/perfil/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          habilidadesTecnicas: tempTechSkills,
          softSkills: tempSoftSkills
        }) 
      });

      if (!response.ok) throw new Error('Falha ao salvar habilidades.');
      
      onProfileUpdate(); 
      setIsEditing(false); 

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Reseta para as listas originais
    setTempTechSkills(habilidadesTecnicas || []);
    setTempSoftSkills(softSkills || []);
    setIsEditing(false);
    setError(null);
    setNewSkillText('');
  };

  if (isEmpty && !MeuPerfil) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 relative">
      {/* Cabeçalho com Título e Botão de Edição */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Award size={22} className="text-gray-700" />
          <h2 className="text-xl font-bold text-gray-900">Habilidades</h2>
        </div>
        {MeuPerfil && !isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-full hover:bg-gray-100"
            title="Editar habilidades"
          >
            {isEmpty ? <Plus size={20} /> : <Edit size={18} />}
          </button>
        )}
      </div>
      
      {isEditing ? (
        // MODO DE EDIÇÃO 
        <div className="space-y-4">
          {error && <p className="text-sm text-red-600">{error}</p>}
          
          {/* Formulário para Adicionar Nova Habilidade */}
          <form onSubmit={handleAddSkill} className="flex gap-2 items-end">
            <div >
              <label className="text-sm font-medium">Nova Habilidade</label>
              <input
                type="text"
                value={newSkillText}
                onChange={(e) => setNewSkillText(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
                placeholder="Ex: React, Comunicação"
              />
            </div>
            <div className="flex">
              <select
                value={newSkillType}
                onChange={(e) => setNewSkillType(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-[42px] focus:outline-none  focus:ring-1 focus:ring-gray-400"
              >
                <option value="tech">Técnica</option>
                <option value="soft">Soft Skill</option>
              </select>
            </div>
            <button
              type="submit"
              className="p-2 bg-blue-600 text-white rounded-lg h-[42px] hover:bg-blue-700"
            >
              <Plus size={18} />
            </button>
          </form>

          {/* Lista de Habilidades Técnicas (Editável) */}
          <div className="border-t pt-4">
            <h4 className="text-md font-semibold text-gray-800 mb-2">Habilidades Técnicas</h4>
            <div className="flex flex-wrap gap-2">
              {tempTechSkills.map((skill, index) => (
                <span key={index} className="flex items-center gap-1 bg-blue-50 text-black text-sm font-medium px-3 py-1 rounded-full">
                  {skill}
                  <button onClick={() => handleRemoveSkill('tech', index)} className="hover:bg-blue-200 rounded-full">
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Lista de Soft Skills (Editável) */}
          <div className="border-t pt-4">
            <h4 className="text-md font-semibold text-gray-800 mb-2">Soft Skills</h4>
            <div className="flex flex-wrap gap-2">
              {tempSoftSkills.map((skill, index) => (
                <span key={index} className="flex items-center gap-1 bg-green-50 text-black text-sm font-medium px-3 py-1 rounded-full">
                  {skill}
                  <button onClick={() => handleRemoveSkill('soft', index)} className=" rounded-full">
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex gap-2 justify-end border-t pt-4 mt-4">
            <button onClick={handleCancel} disabled={isLoading} className="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100">
              Cancelar
            </button>
            <button onClick={handleSave} disabled={isLoading} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50">
              {isLoading ? "Salvando..." : "Salvar Habilidades"}
            </button>
          </div>
        </div>

      ) : (
        // MODO DE VISUALIZAÇÃO 
        <div>
          {isEmpty ? (
            <p className="text-sm text-gray-500">
              Clique no botão '+' para adicionar suas habilidades.
            </p>
          ) : (
            <>
              {/* Habilidades Técnicas (Visualização) */}
              {tempTechSkills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tempTechSkills.map((skill, index) => (
                    <span 
                      key={`tech-${index}`} 
                      className=" text-black text-sm font-medium px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
              {/* Soft Skills (Visualização) */}
              {tempSoftSkills.length > 0 && (
                <div className={`flex flex-wrap gap-2 ${tempTechSkills.length > 0 ? 'mt-3' : ''}`}>
                  {tempSoftSkills.map((skill, index) => (
                    <span 
                      key={`soft-${index}`} 
                      className=" text-black text-sm font-medium px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}