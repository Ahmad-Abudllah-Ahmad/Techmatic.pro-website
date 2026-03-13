"use client";

import { motion } from "framer-motion";
import { usePreloader } from "@/context/PreloaderContext";

export function PageReveal({ children }: { children: React.ReactNode }) {
    const { isPreloaderFinished } = usePreloader();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={isPreloaderFinished ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}
