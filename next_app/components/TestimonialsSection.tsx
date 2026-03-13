"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
    {
        quote: "We had the pleasure of working with techmatic.pro, whose expertise in web development is truly exceptional. ... They are a dedicated professional team who add significant value to any project.",
        client: "Saira N.",
        role: "Digital Marketing Manager",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
        quote: "Techmatic.pro's expertise in both front-end and back-end development ensures seamless, high-performance websites tailored to client needs. ... Their professionalism, problem-solving skills, and timely project delivery make them a highly recommended developer team",
        client: "Jose Reed",
        role: "Web Designer",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
        quote: "Thank you for the outstanding automated web application and portfolio. It has significantly streamlined our business operations and exceeded our expectations. ... We highly recommend your web development services.",
        client: "Rizwan I.",
        role: "Business Development Officer",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
        quote: "We were blown away by the stunning UI/UX and the robust development delivered by techmatic.pro. They perfectly balanced aesthetics with functionality, creating a digital product that's both beautiful and highly effective",
        client: "Kevin Thomas",
        role: "Digital Expert",
        image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150&h=150"
    },
];

export function TestimonialsSection() {
    return (
        <section className="bg-background py-24 border-t border-foreground/10 overflow-hidden transition-colors duration-500">
            <motion.div
                className="flex"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.div
                    className="flex gap-16 pr-16"
                    animate={{ x: "-50%" }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
                >
                    {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
                        <div key={i} className="min-w-[400px] flex flex-col gap-6 p-8 border border-foreground/10 hover:border-foreground transition-colors duration-300 group bg-background/50 backdrop-blur-sm rounded-lg">
                            <p className="text-lg md:text-xl font-medium leading-relaxed text-foreground/80 font-sans">&quot;{t.quote}&quot;</p>
                            <div className="mt-auto flex items-center gap-4">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-foreground/10 flex-shrink-0">
                                    <Image
                                        src={t.image}
                                        alt={t.client}
                                        fill
                                        sizes="48px"
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
                                <div>
                                    <p className="text-sm font-bold uppercase tracking-wider text-foreground">{t.client}</p>
                                    <p className="text-[10px] text-foreground/50 uppercase tracking-widest">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}
