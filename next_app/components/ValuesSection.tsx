"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
    {
        word: "PROXIMITY",
        text: "Every project ideally starts with an in-person, friendly and productive meeting. We follow your project closely, through regular exchanges, until full satisfaction of your expectations and objectives."
    },
    {
        word: "ADAPTABILITY",
        text: "We clearly formalize your needs and constraints to offer you custom solutions. Our agency adapts to your ecosystem, tools, and processes to ensure seamless collaboration."
    },
    {
        word: "CREATIVITY",
        text: "Our team commits to revealing your uniqueness. We explore bold and relevant avenues to create visual identities and communication materials that make an impact."
    },
    {
        word: "RESPONSIBILITY",
        text: "Short supply chains, limited printing, eco-web design... We integrate CSR issues at every stage of our services for more sustainable and responsible communication."
    },
];

export function ValuesSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const container = containerRef.current;
        const sections = sectionsRef.current;

        if (!container || sections.length === 0) return;

        // Set initial state - first slide visible, rest hidden
        sections.forEach((section, index) => {
            if (!section) return;
            const topMask = section.querySelector(".title-mask-top");
            const bottomMask = section.querySelector(".title-mask-bottom");
            const description = section.querySelector(".slide-description");

            // All slides start at same position
            gsap.set(section, { opacity: index === 0 ? 1 : 0 });
            gsap.set([topMask, bottomMask], { y: 0 });
            gsap.set(description, { opacity: 0, scale: 0.9 });
        });

        // Master Timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                pin: true,
                scrub: 1,
                end: "+=3000",
            }
        });

        // Use matchMedia for responsive animations
        const mm = gsap.matchMedia();

        mm.add({
            isMobile: "(max-width: 768px)",
            isDesktop: "(min-width: 769px)",
        }, (context) => {
            const { isMobile } = context.conditions as { isMobile: boolean };
            const moveDistance = isMobile ? "95px" : "35%"; // Increased mobile gap to 95px (total 190px)

            sections.forEach((section, index) => {
                if (!section) return;

                const topMask = section.querySelector(".title-mask-top");
                const bottomMask = section.querySelector(".title-mask-bottom");
                const description = section.querySelector(".slide-description");

                // Fade in this slide (skip for first slide as it's already visible)
                if (index > 0) {
                    tl.to(section, {
                        opacity: 1,
                        duration: 1,
                        ease: "power2.inOut"
                    });
                } else {
                    // Small pause at start
                    tl.to({}, { duration: 0.5 });
                }

                // Split Animation for current slide
                if (topMask && bottomMask && description) {
                    // Animate Masks Apart
                    tl.to([topMask, bottomMask], {
                        y: (i) => i === 0 ? `-${moveDistance}` : moveDistance,
                        duration: 1.5,
                        ease: "power3.out"
                    });

                    // Reveal Description
                    tl.to(description, {
                        opacity: 1,
                        scale: 1,
                        duration: 1,
                        ease: "power2.out"
                    }, "<0.2");

                    // Hold
                    tl.to({}, { duration: 2 });

                    // Close masks back
                    tl.to(description, {
                        opacity: 0,
                        scale: 0.9,
                        duration: 0.8,
                        ease: "power2.in"
                    });

                    tl.to([topMask, bottomMask], {
                        y: 0,
                        duration: 1,
                        ease: "power2.inOut"
                    }, "<0.2");

                    // Fade out this slide (including the last one now)
                    tl.to(section, {
                        opacity: 0,
                        duration: 1,
                        ease: "power2.inOut"
                    }, "<0.5");
                }
            });
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
        <section ref={containerRef} className="relative h-[100vh] bg-background text-foreground transition-colors duration-500">
            <div className="sticky top-0 h-screen overflow-hidden">
                {/* All slides in the same position, layered on top of each other */}
                <div className="relative w-full h-full">
                    {VALUES.map((item, index) => (
                        <div
                            key={index}
                            ref={addToRefs}
                            className="slide absolute inset-0 w-full h-full flex flex-col items-center justify-center px-4"
                        >
                            {/* Wrapper for Masks - controlled z-index */}
                            <div className="relative z-20 w-full text-center pointer-events-none">
                                <div className="relative text-[11vw] md:text-[11vw] font-black font-sans uppercase leading-none tracking-tighter select-none text-neutral-500 whitespace-nowrap [.theme-brand_&]:text-[#66C37B] transition-colors duration-500">

                                    {/* Top Mask */}
                                    <div
                                        className="title-mask title-mask-top relative"
                                        style={{ clipPath: "inset(0 0 50% 0)" }}
                                    >
                                        <span className="text-element slide-title">{item.word}</span>
                                    </div>

                                    {/* Bottom Mask */}
                                    <div
                                        className="title-mask title-mask-bottom absolute inset-0"
                                        style={{ clipPath: "inset(50% 0 0 0)" }}
                                    >
                                        <span className="text-element slide-title">{item.word}</span>
                                    </div>

                                </div>
                            </div>

                            {/* Description - Absolutely Centered */}
                            <div className="slide-description absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs md:text-lg font-medium text-center max-w-lg leading-relaxed z-10 text-foreground/80 opacity-0 pointer-events-auto">
                                <p>{item.text}</p>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}