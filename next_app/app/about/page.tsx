"use client";

import { useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Added import
import { gsap } from "gsap";
import SplitType from "split-type";
import { motion } from "framer-motion";


import { TeamGrid } from "@/components/TeamGrid";
import { HistorySection } from "@/components/HistorySection";
import { ContactSection } from "@/components/ContactSection";
import { Suspense } from "react";

import { usePreloader } from "@/context/PreloaderContext";

function AboutContent() {
    const heroTextRef = useRef(null);
    const { isPreloaderFinished } = usePreloader();
    const searchParams = useSearchParams(); // Get query params

    // Auto-scroll effect
    useEffect(() => {
        if (!isPreloaderFinished) return;

        const sectionId = searchParams.get("section");
        if (sectionId) {
            // Slight delay to ensure layout is ready
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 100);
        }
    }, [isPreloaderFinished, searchParams]);

    useEffect(() => {
        if (!isPreloaderFinished) return;

        // Hero Text Animation
        if (heroTextRef.current) {
            const text = new SplitType(heroTextRef.current, { types: "lines" });

            text.lines?.forEach(line => {
                const wrapper = document.createElement("div");
                wrapper.style.overflow = "hidden";
                line.parentNode?.insertBefore(wrapper, line);
                wrapper.appendChild(line);
            });

            gsap.set(heroTextRef.current, { autoAlpha: 1 });

            gsap.from(text.lines, {
                yPercent: 100,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out",
                stagger: 0.1,
                delay: 0.2
            });
        }
    }, [isPreloaderFinished]);

    return (
        <main className="bg-background min-h-screen transition-colors duration-500">
            {/* HERO SECTION */}
            <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 pt-32 pb-20 relative overflow-hidden">
                <div className="max-w-[90vw] relative z-10 text-center mx-auto">
                    <p className="font-sans text-sm md:text-base uppercase tracking-widest text-foreground/60 mb-6">
                        About Techmatic Pro
                    </p>
                    <h1 ref={heroTextRef} className="invisible font-heading font-normal text-[6vw] leading-[1.1] uppercase text-foreground">
                        WE ARE A <span className="font-bold text-neutral-500 [.theme-brand_&]:text-[#66C37B]">CREATIVE AGENCY</span><br />
                        DEDICATED TO <span className="font-bold text-neutral-500 [.theme-brand_&]:text-[#66C37B]">DIGITAL EXCELLENCE.</span>
                    </h1>
                    <div className="mt-16 md:mt-20">
                        <div className="relative inline-block">
                            {/* Hand-drawn Arrow SVG */}
                            <div className="absolute -top-8 -left-8 md:-left-12 w-max transform -rotate-12">
                                <svg className="w-12 h-12 md:w-16 md:h-16 text-foreground" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M 20 20 Q 50 20 80 80" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M 60 75 L 80 80 L 85 60" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>

                            <p className="font-handwritten text-xl md:text-2xl italic text-foreground -rotate-2">
                                &quot;It must sting!&quot;
                            </p>
                            <p className="text-[10px] uppercase tracking-widest text-foreground/60 mt-1 font-sans text-center">Amora</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Built for Innovation Section */}
            <section id="innovation" className="py-24 md:py-32 bg-background relative z-20 border-t border-foreground/10 transition-colors duration-500">
                {/* Right Side Background */}
                <div className="absolute top-0 right-0 h-full w-full md:w-2/3 bg-white hidden md:block z-0 pointer-events-none" />
                <div className="container mx-auto px-4 md:px-12 flex flex-col md:flex-row gap-12 items-start relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/3 sticky top-32"
                    >
                        <h2 className="text-sm font-bold uppercase tracking-widest text-highlight mb-4">TECHMATIC PRO</h2>
                        <h3 className="text-3xl md:text-4xl font-heading font-bold uppercase leading-none text-foreground">&quot;Built for Innovation&quot;</h3>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="w-full md:w-2/3 space-y-8"
                    >
                        <div className="prose prose-lg text-black/80">
                            <p className="text-xl md:text-2xl font-light leading-relaxed">
                                <strong className="text-black">Techmatic Pro: Founded in 2024.</strong> Established in 2024, Techmatic Pro emerged as a cutting-edge digital solutions provider, specializing in web development, mobile applications, AI integration, SEO, and eCommerce solutions.
                            </p>
                            <p className="text-lg leading-relaxed mt-4">
                                With a mission to empower businesses through technology, the company quickly gained recognition for delivering high-performance, scalable, and user-centric digital products.
                            </p>
                        </div>

                        {/* Stats / Highlight */}
                        <div className="mt-12 p-8 bg-gray-100 rounded-2xl border border-gray-200">
                            <h4 className="text-5xl md:text-6xl font-bold text-black mb-2">100+</h4>
                            <p className="text-xl font-bold uppercase tracking-widest text-black mb-4">Active Clients</p>
                            <p className="text-black/70 leading-relaxed">
                                Driven by a team of skilled developers, designers, and strategists, Techmatic Pro has successfully transformed ideas into reality, serving 100+ active clients worldwide. As a forward-thinking tech firm, it continues to push the boundaries of innovation, helping businesses thrive in the digital era.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Values Horizontal Scroll - Wrapped for stacking */}
            <div className="relative z-10 bg-background transition-colors duration-500">


                <TeamGrid />

                <HistorySection />

                <ContactSection />
            </div>
        </main >
    );
}

export default function AboutPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <AboutContent />
        </Suspense>
    );
}
