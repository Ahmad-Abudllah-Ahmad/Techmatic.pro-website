"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";


export function HistorySection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Heavy Parallax for Banner Image
    const yParallaxVal = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const yParallax = useSpring(yParallaxVal, { stiffness: 40, damping: 20 });

    return (
        <section ref={containerRef} className="relative bg-background pb-24 md:pb-32 pt-24 md:pt-0 transition-colors duration-500">
            {/* Left Column Background */}
            <div className="hidden md:block absolute top-0 left-0 bottom-0 w-1/3 bg-white z-0 pointer-events-none" />
            {/* Full Width Image - Top edge-to-edge */}
            <motion.div
                className="hidden md:block relative w-full h-[40vh] md:h-[50vh] mb-16 md:mb-24 overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="absolute inset-0 z-10 overflow-hidden">
                    <motion.div
                        initial={{ height: "100%" }}
                        whileInView={{ height: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                        className="absolute inset-0 bg-background z-20"
                    ></motion.div>

                    {/* Parallax Wrapper */}
                    <motion.div style={{ y: yParallax }} className="relative w-full h-[120%] -top-[10%]">
                        <Image
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop"
                            alt="L'agence Techmatic Pro au travail"
                            fill
                            className="object-cover grayscale dark:grayscale-0"
                        />
                    </motion.div>
                </div>
            </motion.div>

            <div className="container mx-auto px-4 md:px-12 relative z-10">
                {/* Content Layout - Split */}
                <div className="flex flex-col md:flex-row gap-16 md:gap-24">

                    {/* Left: Title */}
                    <div className="w-full md:w-1/3">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <h2 className="text-4xl md:text-6xl font-bold font-heading uppercase leading-none text-black mb-6">
                                TECHMATIC <br /> PRO
                            </h2>
                            <div className="w-16 h-1.5 bg-black mb-6"></div>
                            <p className="text-sm font-handwritten text-black/50 transform -rotate-2 origin-left">
                                &quot;Built for Innovation&quot;
                            </p>
                        </motion.div>
                    </div>

                    {/* Right: Text Content */}
                    <div className="w-full md:w-2/3 space-y-6 text-foreground/60 font-sans leading-relaxed text-lg">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        >
                            <p>
                                <strong>Techmatic Pro: Founded in 2024.</strong> Established in 2024, Techmatic Pro emerged as a cutting-edge digital solutions provider, specializing in web development, mobile applications, AI integration, SEO, and eCommerce solutions.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                        >
                            <p className="text-lg md:text-xl text-foreground font-medium leading-relaxed">
                                With a mission to empower businesses through technology, the company quickly gained recognition for delivering high-performance, scalable, and user-centric digital products.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                        >
                            <p>
                                <strong className="text-highlight">100+ Active Clients.</strong> Driven by a team of skilled developers, designers, and strategists, Techmatic Pro has successfully transformed ideas into reality, serving <strong>100+ active clients worldwide</strong>. As a forward-thinking tech firm, it continues to push the boundaries of innovation, helping businesses thrive in the digital era.
                            </p>
                        </motion.div>
                    </div>
                </div>

            </div>
        </section>
    );
}
