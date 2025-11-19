import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { Menu, X, LogIn, User, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx'; 
import ToggleDark from './ToggleDark';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); 
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const profileMenuRef = useRef(null); 

  const profileLink = user ? `/perfil/${user.id}` : '/login';

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
    setIsProfileMenuOpen(false);
  };

  // Fecha o menu de perfil se clicar fora dele
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuRef]);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo e Título */}
        <Link to="/" className="flex items-center gap-3">
          <img 
            src="#" 
            alt="Logo WorkBase AI" 
            className="h-10 w-auto object-contain" 
          />
          <h1 className="text-2xl font-bold text-slate-900">WorkBase AI</h1>
        </Link>

        {/* Menu Desktop (Central) */}
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
        </nav>

        {/* Área de Ação (Direita) - Desktop */}
        <div className="hidden md:flex items-center gap-4 relative" ref={profileMenuRef}>
          {isAuthenticated ? (
            <>
              <button 
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 p-2 rounded-full hover:bg-slate-100 transition-colors focus:outline-none"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <User size={20} />
                </div>
                <span className="text-sm font-medium text-slate-700 max-w-[100px] truncate">{user?.nome || 'Usuário'}</span>
                <ChevronDown size={16} className={`text-slate-500 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-md py-1 animate-in fade-in zoom-in duration-200 origin-top-right ring-1 ring-gray-200">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-sm font-medium text-slate-900 truncate">{user?.nome}</p>
                    <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                  </div>
                  
                  <Link 
                    to={profileLink} 
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <User size={16} />
                    Ver Perfil
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                  >
                    <LogOut size={16} />
                    Sair
                  </button>
                </div>
              )}
            </>
          ) : (
            // Usuário Deslogado: Botão Entrar
            <button
              onClick={handleLogin} 
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-sm"
            >
              <LogIn size={18} />
              Entrar
            </button>
          )}
        </div>

        {/* Menu Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-slate-100 transition-colors"
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
        <div className="md:hidden bg-white border-t border-slate-200 absolute w-full shadow-lg">
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.path} 
                className="px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="border-t border-slate-200 my-2 pt-2">
              {isAuthenticated ? (
                <>
                  <Link 
                    to={profileLink} 
                    className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={20} />
                    Meu Perfil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition font-medium text-left"
                  >
                    <LogOut size={20} />
                    Sair
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLogin}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium mt-2"
                >
                  <LogIn size={20} />
                  Entrar
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
