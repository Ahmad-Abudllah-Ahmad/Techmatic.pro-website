"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion, useScroll, useTransform } from "framer-motion";
import { Facebook, Linkedin } from "lucide-react";
import { usePreloader } from "@/context/PreloaderContext";

const TypewriterText = ({ words }: { words: string[] }) => {
    const [text, setText] = useState(words[0]); // Start with first word
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(150);

    // Calculate the longest word to set a fixed width for the container
    const longestWord = words.reduce((a, b) => a.length > b.length ? a : b, "");

    useEffect(() => {
        const currentWord = words[wordIndex];

        const handleTyping = () => {
            if (isDeleting) {
                setText(currentWord.substring(0, text.length - 1));
                setTypingSpeed(50);
            } else {
                setText(currentWord.substring(0, text.length + 1));
                setTypingSpeed(150);
            }

            if (!isDeleting && text === currentWord) {
                setTimeout(() => setIsDeleting(true), 1500); // Wait before deleting
            } else if (isDeleting && text === "") {
                setIsDeleting(false);
                setWordIndex((prev: number) => (prev + 1) % words.length);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, wordIndex, words, typingSpeed]);

    return (
        <span className="inline-block relative max-w-full">
            {/* Invisible longest word to reserve space */}
            <span className="invisible whitespace-nowrap">{longestWord}</span>
            {/* Typing text absolutely positioned to overlay the reserved space */}
            <span className="absolute left-0 top-0 text-left w-full h-full whitespace-nowrap">
                {text}
            </span>
        </span>
    );
};

export function Hero() {


    const { scrollY } = useScroll();
    const { isPreloaderFinished } = usePreloader();

    // Parallax effects
    const yText = useTransform(scrollY, [0, 500], [0, 100]);

    const heroRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (!isPreloaderFinished || !heroRef.current) return;

        const ctx = gsap.context(() => {
            gsap.set(heroRef.current, { autoAlpha: 1 });

            gsap.from(".hero-line", {
                yPercent: 100,
                duration: 1.2,
                ease: "power4.out",
                stagger: 0.1,
                delay: 0.2
            });
        }, heroRef);

        return () => ctx.revert();
    }, [isPreloaderFinished]);

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center bg-background [.theme-brand_&]:bg-white overflow-x-hidden pt-24 md:pt-32 pb-24 transition-colors duration-500">

            {/* Social Icons (Fixed Right) - hidden on mobile */}
            <div className="hidden md:flex absolute right-8 md:right-12 top-1/2 -translate-y-1/2 flex-col gap-6 z-20">
                <a href="#" className="text-foreground hover:text-foreground/60 hover:rotate-12 transition-all [.theme-brand_&]:text-[#3459B0]"><Facebook size={20} /></a>
                <a href="#" className="text-foreground hover:text-foreground/60 hover:rotate-12 transition-all [.theme-brand_&]:text-[#3459B0]"><Linkedin size={20} /></a>
            </div>



            <div className="container mx-auto px-4 z-10 relative flex flex-col items-center">
                <motion.div
                    style={{ y: yText, willChange: 'transform' }}
                    className="text-center relative"
                >
                    {/* Main Heading */}
                    <h1 ref={heroRef} className="invisible flex flex-col items-center text-foreground leading-[1.1] text-center w-full max-w-5xl px-2">
                        <span className="text-[6vw] sm:text-[5vw] md:text-[4vw] font-bold font-heading uppercase tracking-tighter mb-4 text-foreground [.theme-brand_&]:text-[#66C37B]">
                            We help you to
                        </span>
                        <span className="flex flex-wrap justify-center gap-x-3 text-[7vw] sm:text-[6vw] md:text-[5.5vw] font-light font-heading uppercase tracking-widest min-h-[1.1em] transition-all duration-300 opacity-50 text-foreground [.theme-brand_&]:text-[#3459B0] [.theme-brand_&]:opacity-100">
                            <TypewriterText words={["GROW", "SCALE", "EXPAND", "ELEVATE"]} /> YOUR <span className="text-white font-bold [.theme-brand_&]:text-[#66C37B]">BUSINESS</span>
                        </span>
                    </h1>

                </motion.div>

                {/* Arrow and Subtitle - Centered Layout */}
                <div className="relative mt-8 md:mt-16 flex flex-col items-center justify-center text-center">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isPreloaderFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="flex flex-col items-center gap-8 relative"
                    >
                        {/* Hand-drawn Arrow SVG - S-shape, Left side, Pointing Down */}
                        {/* Hand-drawn Arrow SVG - 2 curves, starting from 'BUSINESS' down to text start */}
                        {/* Hand-drawn Arrow SVG - S-shape, Left side, Pointing at 'Any' */}

                        {/* Mobile Arrow version (smaller, centered or hidden? User said "left side". I'll keep it absolute left for desktop, maybe hide on small mobile or adjust) */}


                        <p className="font-handwritten text-xl md:text-2xl text-foreground font-medium italic leading-relaxed max-w-2xl px-4 [.theme-brand_&]:text-[#3459B0]">
                            Any thing you want we are here for your help. We have complete sources for any kind of software and web development Project.
                        </p>


                    </motion.div>
                </div>


            </div >




        </section >
    );
}
