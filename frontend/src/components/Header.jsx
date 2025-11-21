import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogIn, User, LogOut, ChevronDown, Sun, Moon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);

    // ✅ APENAS ESSA definição de tema
    const [isDark, setIsDark] = useState(() => {
        if (typeof window === 'undefined') return false;
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        const root = document.documentElement;

        if (isDark) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const toggleDark = () => setIsDark(prev => !prev);

  const profileLink = user ? `/perfil/${user.id}` : '/login';

  const navItems = [
    { name: 'Início', path: '/' },
    ...(isAuthenticated ? [{ name: 'Minha Rede', path: '/minha-rede' }] : []),
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

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setIsProfileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            WB
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">WorkBase AI</h1>
        </Link>

        {/* MENU DESKTOP */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* ÁREA DIREITA — DESKTOP */}
        <div className="hidden md:flex items-center gap-4 relative" ref={profileMenuRef}>

                    {/* BOTÃO DARK MODE */}
                    <button
                        onClick={toggleDark}
                        className="p-2 rounded-lg bg-slate-200 dark:bg-gray-700 text-slate-800 dark:text-slate-200 hover:opacity-80 transition"
                        aria-label="Alternar tema"
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

          {isAuthenticated ? (
            <>
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300">
                  <User size={20} />
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200 max-w-[100px] truncate">
                  {user?.nome || 'Usuário'}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-slate-500 dark:text-slate-300 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* DROPDOWN */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-44 bg-white dark:bg-gray-800 rounded-md py-1 ring-1 ring-gray-200 dark:ring-gray-700">
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700">
                    <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{user?.nome}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-300 truncate">{user?.email}</p>
                  </div>

                  <Link
                    to={profileLink}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-gray-700"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <User size={16} />
                    Ver Perfil
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 text-left"
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
          className="md:hidden p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MENU MOBILE */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-slate-200 dark:border-slate-700 ">
          <nav className="flex flex-col p-4 gap-2">

                        {/* BOTÃO DARK MODE MOBILE */}
                        <button
                            onClick={() => setIsDark(!isDark)}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                            <span className="font-medium text-slate-700 dark:text-slate-200">
                                Tema: {isDark ? 'Claro' : 'Escuro'}
                            </span>
                        </button>

            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="px-4 py-3 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <div className="border-t border-slate-200 dark:border-slate-700 my-2 pt-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to={profileLink}
                    className="flex items-center gap-3 px-4 py-3 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={20} />
                    Meu Perfil
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg font-medium text-left"
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