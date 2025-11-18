import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importe Link e useNavigate
import { Menu, X, LogIn, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx'; // Acessa o estado de autenticação

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
      
  // O link do perfil só é construído se o usuário existir
  const profileLink = user ? `/perfil/${user.id}` : '/login';

  // Itens de navegação principal
  const navItems = [
    { name: 'Início', path: '/' },
    { name: 'Vagas', path: '/vagas' },
  ];

  const handleLogin = () => {
    navigate('/login');
    setIsMenuOpen(false); 
  };

  const handleLogout = () => {
    logout(); 
    navigate('/login'); 
    setIsMenuOpen(false); 
      
  return (
    <header className="bg-white shadow-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo e Título */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            WA
          </div>
          <h1 className="text-2xl font-bold text-slate-900">WorkBase AI</h1>
        </Link>

        {/* Menu Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link 
              key={item.name}
              to={item.path} 
              className="text-slate-600 hover:text-blue-600 transition font-medium"
            >
              {item.name}
            </Link>
          ))}
          
          {isAuthenticated && (
            <Link 
              to={profileLink} 
              className="text-slate-600 hover:text-blue-600 transition font-medium"
            >
              Perfil
            </Link>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              {/* Ícone do Perfil*/}
              <Link to={profileLink} title="Meu Perfil" className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                <User size={20} className="text-slate-600" />
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogin} 
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              <LogIn size={18} />
              Entrar
            </button>
          )}
        </div>

        {/* Menu Mobile Toggle */}
        <button
        className="md:hidden p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
        {isMenuOpen ? (
          <X size={24} className="text-slate-900" />
        ) : (
          <Menu size={24} className="text-slate-900" />
        )}
        </button>
      </div>

      {/* Menu Mobile Expandido */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-50 border-t border-slate-200">
          <nav className="flex flex-col gap-4 p-4">
            {/* Itens de Navegação */}
            {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.path} 
                className="text-slate-600 hover:text-blue-600 transition font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Link Perfil Mobile (Se autenticado) */}
            {isAuthenticated && (
              <Link 
                to={profileLink} 
                className="text-slate-600 hover:text-blue-600 transition font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Perfil
              </Link>
            )}

            <div className="border-t border-slate-200 pt-4">
              {/* Botões de Autenticação Mobile */}
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium"
                >
                  <LogOut size={18} />
                  Sair
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  <LogIn size={18} />
                  Entrar
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}}