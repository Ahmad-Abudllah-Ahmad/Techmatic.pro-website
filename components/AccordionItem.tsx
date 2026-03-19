"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/components/PortfolioGrid";

interface ServiceProps {
    id: string;
    title: string;
    description: string;
    projectIds: number[];
}

export function AccordionItem({ service, isOpen, onClick }: { service: ServiceProps, isOpen: boolean, onClick: () => void }) {
    const buttonRef = useRef<HTMLAnchorElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!buttonRef.current) return;
        const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - (left + width / 2);
        const y = e.clientY - (top + height / 2);
        setPosition({ x: x * 0.2, y: y * 0.2 });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <div
            className={`border-t border-gray-300 transition-colors duration-500 ${isOpen ? "bg-white text-black" : "hover:bg-gray-50 hover:text-black bg-transparent"}`}
            onMouseLeave={handleMouseLeave}
        >
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between py-8 md:py-12 px-4 md:pl-12 text-left outline-none group"
            >
                <span className={`text-3xl md:text-5xl font-bold font-heading uppercase tracking-tight group-hover:pl-4 transition-all duration-300 ${!isOpen && "text-foreground group-hover:text-black"}`}>
                    {service.title}
                </span>
                <div className={`transition-transform duration-500 ${isOpen ? "rotate-45" : "rotate-0"} ${!isOpen && "text-foreground group-hover:text-black"}`}>
                    <Plus className="w-8 h-8 md:w-12 md:h-12 font-light" strokeWidth={1} />
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-12 px-4 md:pl-12">
                            {/* Left: Description & Button */}
                            <div className="space-y-8">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    className="text-lg md:text-xl text-black/60 leading-relaxed font-sans"
                                    dangerouslySetInnerHTML={{ __html: service.description }}
                                />

                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    className="pt-4"
                                >
                                    <motion.div
                                        animate={{ x: position.x, y: position.y }}
                                        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
                                        className="inline-block"
                                    >
                                        <Link
                                            href="/achievements"
                                            ref={buttonRef}
                                            onMouseMove={handleMouseMove}
                                            onMouseLeave={handleMouseLeave}
                                            className="inline-flex items-center gap-4 text-sm font-bold uppercase tracking-widest border border-black px-8 py-4 rounded-full hover:bg-black hover:text-white transition-colors duration-300 group/btn"
                                        >
                                            Discover THE portfolio
                                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            </div>

                            {/* Right: Images */}
                            <div className="grid grid-cols-2 gap-4">
                                {service.projectIds.map((id, idx) => {
                                    const project = PROJECTS.find(p => p.id === id);
                                    if (!project) return null;

                                    return (
                                        <Link key={id} href={`/achievements?projectId=${id}`}>
                                            <motion.div
                                                initial={{ y: 30, opacity: 0, scale: 0.95 }}
                                                animate={{ y: 0, opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.3 + (idx * 0.1), duration: 0.6, ease: "easeOut" }}
                                                className="relative aspect-[4/5] overflow-hidden group/img cursor-pointer"
                                            >
                                                <Image
                                                    src={project.image}
                                                    alt={project.title}
                                                    fill
                                                    className="object-contain transition-transform duration-700 group-hover/img:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                    <span className="text-white text-xs font-bold uppercase tracking-widest border border-white/50 px-3 py-1 rounded-full backdrop-blur-sm">View Project</span>
                                                </div>
                                            </motion.div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
