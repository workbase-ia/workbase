import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Plus, Trash2, Edit } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';

const API_URL = 'http://127.0.0.1:3001/api';

export default function ExperienciaCard({ experiencias, MeuPerfil, onProfileUpdate }) {
  const { token } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [tempList, setTempList] = useState(experiencias || []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const isEmpty = !experiencias || experiencias.length === 0;

  useEffect(() => {
    setTempList(experiencias || []);
  }, [experiencias]);

  const handleAddItem = () => {
    setTempList([
      ...tempList,
      { cargo: '', empresa: '', inicio: '', fim: '', descricao: '' }
    ]);
  };

  const handleRemoveItem = (index) => {
    setTempList(tempList.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, field, value) => {
    const newList = [...tempList];
    newList[index][field] = value;
    setTempList(newList);
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
        body: JSON.stringify({ experiencias: tempList }) 
      });

      if (!response.ok) throw new Error('Falha ao salvar experiências.');
      
      onProfileUpdate(); 
      setIsEditing(false); 

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setTempList(experiencias || []); 
    setIsEditing(false);
    setError(null);
  };

  if (isEmpty && !MeuPerfil) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 relative dark:bg-slate-900 dark:border-slate-800">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Experiência</h2>
        {/* Botão de Edição */}
        {MeuPerfil && !isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800"
            title="Editar experiências"
          >
            {isEmpty ? <Plus size={20} /> : <Edit size={18} />}
          </button>
        )}
      </div>
      
      {isEditing ? (
        // --- MODO DE EDIÇÃO (Formulário de Lista) ---
        <div className="space-y-4">
          {error && <p className="text-sm text-red-600">{error}</p>}
          
          {tempList.map((exp, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg relative space-y-2">
              <button 
                onClick={() => handleRemoveItem(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1"
                title="Remover item"
              >
                <Trash2 size={18} />
              </button>
              
              <div>
                <label className="text-sm font-medium">Cargo</label>
                <input
                  type="text"
                  value={exp.cargo}
                  onChange={(e) => handleItemChange(index, 'cargo', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                  placeholder="Ex: Desenvolvedor Pleno"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Empresa</label>
                <input
                  type="text"
                  value={exp.empresa}
                  onChange={(e) => handleItemChange(index, 'empresa', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none  focus:ring-1 focus:ring-gray-400"
                  placeholder="Ex: Google"
                />
              </div>
              <div>   
                <label className="text-sm font-medium">Início</label>
                <input
                  type="text" 
                  value={exp.inicio}
                  onChange={(e) => handleItemChange(index, 'inicio', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none  focus:ring-1 focus:ring-gray-400"
                  placeholder="Ex: 2021-01"
                />
              </div>
              <div>   
                <label className="text-sm font-medium">Fim</label>
                <input
                  type="text" 
                  value={exp.fim}
                  onChange={(e) => handleItemChange(index, 'fim', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none  focus:ring-1 focus:ring-gray-400"
                  placeholder="Ex: 2022-12 ou Atual"
                />
              </div>
              <div>   
                <label className="text-sm font-medium">Descrição</label>
                <textarea
                  value={exp.descricao}
                  onChange={(e) => handleItemChange(index, 'descricao', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none  focus:ring-1 focus:ring-gray-400"
                  placeholder="Descreva suas responsabilidades e conquistas"
                />
              </div>
            </div>
          ))}

          {/* Botões de Ação do Modo de Edição */}
          <button
            onClick={handleAddItem}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
           >
             <Plus size={18} />
             Adicionar Experiência
           </button>
          
          <div className="flex gap-2 justify-end border-t pt-4 mt-4">
            <button onClick={handleCancel} disabled={isLoading} className="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-slate-800">
               Cancelar
             </button>
            <button onClick={handleSave} disabled={isLoading} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50">
               {isLoading ? "Salvando..." : "Salvar Experiências"}
             </button>
           </div>
         </div>

       ) : (
        // --- MODO DE VISUALIZAÇÃO ---
        <div>
          {isEmpty ? (
            <p className="text-sm text-gray-500">
              Clique no botão '+' para adicionar suas experiências.
            </p>
          ) : (
            <div className="space-y-6">
              {experiencias.map((exp, index) => (
                <div key={index} className="flex gap-4">
                  <Briefcase size={32} className="text-gray-500 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{exp.cargo}</h3>
                    <p className="text-gray-600 dark:text-slate-300">{exp.empresa}</p>
                    <p className="text-sm text-gray-500 mt-1 dark:text-slate-400">
                       {exp.inicio} - {exp.fim || 'Atual'}
                     </p>
                    <p className="text-gray-700 mt-2 dark:text-slate-300">{exp.descricao}</p>
                   </div>
                 </div>
               ))}
             </div>
           )}
         </div>
       )}
     </div>
   );
 }