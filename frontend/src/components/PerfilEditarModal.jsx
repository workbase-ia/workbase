import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx'; 
import { X } from 'lucide-react';

const API_URL = 'http://127.0.0.1:3001/api';

export default function PerfilEditarModal({ isOpen, onClose, perfil, onProfileUpdate }) {
  const { token } = useAuth();
    
  const [formData, setFormData] = useState({
    nome: perfil?.nome || '',
    cargo: perfil?.cargo || '',
    resumo: perfil?.resumo || '',
    localizacao: perfil?.localizacao || '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // 1. Garante que os inputs sejam pré-preenchidos com os dados atuais
  useEffect(() => {
    if (perfil) {
        setFormData({
            nome: perfil.nome || '',
            cargo: perfil.cargo || '',
            resumo: perfil.resumo || '',
            localizacao: perfil.localizacao || '',
        });
        setError(null);
        setSuccess(null);
    }
  }, [perfil, isOpen]);

  // Função CORRIGIDA: Atualiza o estado do formulário em cada digitação
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${API_URL}/perfil/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Falha ao atualizar o perfil.');
      }

      setSuccess('Perfil atualizado com sucesso!');
      
      // Dispara a busca por novos dados no componente pai
      onProfileUpdate(); 
      
      // 2. REMOVIDO: O setTimeout para fechar o modal
      onClose(); 

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  // 3. Estilização do Modal: Fundo Transparente para ver o Perfil
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden border border-gray-300">
        
        {/* Header do Modal */}
        <div className="p-5 border-b flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-900">Editar Perfil Principal</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900">
            <X size={24} />
          </button>
        </div>
        
        {/* Corpo do Formulário */}
        <div className="p-6 overflow-y-auto flex-1">
          {success && <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">{success}</div>}
          {error && <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Campo NOME */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
              <input type="text" name="nome" value={formData.nome} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-3 
             focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300" />
            </div>

            <div>
            {/* Campo RESUMO */}
              <label className="block text-sm font-medium text-gray-700">Resumo Profissional</label>
              <textarea name="resumo" value={formData.resumo} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-3 h-24 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300"></textarea>
            </div>

            <div>
            {/* Campo CARGO */}
              <label className="block text-sm font-medium text-gray-700">Cargo</label>
              <input type="text" name="cargo" value={formData.cargo} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300" />
            </div>

            <div>
            {/* Campo LOCALIZAÇÃO */}
              <label className="block text-sm font-medium text-gray-700">Localização (Cidade/Estado)</label>
              <input type="text" name="localizacao" value={formData.localizacao} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300" />
            </div>
          
            {/* Rodapé e Botões */}
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="px-6 py-3 text-gray-700 font-semibold border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}