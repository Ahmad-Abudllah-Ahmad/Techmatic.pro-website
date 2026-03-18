"use client";

import { useTheme } from "next-themes";
import { useThemeContext } from "@/context/ThemeContext";
import { Moon, Palette } from "lucide-react";
import { useState, useEffect } from "react";

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    const { themeVariant, setThemeVariant } = useThemeContext();
    const [mounted, setMounted] = useState(false);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/20">
            {/* Dark/Light Toggle -> Forces Dark Standard (B&W) */}
            <button
                onClick={() => {
                    setTheme("dark");
                    setThemeVariant("standard");
                }}
                className={`p-1.5 rounded-full transition-colors text-foreground [.theme-brand_&]:text-black ${theme === "dark" && themeVariant === "standard" ? "bg-white/20" : "hover:bg-white/20"}`}
                title="Switch to Black & White Theme"
            >
                <Moon size={18} />
            </button>

            <div className="w-px h-4 bg-gray-400/50" />

            {/* Brand Theme Toggle -> Forces Dark Brand */}
            <button
                onClick={() => {
                    setTheme("dark");
                    setThemeVariant("brand");
                }}
                className={`p-1.5 rounded-full transition-all duration-300 flex items-center gap-1.5 ${themeVariant === "brand" && theme === "dark" ? "bg-blue-600 text-white" : "hover:bg-white/20 text-blue-600"
                    }`}
                title="Switch to Dark Brand Theme"
            >
                <Palette size={18} />
                {themeVariant === "brand" && theme === "dark" && <span className="text-[10px] font-bold uppercase tracking-wider hidden md:block">Brand</span>}
            </button>
        </div>
    );
}
