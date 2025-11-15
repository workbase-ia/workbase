import React from 'react';
import { Menu, X, LogOut, LogIn } from 'lucide-react';

export default function Header({ isAuthenticated, onLogout, onLogin }) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <header className="bg-white shadow-md border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo e Título */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                        WB
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">Workbase AI</h1>
                </div>

                {/* Menu Desktop */}
                <nav className="hidden md:flex items-center gap-8">
                    <a href="#" className="text-slate-600 hover:text-blue-600 transition font-medium">
                        Explorar
                    </a>
                    <a href="#" className="text-slate-600 hover:text-blue-600 transition font-medium">
                        Sobre
                    </a>
                    <a href="#" className="text-slate-600 hover:text-blue-600 transition font-medium">
                        Contato
                    </a>
                </nav>

                {/* Botões de Autenticação Desktop */}
                <div className="hidden md:flex items-center gap-4">
                {isAuthenticated ? (
                    <>
                    <span className="text-sm text-slate-600">Bem-vindo!</span>
                    <button
                        onClick={onLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium"
                    >
                        <LogOut size={18} />
                        Sair
                    </button>
                    </>
                ) : (
                    <button
                    onClick={onLogin}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                    <LogIn size={18} />
                    Entrar
                    </button>
                )}
                </div>
                {/* Menu Mobile */}
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
                    <a href="#" className="text-slate-600 hover:text-blue-600 transition font-medium">
                    Explorar
                    </a>
                    <a href="#" className="text-slate-600 hover:text-blue-600 transition font-medium">
                    Sobre
                    </a>
                    <a href="#" className="text-slate-600 hover:text-blue-600 transition font-medium">
                    Contato
                    </a>
                    <div className="border-t border-slate-200 pt-4">
                    {isAuthenticated ? (
                        <button
                        onClick={onLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium"
                        >
                        <LogOut size={18} />
                        Sair
                        </button>
                    ) : (
                        <button
                        onClick={onLogin}
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
}