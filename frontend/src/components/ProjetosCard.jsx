import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Github, ExternalLink, Plus, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';

const API_URL = 'http://127.0.0.1:3001/api';

export default function ProjetosCard({ projetos, MeuPerfil, onProfileUpdate }) {
  const { token } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [tempList, setTempList] = useState(
    (projetos || []).map(item => ({ ...item, tempId: Date.now() + Math.random() }))
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const isEmpty = !projetos || projetos.length === 0;

  useEffect(() => {
    setTempList((projetos || []).map(item => ({ ...item, tempId: Date.now() + Math.random() })));
  }, [projetos]);

  const handleAddItem = () => {
    setTempList([
      ...tempList,
      { tempId: Date.now(), titulo: '', link: '', descricao: '' }
    ]);
  };

  const handleRemoveItem = (tempId) => {
    setTempList(tempList.filter(p => p.tempId !== tempId));
  };

  const handleItemChange = (tempId, field, value) => {
    setTempList(tempList.map(item => 
      item.tempId === tempId ? { ...item, [field]: value } : item
    ));
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);

    const listToSave = tempList.map(({ tempId, ...rest }) => rest);

    try {
      const response = await fetch(`${API_URL}/perfil/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ projetos: listToSave }) 
      });

      if (!response.ok) throw new Error('Falha ao salvar projetos.');
      
      onProfileUpdate(); 
      setIsEditing(false); 

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setTempList((projetos || []).map(item => ({ ...item, tempId: Date.now() + Math.random() })));
    setIsEditing(false);
    setError(null);
  };

  if (isEmpty && !MeuPerfil) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg  p-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Projetos</h2>
        {/* Botão de Edição*/}
        {MeuPerfil && !isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-full hover:bg-gray-100"
            title="Editar projetos"
          >
            {isEmpty ? <Plus size={20} /> : <Edit size={18} />}
          </button>
        )}
      </div>
      
      {isEditing ? (
        //MODO DE EDIÇÃO
        <div className="space-y-4">
          {error && <p className="text-sm text-red-600">{error}</p>}
          
          {tempList.map((projeto, index) => (
            <div key={projeto.tempId} className="p-4 border border-gray-200 rounded-lg relative space-y-3">
              <button 
                onClick={() => handleRemoveItem(projeto.tempId)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1"
                title="Remover item"
              >
                <Trash2 size={18} />
              </button>
              
              <div>
                <label className="text-sm font-medium">Título do Projeto</label>
                <input
                  type="text"
                  value={projeto.titulo}
                  onChange={(e) => handleItemChange(projeto.tempId, 'titulo', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none  focus:ring-1 focus:ring-gray-400"
                  placeholder="Ex: API de E-commerce"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Link (GitHub, etc.)</label>
                <input
                  type="text"
                  value={projeto.link}
                  onChange={(e) => handleItemChange(projeto.tempId, 'link', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none  focus:ring-1 focus:ring-gray-400"
                  placeholder="Ex: https://github.com/..."
                />
              </div>
              <div>
                <label className="text-sm font-medium">Descrição</label>
                <textarea
                  value={projeto.descricao}
                  onChange={(e) => handleItemChange(projeto.tempId, 'descricao', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-20 focus:outline-none  focus:ring-1 focus:ring-gray-400"
                  placeholder="Descreva o projeto..."
                />
              </div>
            </div>
          ))}

          {/* Botões de Ação do Modo de Edição */}
          <button
            onClick={handleAddItem}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200"
          >
            <Plus size={18} />
            Adicionar Projeto
          </button>
          
          <div className="flex gap-2 justify-end border-t pt-4 mt-4">
            <button onClick={handleCancel} disabled={isLoading} className="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100">
              Cancelar
            </button>
            <button onClick={handleSave} disabled={isLoading} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50">
              {isLoading ? "Salvando..." : "Salvar Projetos"}
            </button>
          </div>
        </div>

      ) : (
        // --- MODO DE VISUALIZAÇÃO ---
        <div>
          {isEmpty ? (
            <p className="text-sm text-gray-500">
              Clique no botão '+' para adicionar seus projetos.
            </p>
          ) : (
            <div className="space-y-4">
              {projetos.map((projeto, index) => (
                <div key={index}>
                  <div className="flex items-center gap-2">
                    <Github size={18} className="text-gray-600" />
                    <h3 className="text-md font-semibold text-gray-900">{projeto.titulo}</h3>
                  </div>
                  <p className="text-sm text-gray-700 mt-1 mb-2">{projeto.descricao}</p>
                  <a
                    href={projeto.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    Ver projeto <ExternalLink size={14} />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}