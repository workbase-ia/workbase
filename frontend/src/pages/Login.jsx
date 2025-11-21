import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; 

const API_URL = 'http://localhost:3001/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao tentar fazer login.');
      }

      // SUCESSO: 
      login(data); 
      navigate('/');   

      console.log('Login bem-sucedido:', data);

    } catch (err) {
      setError(err.message);
      console.error('Falha no login:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-100 dark:bg-gray-900 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          WorkBalance AI
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
          Bem-vindo de volta! Faça login em sua conta.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 min-h-96">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Email */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 placeholder-gray-400 dark:placeholder-gray-300 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Senha
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 placeholder-gray-400 dark:placeholder-gray-300 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500">
                  Esqueceu sua senha?
                </a>
              </div>
            </div>

            {/* Botão */}
            <div className="mt-12">
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 hover:bg-blue-700 py-2 px-4 text-sm font-medium text-white shadow-sm"
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </button>
            </div>

          </form>
        </div>
      </div>

      <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-300">
        Novo no WorkBalance AI?{' '}
        <a href="/cadastro" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500">
          Cadastre-se agora
        </a>
      </p>
    </div>
  );
}