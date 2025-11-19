import React from "react";
import { Sun, Moon } from "lucide-react";

export default function ToggleDark({ isDark, setIsDark }) {
    return (
        <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition"
        >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
}
