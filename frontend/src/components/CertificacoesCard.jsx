import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Plus, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';

const API_URL = 'http://127.0.0.1:3001/api';

export default function CertificacoesCard({ certificacoes, MeuPerfil, onProfileUpdate }) {
  const { token } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [tempList, setTempList] = useState(certificacoes || []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const isEmpty = !certificacoes || certificacoes.length === 0;

  useEffect(() => {
    setTempList(certificacoes || []);
  }, [certificacoes]);

  const handleAddItem = () => {
    setTempList([...tempList, ""]); 
  };

  const handleRemoveItem = (index) => {
    setTempList(tempList.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, value) => {
    const newList = [...tempList];
    newList[index] = value;
    setTempList(newList);
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const listToSave = tempList.filter(cert => cert.trim() !== '');

      const response = await fetch(`${API_URL}/perfil/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ certificacoes: listToSave }) 
      });

      if (!response.ok) throw new Error('Falha ao salvar certificações.');
      
      onProfileUpdate(); 
      setIsEditing(false); 

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setTempList(certificacoes || []); 
    setIsEditing(false);
    setError(null);
  };

  if (isEmpty && !MeuPerfil) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Certificações e Cursos</h2>
        {MeuPerfil && !isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-full hover:bg-gray-100"
            title="Editar certificações"
          >
            {isEmpty ? <Plus size={20} /> : <Edit size={18} />}
          </button>
        )}
      </div>
      
      {isEditing ? (
        //MODO DE EDIÇÃO 
        <div className="space-y-4">
          {error && <p className="text-sm text-red-600">{error}</p>}
          
          {tempList.map((cert, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg relative">
              <button 
                onClick={() => handleRemoveItem(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1"
                title="Remover item"
              >
                <Trash2 size={18} />
              </button>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Nome da Certificação/Curso</label>
                <input
                  type="text"
                  value={cert}
                  onChange={(e) => handleItemChange(index, e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none  focus:ring-1 focus:ring-gray-400"
                  placeholder="Ex: Oracle Certified Java Programmer"
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
            Adicionar Certificação
          </button>
          
          <div className="flex gap-2 justify-end border-t pt-4 mt-4">
            <button onClick={handleCancel} disabled={isLoading} className="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100">
              Cancelar
            </button>
            <button onClick={handleSave} disabled={isLoading} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50">
              {isLoading ? "Salvando..." : "Salvar Certificações"}
            </button>
          </div>
        </div>

      ) : (
        // MODO DE VISUALIZAÇÃO 
        <div>
          {isEmpty ? (
            <p className="text-sm text-gray-500">
              Clique no botão '+' para adicionar suas certificações.
            </p>
          ) : (
            <ul className="space-y-3">
              {certificacoes.map((cert, index) => (
                <li key={index} className="flex items-start gap-2">
                  <ShieldCheck size={18} className="text-blue-600 flex mt-1" />
                  <span className="text-md text-gray-700">{cert}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}