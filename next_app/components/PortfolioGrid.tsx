"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Link2, X } from "lucide-react";
import { useRef, useEffect, useState } from "react";

export interface Project {
    id: number;
    title: string;
    category: string;
    image: string;
    height: string; // Tailwind height class or arbitrary value
    description?: string;
    gallery?: string[];
}

// Updated Data with Real Images and varying heights for Masonry
export const PROJECTS: Project[] = [
    {
        id: 1,
        title: "CORPORATE PORTAL",
        category: "WEB DEVELOPMENT",
        image: "/assets/projects/project 1/Screenshot 2024-06-30 at 10.04.08 PM.png",
        height: "h-[600px]",
        description: "A comprehensive corporate portal designed to streamline internal communications and resource management.",
        gallery: [
            "/assets/projects/project 1/Screenshot 2024-06-30 at 10.04.08 PM.png",
            "/assets/projects/project 1/Screenshot 2024-07-01 at 8.26.22 PM.png",
            "/assets/projects/project 1/Screenshot 2024-07-01 at 8.27.03 PM.png"
        ]
    },
    {
        id: 2,
        title: "ADVOCACY PLATFORM",
        category: "ADVOCACY",
        image: "/assets/projects/project 2/Screenshot 2024-07-04 at 2.45.55 PM.png",
        height: "h-[500px]",
        description: "An empowering platform dedicated to social advocacy, featuring event management and community engagement tools.",
        gallery: [
            "/assets/projects/project 2/Screenshot 2024-07-04 at 2.45.55 PM.png",
            "/assets/projects/project 2/Screenshot 2024-07-04 at 2.48.01 PM.png",
            "/assets/projects/project 2/Screenshot 2024-07-04 at 2.50.56 PM.png"
        ]
    },
    {
        id: 3,
        title: "FULL STACK APP",
        category: "WEB DEVELOPMENT",
        image: "/assets/projects/project 3/Screenshot 2024-07-01 at 2.25.38 PM.png",
        height: "h-[500px]",
        description: "A robust full-stack application built for scalability and performance, handling complex data interactions.",
        gallery: [
            "/assets/projects/project 3/Screenshot 2024-07-01 at 2.25.38 PM.png",
            "/assets/projects/project 3/Screenshot 2024-07-01 at 2.26.08 PM.png",
            "/assets/projects/project 3/fs6.png"
        ]
    },
    {
        id: 4,
        title: "WORDPRESS COMMERCE",
        category: "WEB DEVELOPMENT",
        image: "/assets/projects/project 4/Screenshot 2024-07-04 at 2.55.01 PM.png",
        height: "h-[500px]",
        description: "A customized WordPress e-commerce solution offering a seamless shopping experience and easy inventory management.",
        gallery: [
            "/assets/projects/project 4/Screenshot 2024-07-04 at 2.55.01 PM.png",
            "/assets/projects/project 4/Screenshot 2024-07-04 at 2.55.53 PM.png",
            "/assets/projects/project 4/wp2.png"
        ]
    },
    {
        id: 5,
        title: "DIGITAL TRANSFORMATION",
        category: "WEB DEVELOPMENT",
        image: "/assets/projects/project 5/Screenshot 2024-07-01 at 2.23.32 PM.png",
        height: "h-[500px]",
        description: "A modern web platform driving digital transformation with a focus on user experience and accessibility.",
        gallery: [
            "/assets/projects/project 5/Screenshot 2024-07-01 at 2.23.32 PM.png",
            "/assets/projects/project 5/Screenshot 2024-07-01 at 2.25.10 PM.png",
            "/assets/projects/project 5/Screenshot 2024-07-01 at 8.39.04 PM.png"
        ]
    },
    {
        id: 6,
        title: "ENTERPRISE SYSTEM",
        category: "WEB DEVELOPMENT",
        image: "/assets/projects/project 6/fs2.png",
        height: "h-[500px]",
        description: "An enterprise-grade SaaS system designed for high availability and complex business logic processing.",
        gallery: [
            "/assets/projects/project 6/fs2.png",
            "/assets/projects/project 6/fs3.png",
            "/assets/projects/project 6/fs4.png",
            "/assets/projects/project 6/fs5.png"
        ]
    },
    {
        id: 7,
        title: "CREATIVE PORTFOLIO",
        category: "WEB DEVELOPMENT",
        image: "/assets/projects/project 7/Screenshot 2024-06-30 at 10.10.57 PM.png",
        height: "h-[500px]",
        description: "A visually stunning portfolio website showcasing creative works with immersive animations and layout.",
        gallery: [
            "/assets/projects/project 7/Screenshot 2024-06-30 at 10.10.57 PM.png",
            "/assets/projects/project 7/Screenshot 2024-06-30 at 9.55.14 PM.png"
        ]
    },
    {
        id: 8,
        title: "AI DASHBOARD",
        category: "WEB DEVELOPMENT",
        image: "/assets/projects/project 8/Ai dashboard .png",
        height: "h-[500px]",
        description: "Advanced AI analytics dashboard providing real-time data visualization and machine learning insights.",
        gallery: [
            "/assets/projects/project 8/Ai dashboard .png",
            "/assets/projects/project 8/ss.jpeg"
        ]
    },
    {
        id: 9,
        title: "MOBILE INTERFACE",
        category: "WEB DEVELOPMENT",
        image: "/assets/projects/project 9/Screenshot 2024-12-24 at 1.54.42 AM.png",
        height: "h-[500px]",
        description: "A sleek mobile application interface design emphasizing touch usability and modern aesthetics.",
        gallery: [
            "/assets/projects/project 9/Screenshot 2024-12-24 at 1.54.42 AM.png"
        ]
    },
    {
        id: 10,
        title: "SAAS DASHBOARD",
        category: "WEB DEVELOPMENT",
        image: "/assets/projects/project 10/Screenshot 2024-12-24 at 1.52.30 AM.png",
        height: "h-[500px]",
        description: "A clean and intuitive dashboard interface for a SaaS platform, focusing on data clarity and user retention.",
        gallery: [
            "/assets/projects/project 10/Screenshot 2024-12-24 at 1.52.30 AM.png"
        ]
    },
    {
        id: 11,
        title: "WORDPRESS SITE",
        category: "WEB DEVELOPMENT",
        image: "/assets/projects/project 11/wp.png",
        height: "h-[500px]",
        description: "A highly customized WordPress website delivering content flexibility and brand consistency.",
        gallery: [
            "/assets/projects/project 11/wp.png",
            "/assets/projects/project 11/wp1.png"
        ]
    },
    {
        id: 12,
        title: "FINANCIAL METRICS",
        category: "FINANCE",
        image: "/assets/projects/project 12/2.png",
        height: "h-[500px]",
        description: "A specialized fintech application for visualizing financial metrics and performance data.",
        gallery: [
            "/assets/projects/project 12/2.png",
            "/assets/projects/project 12/Fs1.png"
        ]
    },
    {
        id: 13,
        title: "REAL ESTATE HUB",
        category: "WEB DEVELOPMENT",
        image: "/assets/projects/project 13/1.png",
        height: "h-[500px]",
        description: "A property management and listing hub tailored for the modern real estate market.",
        gallery: [
            "/assets/projects/project 13/1.png"
        ]
    },
    {
        id: 14,
        title: "WIX STUDIO",
        category: "WEB DEVELOPMENT",
        image: "/assets/projects/project 14/wix.png",
        height: "h-[500px]",
        description: "A showcase of rapid web design capabilities using the Wix Studio platform for high-impact visual results.",
        gallery: [
            "/assets/projects/project 14/wix.png"
        ]
    },
    {
        id: 15,
        title: "CUSTOM GPT AGENT",
        category: "WEB DEVELOPMENT",
        image: "/assets/projects/project 15/2.jpg",
        height: "h-[500px]",
        description: "Integration of a custom GPT agent to provide intelligent conversational AI within a web environment.",
        gallery: [
            "/assets/projects/project 15/2.jpg",
            "/assets/projects/project 15/3.jpg",
            "/assets/projects/project 15/Screenshot 2024-12-24 at 3.16.46 AM.png",
            "/assets/projects/project 15/Screenshot 2024-12-24 at 3.23.35 AM.png",
            "/assets/projects/project 15/custom gpt.png",
            "/assets/projects/project 15/ge4f3gswvnchgbjd6gck.jpg"
        ]
    }
];

