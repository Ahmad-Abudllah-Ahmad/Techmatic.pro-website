"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { usePreloader } from "@/context/PreloaderContext";

export function Preloader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<SVGTextElement>(null);
    const pathname = usePathname();
    const { isPreloaderFinished, setPreloaderFinished } = usePreloader();

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                setPreloaderFinished(true);
            }
        });
        const text = textRef.current;
        const container = containerRef.current;

        if (text && container) {
            // Reset state before animating
            setPreloaderFinished(false);
            gsap.set(container, { yPercent: 0, display: "flex" });
            gsap.set(text, {
                strokeDasharray: 2000,
                strokeDashoffset: 2000,
                fill: "transparent",
                stroke: "transparent"
            });

            // 1. Draw the outline (Stroke Animation)
            tl.to(text, {
                strokeDashoffset: 0,
                duration: 1.5,
                ease: "power2.inOut",
            });

            // 2. Fill the text
            tl.to(text, {
                fill: "var(--background)",
                duration: 0.8,
                ease: "power2.out",
            }, "-=0.4"); // Overlap slightly with stroke finishing

            // 3. Slide the preloader away
            tl.to(container, {
                yPercent: -100,
                duration: 0.8,
                ease: "power4.inOut",
                delay: 0.2
            });
        }

        // Cleanup function to kill timeline on unmount/re-render
        return () => {
            tl.kill();
        };

    }, [pathname, setPreloaderFinished]); // Trigger on route change

    return (
        <div 
            ref={containerRef} 
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-foreground text-background"
            style={{ transform: !isPreloaderFinished ? "translateY(0%)" : "translateY(-100%)" }}
        >
            <div className="w-full max-w-4xl px-4">
                <svg className="w-full h-auto" viewBox="0 0 800 100">
                    <text
                        ref={textRef}
                        x="50%"
                        y="50%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        className="text-4xl md:text-6xl font-bold font-heading"
                        fill="transparent"
                        stroke="transparent"
                        strokeWidth="1"
                        strokeDasharray="2000"
                        strokeDashoffset="2000"
                    >
                        TECHMATIC PRO
                    </text>
                </svg>
            </div>
        </div>
    );
}
