import React from 'react';
import { Menu, X, LogOut, Home, User, Sun, Moon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [profileOpen, setProfileOpen] = React.useState(false);

    // Tema vem SOMENTE do localStorage
    const [isDark, setIsDark] = React.useState(() => {
        if (typeof window === 'undefined') return false;
        return localStorage.getItem('theme') === 'dark';
    });

    // Aplica tema e salva — sem ler do sistema
    React.useEffect(() => {
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

    const { user, logout, isAuthenticated } = useAuth();

    return (
        <header className="bg-white dark:bg-gray-800 shadow-md border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <div className="hidden dark:block">DARK</div>
                <div className="block dark:hidden">LIGHT</div>
                
                {/* LOGO */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                        WB
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Workbase AI</h1>
                </div>

                {/* MENU DESKTOP */}
                <nav className="hidden md:flex items-center gap-8">
                    <a 
                        href="/"
                        className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 transition font-medium"
                    >
                        <Home size={20} />
                        Home
                    </a>
                </nav>

                {/* ÁREA DIREITA DESKTOP */}
                <div className="hidden md:flex items-center gap-6 relative">
                    {/* BOTÃO DARK/LIGHT */}
                    <button
                        onClick={toggleDark}
                        className="p-2 rounded-lg bg-slate-200 dark:bg-gray-700 text-slate-800 dark:text-slate-200 hover:opacity-80 transition"
                        aria-label="Alternar tema"
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {isAuthenticated ? (
                        <>
                            {/* Avatar */}
                            <button
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold hover:opacity-90 transition"
                            >
                                {user?.nome?.[0]?.toUpperCase() || "U"}
                            </button>

                            {/* Dropdown */}
                            {profileOpen && (
                                <div className="absolute right-0 top-14 w-40 bg-white dark:bg-gray-700 shadow-lg border border-slate-200 dark:border-slate-600 rounded-lg py-2">
                                    <a
                                        href={`/perfil/${user?.id}`}
                                        className="flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-gray-600 transition"
                                    >
                                        <User size={18} />
                                        Meu Perfil
                                    </a>

                                    <button
                                        onClick={logout}
                                        className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/40 transition"
                                    >
                                        <LogOut size={18} />
                                        Sair
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <a
                            href="/login"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                        >
                            <Home size={18} />
                            Entrar
                        </a>
                    )}
                </div>

                {/* MOBILE */}
                <div className="md:hidden flex items-center gap-2">
                    {/* BOTÃO DARK/LIGHT MOBILE */}
                    <button
                        onClick={toggleDark}
                        className="p-2 rounded-lg bg-slate-200 dark:bg-gray-700 text-slate-800 dark:text-slate-200 hover:opacity-80 transition"
                        aria-label="Alternar tema"
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <button className="p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? (
                            <X size={24} className="text-slate-900 dark:text-white" />
                        ) : (
                            <Menu size={24} className="text-slate-900 dark:text-white" />
                        )}
                    </button>
                </div>
            </div>

            {/* MENU MOBILE */}
            {isMenuOpen && (
                <div className="md:hidden bg-slate-50 dark:bg-gray-700 border-t border-slate-200 dark:border-slate-600">
                    <nav className="flex flex-col gap-4 p-4">
                        
                        <a 
                            href="/" 
                            className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 transition font-medium"
                        >
                            <Home size={20} />
                            Home
                        </a>

                        <div className="border-t border-slate-200 dark:border-slate-600 pt-4">
                            {isAuthenticated ? (
                                <>
                                    <a
                                        href={`/perfil/${user?.id}`}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-200 dark:bg-gray-600 text-slate-800 dark:text-slate-200 rounded-lg hover:bg-slate-300 dark:hover:bg-gray-500 transition font-medium"
                                    >
                                        <User size={18} />
                                        Meu Perfil
                                    </a>

                                    <button
                                        onClick={logout}
                                        className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition font-medium"
                                    >
                                        <LogOut size={18} />
                                        Sair
                                    </button>
                                </>
                            ) : (
                                <a
                                    href="/login"
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                                >
                                    <Home size={18} />
                                    Entrar
                                </a>
                                
                            )}
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