export function PortfolioGrid({ filter, initialProjectId }: { filter: string; initialProjectId?: number }) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // Auto-open project if ID is provided
    useEffect(() => {
        if (initialProjectId) {
            const project = PROJECTS.find(p => p.id === initialProjectId);
            if (project) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setSelectedProject(project);
            }
        }
    }, [initialProjectId]);

    // "Heavy" Parallax transforms for columns with increased range
    const yColumn1Val = useTransform(scrollYProgress, [0, 0.25, 1], [0, 0, -400]);   // Much faster upward
    const yColumn2Val = useTransform(scrollYProgress, [0, 0.25, 1], [0, 0, -100]); // Starts lower based on layout, but relative move is delayed
    const yColumn3Val = useTransform(scrollYProgress, [0, 0.25, 1], [0, 0, -600]); // Fastest upward

    // Add spring physics for "smooth" heavy feel
    const springConfig = { stiffness: 60, damping: 20, mass: 1 };
    const yColumn1 = useSpring(yColumn1Val, springConfig);
    const yColumn2 = useSpring(yColumn2Val, springConfig);
    const yColumn3 = useSpring(yColumn3Val, springConfig);

    const filteredProjects = filter === "ALL"
        ? PROJECTS
        : PROJECTS.filter(p => p.category === filter);

    // Distribute projects into 3 columns for Masonry
    const column1 = filteredProjects.filter((_, i) => i % 3 === 0);
    const column2 = filteredProjects.filter((_, i) => i % 3 === 1);
    const column3 = filteredProjects.filter((_, i) => i % 3 === 2);

    return (
        <>
            <div ref={containerRef} className="px-4 md:px-12 py-32 bg-background/5 overflow-hidden min-h-[150vh] transition-colors duration-500">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

                    {/* Column 1 */}
                    <motion.div style={{ y: yColumn1 }} className="flex flex-col gap-12">
                        {column1.map(project => (
                            <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
                        ))}
                    </motion.div>

                    {/* Column 2 */}
                    <motion.div style={{ y: yColumn2 }} className="flex flex-col gap-12 md:mt-0">
                        {column2.map(project => (
                            <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
                        ))}
                    </motion.div>

                    {/* Column 3 */}
                    <motion.div style={{ y: yColumn3 }} className="flex flex-col gap-12 md:mt-0">
                        {column3.map(project => (
                            <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
                        ))}
                    </motion.div>

                </div>
            </div>

            {/* Project Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
                )}
            </AnimatePresence>
        </>
    );
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
    return (
        <div
            onClick={onClick}
            className="group relative w-full overflow-hidden cursor-pointer rounded-lg bg-gray-100"
        >
            {/* Image */}
            <Image
                src={project.image}
                alt={project.title}
                width={1200}
                height={800}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Overlay matching WorkCard style */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-2">{project.category}</p>
                    <div className="flex justify-between items-center">
                        <h3 className="text-white text-3xl font-heading font-bold uppercase">{project.title}</h3>
                        <div className="bg-white p-2 rounded-full text-black">
                            <Link2 size={20} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col h-[100dvh]"
        >
            {/* Header / Close */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10 bg-black/50 backdrop-blur-sm">
                <div className="text-white/70 text-sm uppercase tracking-widest">{project.category}</div>
                <button
                    onClick={onClose}
                    className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* Scrollable Content */}
            <div 
                data-lenis-prevent 
                className="flex-1 overflow-y-auto overflow-x-hidden pt-24 pb-12 px-4 md:px-12 overscroll-contain"
            >
                <div className="container mx-auto max-w-6xl">
                    <div className="mb-12">
                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 uppercase"
                        >
                            {project.title}
                        </motion.h2>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-white/70 text-lg md:text-xl max-w-2xl leading-relaxed"
                        >
                            {project.description}
                        </motion.p>
                    </div>

                    {/* Gallery Grid (Masonry via columns) */}
                    <div className="columns-1 md:columns-2 gap-8 space-y-8">
                        {project.gallery?.map((img, index) => (
                            <motion.div
                                key={index}
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 + (index * 0.1) }}
                                className="relative rounded-lg overflow-hidden bg-white/5 w-full break-inside-avoid mb-8"
                            >
                                <Image
                                    src={img}
                                    alt={`${project.title} shot ${index + 1}`}
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    style={{ width: "100%", height: "auto" }}
                                    className="hover:scale-[1.02] transition-transform duration-700"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
