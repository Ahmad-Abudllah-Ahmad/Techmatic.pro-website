"use client";

import Image from "next/image";
import { Linkedin } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const TEAM_MEMBERS = [
    {
        name: "ABDULRAHMAN",
        role: "CEO",
        image: "/images/team/Abdulrahman (CEO).png",
        linkedin: "https://www.linkedin.com/in/abdul-rehman-51453ba3/"
    },
    {
        name: "ADIL ADIL",
        role: "FOUNDER",
        image: "/images/team/Adil plastic vala ( founder ) .png",
        linkedin: "https://www.linkedin.com/in/adil-plasticwala-622998160/"
    },
    {
        name: "ANEES UR RAHMAN",
        role: "TEAM LEAD",
        image: "/images/team/anees ur rahman ( Team lead).jpg",
        linkedin: "https://www.linkedin.com/in/anees-ur-rehman-505ba6398/"
    }
];

export function TeamGrid() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const yLeft = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const yMiddle = useTransform(scrollYProgress, [0, 1], [200, -200]);
    const yRight = useTransform(scrollYProgress, [0, 1], [50, -50]);

    const springConfig = { stiffness: 40, damping: 20 };
    const yLeftSpring = useSpring(yLeft, springConfig);
    const yMiddleSpring = useSpring(yMiddle, springConfig);
    const yRightSpring = useSpring(yRight, springConfig);

    return (
        <section ref={containerRef} className="bg-foreground text-background py-24 md:py-32 overflow-hidden transition-colors duration-500">
            <div className="container mx-auto px-4 md:px-12">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

                    {/* Left: Text Content */}
                    <div className="w-full lg:w-2/5 pt-12">
                        <motion.h2
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="flex flex-col font-heading uppercase leading-none mb-12"
                        >
                            <span className="text-2xl font-light tracking-widest mb-2 block text-background/80">ABOUT US</span>
                            <span className="text-5xl md:text-7xl font-bold tracking-tight text-background">MEET OUR TEAM</span>
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="relative mb-12 ml-4"
                        >
                            {/* Curved Arrow */}
                            <svg className="absolute -top-4 -left-10 w-12 h-12 text-background transform rotate-12" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1">
                                <path d="M40 10 Q 10 20, 15 45" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M10 40 L 15 45 L 22 40" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                            <p className="font-handwritten text-lg italic text-background/70">
                                &quot;At the heart of every successful project is a dedicated team, and at Techmatic Pro, the team members are the true architects of innovation.&quot;
                            </p>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="text-background/60 text-sm leading-relaxed max-w-xs"
                        >
                            With diverse expertise and a shared passion for technology, they work collaboratively to deliver top-tier digital solutions.
                        </motion.p>
                    </div>

                    {/* Right: Staggered Grid with Heavy Parallax */}
                    <div className="w-full lg:w-3/5 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {TEAM_MEMBERS.map((member, index) => {
                            const ySpring = index === 0 ? yLeftSpring : index === 1 ? yMiddleSpring : yRightSpring;
                            const mtClass = index === 1 ? "md:mt-24" : index === 2 ? "md:mt-12" : "";

                            return (
                                <motion.div
                                    key={member.name}
                                    style={{ y: ySpring, willChange: 'transform' }}
                                    className={`group relative min-h-[400px] w-full overflow-hidden bg-background/5 ${mtClass}`}
                                >
                                    {/* White Corner Accent */}
                                    <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-background/80 z-20"></div>

                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        priority
                                    />
                                    {/* Gradient overlay removed for cleaner look */}

                                    <div className="absolute bottom-6 left-0 w-full text-center z-10 transition-transform duration-500 group-hover:-translate-y-2">
                                        <h3 className="text-xl font-bold font-heading uppercase tracking-wide text-zinc-900">{member.name}</h3>
                                        <p className="text-[10px] uppercase tracking-widest text-zinc-900/60 font-medium mb-3">{member.role}</p>
                                        <div className="flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-[#66C37B]/10 rounded-full hover:bg-[#66C37B]/20 transition-colors">
                                                <Linkedin className="w-5 h-5 text-[#66C37B]" />
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
