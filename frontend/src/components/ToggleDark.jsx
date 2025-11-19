import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ToggleDark({ isDark, setIsDark }) {
  return (
    <button
      aria-label="Alternar tema escuro"
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition"
      title={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
