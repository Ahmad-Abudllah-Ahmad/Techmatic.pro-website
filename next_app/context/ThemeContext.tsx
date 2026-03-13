"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export type ThemeVariant = "standard" | "logo1" | "logo2" | "brand";

type ThemeContextType = {
    themeVariant: ThemeVariant;
    setThemeVariant: (variant: ThemeVariant) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [themeVariant, setThemeVariant] = useState<ThemeVariant>("brand");

    // Toggle theme variant classes on body/html
    useEffect(() => {
        // Remove all potential variant classes
        document.documentElement.classList.remove("theme-logo-1", "theme-logo-2", "theme-brand");

        // Add active class if not standard
        if (themeVariant === "logo1") {
            document.documentElement.classList.add("theme-logo-1");
        } else if (themeVariant === "logo2") {
            document.documentElement.classList.add("theme-logo-2");
        } else if (themeVariant === "brand") {
            document.documentElement.classList.add("theme-brand");
        }
    }, [themeVariant]);

    return (
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
            <ThemeContext.Provider value={{ themeVariant, setThemeVariant }}>
                {children}
            </ThemeContext.Provider>
        </NextThemesProvider>
    );
}

export function useThemeContext() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useThemeContext must be used within a ThemeProvider");
    }
    return context;
}
