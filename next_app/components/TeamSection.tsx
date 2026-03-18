"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { MoveRight } from "lucide-react";

export function TeamSection() {
    const containerRef = useRef(null);

    return (
        <section ref={containerRef} className="relative bg-background [.theme-brand_&]:bg-white pb-24 md:pb-32 pt-24 md:pt-32 overflow-hidden transition-colors duration-500">
            {/* Left Column Background - Removed for brand theme consistency, using full white */}
            <div className="absolute top-0 left-0 bottom-0 w-full md:w-1/2 bg-white hidden md:block z-0 pointer-events-none opacity-100 [.theme-brand_&]:opacity-0" />


            <div className="container mx-auto px-4 md:px-12 flex flex-col md:flex-row gap-16 md:gap-24 items-start relative z-10">

                {/* Left: Heading & Intro */}
                <div className="w-full md:w-1/2">
                    {/* Handwritten Quote with Arrow */}
                    <div className="relative mb-6 pl-2 ml-12 md:ml-0">
                        <div className="font-handwritten text-2xl text-black/80 [.theme-brand_&]:text-[#3459B0] -rotate-2">
                            &quot;Small but mighty.&quot;
                            <span className="block text-sm text-black/40 [.theme-brand_&]:text-[#3459B0]/60 font-sans mt-1 not-italic">The Singing Magpie</span>
                        </div>

                        {/* Hand-drawn Arrow SVG */}
                        <svg className="absolute top-8 -left-8 w-12 h-12 text-black/60 [.theme-brand_&]:text-[#3459B0] transform rotate-12" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M40 5 C 30 15, 10 20, 15 40" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10 35 L 15 40 L 22 35" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading uppercase leading-tight mb-8 text-black">
                        <span className="font-light block [.theme-brand_&]:text-[#3459B0]">Scale down</span>
                        <span className="font-bold [.theme-brand_&]:text-[#66C37B]">Retina</span>
                    </h2>
                </div>

                {/* Right: Content & Stats */}
                <motion.div
                    className="w-full md:w-1/2 flex flex-col justify-center relative pt-8 md:pt-0"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                >
                    <div className="space-y-6 text-foreground/60 [.theme-brand_&]:text-[#3459B0]/80 text-lg leading-relaxed font-sans">
                        <p>
                            In the digital realm where code meets creativity, <strong>Techmatic Pro</strong> stands as a beacon of innovation and reliability. With over <strong>100 active partners</strong>, the symphony of their success is best echoed through the voices of those they’ve empowered.
                        </p>
                        <p>
                            In the heart of Techmatic Pro, a quintet of visionaries weaves the fabric of digital innovation. Each member, a unique thread, contributes to the vibrant tapestry of the company’s success.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="mt-12 flex gap-16 border-t border-foreground/10 pt-8">
                        <div className="flex flex-col">
                            <span className="text-4xl font-bold font-heading text-foreground [.theme-brand_&]:text-[#66C37B]">100+</span>
                            <span className="text-xs uppercase tracking-widest text-foreground/50 [.theme-brand_&]:text-[#3459B0]/60 mt-2">Active Clients</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-4xl font-bold font-heading text-foreground [.theme-brand_&]:text-[#66C37B]">10+</span>
                            <span className="text-xs uppercase tracking-widest text-foreground/50 [.theme-brand_&]:text-[#3459B0]/60 mt-2">Employees</span>
                        </div>
                    </div>

                    <div className="mt-10">
                        <a
                            href="/about?section=innovation"
                            className="group flex items-center gap-4 text-sm font-bold uppercase tracking-widest hover:text-foreground/60 transition-colors text-foreground [.theme-brand_&]:text-[#66C37B]"
                        >
                            Discover the TECHMATIC PRO agency
                            <MoveRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
