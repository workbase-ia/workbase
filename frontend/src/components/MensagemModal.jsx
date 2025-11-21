import React, { useState } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';

const API_URL = 'http://127.0.0.1:3001/api';

export default function MensagemModal({ isOpen, onClose, profissional }) {
  const { token } = useAuth();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen || !profissional) return null;

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    if (!token){
      setError('Você precisa estar logado para enviar mensagens');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const targetId = profissional.id || profissional.Id;
      
      const response = await fetch(
        `${API_URL}/mensagens/enviar/${profissional.id || profissional.Id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ conteudo: message }),
        }
      );

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setMessage('');
          onClose();
        }, 1500);
      } else {
        throw new Error('Falha ao enviar mensagem.');
      }
    } catch (err) {
      console.error(err);
      setError('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-xl shadow-2xl p-6 relative border border-slate-200 dark:border-slate-800">
        <div className="flex justify-between items-center mb-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Nova Mensagem</h3>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Para:{' '}
            <span className="font-semibold text-slate-900 dark:text-white">
              {profissional.nome}
            </span>
          </p>
        </div>

        {success ? (
          <div className="py-8 text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-3">
              <Send size={24} className="text-green-600 dark:text-green-400" />
            </div>
            <p className="text-green-700 dark:text-green-300 font-medium">
              Mensagem enviada com sucesso!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSend}>
            <textarea
              className="w-full h-32 p-3 border border-slate-300 dark:border-slate-700 rounded-lg resize-none focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400"
              placeholder="Escreva sua mensagem aqui..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isLoading}
            />

            {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="px-4 py-2 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={isLoading || !message.trim()}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                Enviar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}