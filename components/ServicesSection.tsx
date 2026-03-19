"use client";

import { useRef } from "react";
import Link from "next/link";
import { LayoutTemplate, Code2, Bot, Smartphone, Workflow, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ServicesSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);

    const services = [
        { title: "ARTIFICIAL INTELLIGENCE", icon: <Bot strokeWidth={1.5} />, href: "/services?service=ai", color: "text-purple-500" },
        { title: "FULL STACK DEVELOPMENT", icon: <Code2 strokeWidth={1.5} />, href: "/services?service=fullstack", color: "text-blue-500" },
        { title: "APP DEVELOPMENT", icon: <Smartphone strokeWidth={1.5} />, href: "/services?service=app", color: "text-pink-500" },
        { title: "CRM & AUTOMATION", icon: <Workflow strokeWidth={1.5} />, href: "/services?service=crm", color: "text-green-500" },
        { title: "CMS DEVELOPMENT", icon: <LayoutTemplate strokeWidth={1.5} />, href: "/services?service=cms", color: "text-orange-500" },
    ];

    const fadeUp = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94] as const
            }
        }
    };

    const staggerContainer = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <section ref={containerRef} className="py-32 px-6 md:px-20 bg-white text-black transition-colors duration-500">
            <div className="container mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="flex flex-col md:flex-row justify-between items-start mb-24 gap-12"
                >
                    {/* Left: Title & Quote */}
                    <div className="relative">
                        <h2 className="text-5xl md:text-7xl font-heading font-bold uppercase tracking-wide leading-none text-black">
                            TECHMATIC <span className="font-light block mt-2 md:mt-0 md:inline">EXPERTISE</span>
                        </h2>

                        {/* Decorative Quote with Arrow */}
                        <div className="relative mt-8 ml-8">
                            <svg className="w-16 h-16 text-black transform absolute -left-12 -top-4" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M 10 10 Q 30 50 70 80" />
                                <path d="M 80 80 L 70 80 L 70 60" />
                            </svg>
                            <p className="font-handwritten text-xl italic text-black/60 pl-6 pt-4">
                                &quot;Built for Innovation&quot;
                            </p>
                        </div>
                    </div>

                    {/* Right: Description */}
                    <div className="max-w-xl text-lg text-black/80 font-sans leading-relaxed">
                        <p>
                            At <strong className="text-black">TECHMATIC PRO</strong>, established in 2024, we specialize in <strong className="text-black">web development</strong>, <strong className="text-black">mobile applications</strong>, <strong className="text-black">AI integration</strong>, and <strong className="text-black">eCommerce solutions</strong>.
                            With a mission to empower businesses through technology, we design high-performance, scalable, and user-centric digital products.
                            Transform every idea into a unique experience with our expertise.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24 justify-items-center"
                >
                    {services.map((service, index) => {
                        // Simple logic to assign different parallax speeds to columns
                        // 3 column grid: indexes 0,3 are col 1 -> y1
                        // indexes 1,4 are col 2 -> y2
                        // indexes 2,5 are col 3 -> y3
                        // For responsive (1 or 2 cols), this might look a bit chaotic but "playful".
                        // Let's stick to a subtle effect.
                        let parallaxStyle = {};
                        if (index % 3 === 0) parallaxStyle = { y: y1 };
                        if (index % 3 === 1) parallaxStyle = { y: y2 };
                        if (index % 3 === 2) parallaxStyle = { y: y3 };

                        return (
                            <motion.div
                                key={index}
                                variants={fadeUp}
                                style={parallaxStyle}
                                className="w-full max-w-[300px]"
                            >
                                <Link
                                    href={service.href}
                                    className="group flex flex-col items-center gap-8 w-full"
                                >
                                    {/* Icon Container with Brackets */}
                                    <div className="relative w-32 h-32 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                                        {/* Top Left Bracket */}
                                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-black rounded-tl-xl transition-all duration-300 group-hover:-translate-x-2 group-hover:-translate-y-2"></div>
                                        {/* Top Right Bracket */}
                                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-black rounded-tr-xl transition-all duration-300 group-hover:translate-x-2 group-hover:-translate-y-2"></div>
                                        {/* Bottom Left Bracket */}
                                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-black rounded-bl-xl transition-all duration-300 group-hover:-translate-x-2 group-hover:translate-y-2"></div>
                                        {/* Bottom Right Bracket */}
                                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-black rounded-br-xl transition-all duration-300 group-hover:translate-x-2 group-hover:translate-y-2"></div>

                                        {/* Icon */}
                                        <div className={`transform transition-transform duration-500 group-hover:scale-90 ${service.color}`}>
                                            <div className="w-12 h-12 [&>svg]:w-full [&>svg]:h-full">
                                                {service.icon}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-heading font-bold uppercase text-center tracking-wider px-4 group-hover:text-highlight transition-colors duration-300">
                                        {service.title}
                                    </h3>
                                </Link>
                            </motion.div>
                        );
                    })}

                    {/* View All / Contact Link */}
                    <motion.div
                        variants={fadeUp}
                        style={{ y: y3 }} // Last item, matches 3rd column logic roughly (5 items + 1 = 6th item -> index 5 -> y3)
                        className="w-full max-w-[300px]"
                    >
                        <Link href="/contact" className="group flex flex-col items-center gap-8 w-full">
                            <div className="relative w-32 h-32 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                                {/* Top Left Bracket */}
                                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-black/50 rounded-tl-xl transition-all duration-300 group-hover:-translate-x-2 group-hover:-translate-y-2 group-hover:border-highlight"></div>
                                {/* Top Right Bracket */}
                                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-black/50 rounded-tr-xl transition-all duration-300 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:border-highlight"></div>
                                {/* Bottom Left Bracket */}
                                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-black/50 rounded-bl-xl transition-all duration-300 group-hover:-translate-x-2 group-hover:translate-y-2 group-hover:border-highlight"></div>
                                {/* Bottom Right Bracket */}
                                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-black/50 rounded-br-xl transition-all duration-300 group-hover:translate-x-2 group-hover:translate-y-2 group-hover:border-highlight"></div>

                                <div className="text-black/50 transform transition-transform duration-500 group-hover:scale-90 group-hover:text-highlight">
                                    <ArrowRight className="w-12 h-12" strokeWidth={1.5} />
                                </div>
                            </div>
                            <h3 className="text-xl font-heading font-bold uppercase text-center tracking-wider px-4 text-black/50 group-hover:text-highlight transition-colors duration-300">
                                Start A Project
                            </h3>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
