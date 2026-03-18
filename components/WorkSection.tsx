"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { Link2 } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";
import { PROJECTS, Project } from "@/components/PortfolioGrid";

export function WorkSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Intensified Parallax for Columns
    const yColumn1Val = useTransform(scrollYProgress, [0, 0.25, 1], [0, 0, -400]);
    const yColumn2Val = useTransform(scrollYProgress, [0, 0.25, 1], [0, 0, -150]);
    const yColumn3Val = useTransform(scrollYProgress, [0, 0.25, 1], [0, 0, -300]);

    // Smooth Physics
    const springConfig = { stiffness: 40, damping: 20 };
    const yColumn1 = useSpring(yColumn1Val, springConfig);
    const yColumn2 = useSpring(yColumn2Val, springConfig);
    const yColumn3 = useSpring(yColumn3Val, springConfig);

    // Fade Up Animation for Headings
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

    // Use first 6 projects
    const displayedWorks = PROJECTS.slice(0, 6);

    return (
        <section ref={containerRef} className="bg-background py-32 px-6 md:px-12 overflow-hidden transition-colors duration-500">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24">
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="text-5xl md:text-8xl font-heading font-bold uppercase leading-[0.9] text-foreground"
                    >
                        SELECTED <br /> <span className="text-foreground/40 font-light">WORKS</span>
                    </motion.h2>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="mt-8 md:mt-0 max-w-sm"
                    >
                        <p className="text-foreground/60">
                            Discover a selection of our most recent projects, combining strategy, design, and performance.
                        </p>
                        <Link href="/achievements" className="inline-block mt-6 text-foreground font-bold uppercase tracking-widest border-b border-foreground pb-1 hover:text-foreground/60 transition-colors">
                            See all projects ({PROJECTS.length})
                        </Link>
                    </motion.div>
                </div>

                {/* Masonry Grid matching reference layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">

                    {/* Column 1: Tall Card + Another Item */}
                    <motion.div style={{ y: yColumn1, willChange: 'transform' }} className="flex flex-col gap-4">
                        {displayedWorks[0] && <WorkCard work={displayedWorks[0]} />}
                        {displayedWorks[3] && <WorkCard work={displayedWorks[3]} />}
                    </motion.div>

                    {/* Column 2: Card + Text Description + Card */}
                    <motion.div style={{ y: yColumn2, willChange: 'transform' }} className="flex flex-col gap-4">
                        {displayedWorks[1] && <WorkCard work={displayedWorks[1]} />}
                        {displayedWorks[4] && <WorkCard work={displayedWorks[4]} />}
                    </motion.div>

                    {/* Column 3: Wide Card + Tall Card (Phone screens style) */}
                    <motion.div style={{ y: yColumn3, willChange: 'transform' }} className="flex flex-col gap-4">
                        {displayedWorks[2] && <WorkCard work={displayedWorks[2]} />}
                        {displayedWorks[5] && <WorkCard work={displayedWorks[5]} />}
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

function WorkCard({ work }: { work: Project }) {
    return (
        <Link href={`/achievements?projectId=${work.id}`}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="group relative w-full overflow-hidden cursor-pointer rounded-lg bg-gray-100"
            >
                <Image
                    src={work.image}
                    alt={work.title}
                    width={1200}
                    height={800}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                    <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-2">{work.category}</p>
                        <div className="flex justify-between items-center">
                            <h3 className="text-white text-3xl font-heading font-bold uppercase">{work.title}</h3>
                            <div className="bg-white p-2 rounded-full text-black">
                                <Link2 size={20} />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    )
}
