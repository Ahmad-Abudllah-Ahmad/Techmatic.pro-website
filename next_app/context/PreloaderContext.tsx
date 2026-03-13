"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

type PreloaderContextType = {
    isPreloaderFinished: boolean;
    setPreloaderFinished: (value: boolean) => void;
};

const PreloaderContext = createContext<PreloaderContextType | undefined>(undefined);

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
    const [isPreloaderFinished, setPreloaderFinished] = useState(false);
    const pathname = usePathname();

    // Reset preloader state on route change
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPreloaderFinished(false);
    }, [pathname]);

    return (
        <PreloaderContext.Provider value={{ isPreloaderFinished, setPreloaderFinished }}>
            {children}
        </PreloaderContext.Provider>
    );
}

export function usePreloader() {
    const context = useContext(PreloaderContext);
    if (context === undefined) {
        throw new Error("usePreloader must be used within a PreloaderProvider");
    }
    return context;
}
