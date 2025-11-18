import React from 'react';
import { Linkedin, Github, Mail, Heart } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 text-white mt-12">
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Grid de Conteúdo */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Sobre */}
                    <div>
                        <h5 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                WA                
                            </div>
                            Workplace AI
                        </h5>
                        <p className="text-slate-400">
                            Conectando talentos para o futuro do trabalho. Uma rede profissional moderna e inclusiva.
                        </p>
                    </div>

            {/* Links Rápidos */}
                    <div>
                        <h5 className="font-bold text-lg mb-4">Links Rápidos</h5>
                            <ul className="space-y-2 text-slate-400">
                                <li>
                                    <a href="#" className="hover:text-white transition">
                                        Explorar Profissionais
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition">
                                        Sobre Nós
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition">
                                        Contato
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition">
                                        Privacidade
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition">
                                        Termos de Uso
                                    </a>
                                </li>
                            </ul>
                    </div>

            {/* Redes Sociais */}
                    <div>
                        <h5 className="font-bold text-lg mb-4">Conecte-se Conosco</h5>
                            <div className="flex gap-4 mb-6">
                                <a
                                href="#"
                                className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition"
                                title="LinkedIn"
                                >
                                    <Linkedin size={20} />
                                </a>
                                <a
                                href="#"
                                className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition"
                                title="GitHub"
                                >
                                    <Github size={20} />
                                </a>
                                <a
                                href="#"
                                className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition"
                                title="Email"
                                >
                                    <Mail size={20} />
                                </a>
                            </div>
                            <p className="text-slate-400 text-sm">
                                Siga-nos para atualizações e novidades sobre a plataforma.
                            </p>
                        </div>
                    </div>

            {/* Divisor */}
                    <div className="border-t border-slate-700 pt-8">
                        {/* Copyright */}
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-slate-400 text-sm flex items-center gap-1">
                                &copy; {currentYear} Workplace AI. Todos os direitos reservados.
                            </p>
                            <p className="text-slate-400 text-sm flex items-center gap-1">
                                Feito com <Heart size={16} className="text-red-500" /> para o futuro do trabalho
                            </p>
                        </div>
                    </div>
                </div>
        </footer>
    );
}
