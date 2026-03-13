"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
    { word: "PROXIMITÉ", desc: "Une relation de confiance et d'échange permanent." },
    { word: "ADAPTABILITÉ", desc: "Des solutions sur mesure pour chaque projet." },
    { word: "CRÉATIVITÉ", desc: "L'audace de penser différemment." },
    { word: "RESPONSABILITÉ", desc: "Un engagement éthique et durable." },
];

export function ValuesHorizontalScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (!process.browser) return; // Client-side only

        const container = containerRef.current;
        const wrapper = wrapperRef.current;
        const sections = sectionsRef.current;

        if (!container || !wrapper || sections.length === 0) return;

        // Horizontal Scroll Logic
        const scrollTween = gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: container,
                pin: true,
                scrub: 1,
                // Adjust duration based on number of sections
                end: () => "+=" + container.offsetWidth * (sections.length - 1),
                invalidateOnRefresh: true,
            }
        });

        // Parallax Split Text Effect
        sections.forEach((section) => {
            const topLayer = section?.querySelector(".split-text-top");
            const bottomLayer = section?.querySelector(".split-text-bottom");
            const desc = section?.querySelector(".value-desc");

            if (topLayer && bottomLayer) {
                // Animate parallax shearing
                gsap.fromTo([topLayer, bottomLayer],
                    { x: 0 },
                    {
                        x: (i) => i === 0 ? 50 : -50, // Move layers in slightly opposite directions
                        ease: "none",
                        scrollTrigger: {
                            trigger: container,
                            start: "left left",
                            end: "right right",
                            scrub: true,
                            containerAnimation: scrollTween,
                        }
                    }
                );
            }

            if (desc) {
                gsap.fromTo(desc,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        scrollTrigger: {
                            trigger: section,
                            containerAnimation: scrollTween,
                            start: "left center",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    const addToRefs = (el: HTMLDivElement | null) => {
        if (el && !sectionsRef.current.includes(el)) {
            sectionsRef.current.push(el);
        }
    };

    return (
        <section ref={containerRef} className="relative h-screen overflow-hidden bg-foreground text-background">
            <div ref={wrapperRef} className="flex h-full w-[400%]">
                {VALUES.map((item, index) => (
                    <div
                        key={index}
                        ref={addToRefs}
                        className="w-screen h-full flex flex-col items-center justify-center relative overflow-hidden border-r border-background/10"
                    >
                        {/* Split Text Container */}
                        <div className="relative text-[12vw] md:text-[15vw] font-bold font-heading uppercase leading-none tracking-tighter select-none">

                            {/* Layer 1: Top Half */}
                            <div
                                className="split-text-top absolute top-0 left-0 w-full h-full text-background z-10"
                                style={{ clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)" }}
                            >
                                {item.word}
                            </div>

                            {/* Layer 2: Bottom Half */}
                            <div
                                className="split-text-bottom relative text-background/40 z-0"
                                style={{ clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)" }}
                            >
                                {item.word}
                            </div>
                        </div>

                        {/* Description */}
                        <p className="value-desc mt-8 text-xl md:text-2xl text-background/40 font-light max-w-lg text-center px-4">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
