import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogIn, User, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';

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
    { name: 'Sobre', path: '/sobre' },
    { name: 'Contato', path: '/contato' },
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

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileMenuRef]);

  return (
    <header className="bg-white shadow-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* Logo e Título */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            WB
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
        </nav>

        {/* Área direita Desktop */}
        <div className="hidden md:flex items-center gap-4 relative" ref={profileMenuRef}>
          {isAuthenticated ? (
            <>
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 p-2 rounded-full hover:bg-slate-100 transition"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <User size={20} />
                </div>
                <span className="text-sm font-medium text-slate-700 max-w-[100px] truncate">
                  {user?.nome || 'Usuário'}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-slate-500 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-md py-1 shadow ring-1 ring-gray-200 animate-in fade-in zoom-in duration-200 origin-top-right">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-sm font-medium text-slate-900 truncate">{user?.nome}</p>
                    <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                  </div>

                  <Link
                    to={profileLink}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <User size={16} />
                    Ver Perfil
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left"
                  >
                    <LogOut size={16} />
                    Sair
                  </button>
                </div>
              )}
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

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-slate-100 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 shadow-lg">
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg font-medium"
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
                    className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={20} />
                    Meu Perfil
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium text-left"
                  >
                    <LogOut size={20} />
                    Sair
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLogin}
                  className="w-full flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium mt-2"
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
