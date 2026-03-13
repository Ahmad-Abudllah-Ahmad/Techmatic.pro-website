"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import Image from "next/image";
import { Link2 } from "lucide-react";

// Placeholder data based on the site's categories
const categories = [
    "TOUS",
    "DESIGN GRAPHIQUE",
    "DÉVELOPPEMENT WEB",
    "MOTION DESIGN",
    "BRANDING"
];

interface Project {
    id: number;
    title: string;
    category: string;
    image: string;
    size: string;
}

const projects: Project[] = [
    {
        id: 1,
        title: "Project Alpha",
        category: "DÉVELOPPEMENT WEB",
        image: "https://images.unsplash.com/photo-1481480746207-ca1a7a950147?q=80&w=2600&auto=format&fit=crop", // Abstract tech
        size: "large"
    },
    {
        id: 2,
        title: "Studio Beta",
        category: "BRANDING",
        image: "https://images.unsplash.com/photo-1558655146-d09347e0d7a8?q=80&w=2787&auto=format&fit=crop", // Minimalist branding
        size: "small"
    },
    {
        id: 3,
        title: "Gamma Motion",
        category: "MOTION DESIGN",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop", // Retro tech
        size: "small"
    },
    {
        id: 4,
        title: "Delta Design",
        category: "DESIGN GRAPHIQUE",
        image: "https://images.unsplash.com/photo-1626785774573-4b799314346d?q=80&w=2670&auto=format&fit=crop", // Pink gradient
        size: "medium"
    },
    {
        id: 5,
        title: "Epsilon Web",
        category: "DÉVELOPPEMENT WEB",
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2669&auto=format&fit=crop", // Web code
        size: "large"
    },
    {
        id: 6,
        title: "Zeta Brand",
        category: "BRANDING",
        image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2727&auto=format&fit=crop", // Packaging
        size: "medium"
    }
];

export function ProjectGallery() {
    const [activeCategory, setActiveCategory] = useState("TOUS");
    const containerRef = useRef(null);

    const filteredProjects = activeCategory === "TOUS"
        ? projects
        : projects.filter(p => p.category === activeCategory);

    // Parallax Logic matching WorkSection
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const yColumn1Val = useTransform(scrollYProgress, [0, 0.25, 1], [0, 0, -400]);
    const yColumn2Val = useTransform(scrollYProgress, [0, 0.25, 1], [0, 0, -150]);
    const yColumn3Val = useTransform(scrollYProgress, [0, 0.25, 1], [0, 0, -300]);

    const springConfig = { stiffness: 40, damping: 20 };
    const yColumn1 = useSpring(yColumn1Val, springConfig);
    const yColumn2 = useSpring(yColumn2Val, springConfig);
    const yColumn3 = useSpring(yColumn3Val, springConfig);

    // Distribute projects into 3 columns
    const col1 = filteredProjects.filter((_, i) => i % 3 === 0);
    const col2 = filteredProjects.filter((_, i) => i % 3 === 1);
    const col3 = filteredProjects.filter((_, i) => i % 3 === 2);

    return (
        <section ref={containerRef} id="projects" className="py-20 px-4 md:px-12 bg-white overflow-hidden">
            {/* Filters */}
            <div className="flex flex-wrap justify-center mb-16 space-x-4 md:space-x-8 overflow-x-auto pb-4 hide-scrollbar">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`text-xs md:text-sm tracking-widest uppercase transition-all duration-300 font-medium ${activeCategory === cat
                            ? "text-foreground border-b-2 border-foreground pb-1"
                            : "text-foreground/40 hover:text-foreground/60"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Masonry Grid with Parallax */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                <Column projects={col1} y={yColumn1} />
                <Column projects={col2} y={yColumn2} />
                <Column projects={col3} y={yColumn3} />
            </div>

            <div className="mt-20 text-center">
                <button className="border border-foreground px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-foreground hover:text-background transition-all duration-300">
                    Voir plus de projets
                </button>
            </div>
        </section>
    );
}

function Column({ projects, y }: { projects: Project[], y: MotionValue<number> }) {
    return (
        <motion.div style={{ y, willChange: 'transform' }} className="flex flex-col gap-8">
            <AnimatePresence mode="popLayout">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </AnimatePresence>
        </motion.div>
    );
}

function ProjectCard({ project }: { project: Project }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="group relative w-full overflow-hidden cursor-pointer rounded-lg bg-gray-100"
        >
            <Image
                src={project.image}
                alt={project.title}
                width={800}
                height={600}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Overlay matching WorkCard style */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-2">{project.category}</p>
                    <div className="flex justify-between items-center">
                        <h3 className="text-white text-2xl md:text-3xl font-heading font-bold uppercase">{project.title}</h3>
                        <div className="bg-white p-2 rounded-full text-black">
                            <Link2 size={20} />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
