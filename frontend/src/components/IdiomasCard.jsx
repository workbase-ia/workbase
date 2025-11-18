import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Languages, Plus, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';

const API_URL = 'http://127.0.0.1:3001/api';

export default function IdiomasCard({ idiomas, MeuPerfil, onProfileUpdate }) {
  const { token } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [tempList, setTempList] = useState(idiomas || []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const isEmpty = !idiomas || idiomas.length === 0;

  // Sincroniza o estado temporário se a prop 'idiomas' mudar
  useEffect(() => {
    setTempList(idiomas || []);
  }, [idiomas]);

  // Funções de Manipulação do Array

  const handleAddItem = () => {
    setTempList([
      ...tempList,
      { idioma: '', nivel: '' }
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

  //  Salvar e Cancelar 

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
        
        body: JSON.stringify({ idiomas: tempList }) 
      });

      if (!response.ok) throw new Error('Falha ao salvar idiomas.');
      
      onProfileUpdate(); 
      setIsEditing(false); 

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setTempList(idiomas || []); 
    setIsEditing(false);
    setError(null);
  };

  
  if (isEmpty && !MeuPerfil) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Idiomas</h2>
        {/* Botão de Edição (só aparece se for MeuPerfil e NÃO estiver editando) */}
        {MeuPerfil && !isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-full hover:bg-gray-100"
            title="Editar idiomas"
          >
            {isEmpty ? <Plus size={20} /> : <Edit size={18} />}
          </button>
        )}
      </div>
      
      {isEditing ? (
        //  MODO DE EDIÇÃO (Formulário de Lista)
        <div className="space-y-4">
          {error && <p className="text-sm text-red-600">{error}</p>}
          
          {tempList.map((idioma, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg relative space-y-3">
              <button 
                onClick={() => handleRemoveItem(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1"
                title="Remover item"
              >
                <Trash2 size={18} />
              </button>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Idioma</label>
                  <input
                    type="text"
                    value={idioma.idioma}
                    onChange={(e) => handleItemChange(index, 'idioma', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
                    placeholder="Ex: Inglês"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Nível</label>
                  <input
                    type="text"
                    value={idioma.nivel}
                    onChange={(e) => handleItemChange(index, 'nivel', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
                    placeholder="Ex: Avançado"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Botões de Ação do Modo de Edição */}
          <button
            onClick={handleAddItem}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200"
          >
            <Plus size={18} />
            Adicionar Idioma
          </button>
          
          <div className="flex gap-2 justify-end border-t pt-4 mt-4">
            <button onClick={handleCancel} disabled={isLoading} className="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100">
              Cancelar
            </button>
            <button onClick={handleSave} disabled={isLoading} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50">
              {isLoading ? "Salvando..." : "Salvar Idiomas"}
            </button>
          </div>
        </div>

      ) : (
        // --- MODO DE VISUALIZAÇÃO ---
        <div>
          {isEmpty ? (
            <p className="text-sm text-gray-500">
              Clique no botão '+' para adicionar seus idiomas.
            </p>
          ) : (
            <div className="space-y-2">
              {idiomas.map((idioma, index) => (
                <div key={index}>
                  <span className="text-md font-semibold text-gray-900">{idioma.idioma}</span>
                  <p className="text-sm text-gray-600">{idioma.nivel}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}