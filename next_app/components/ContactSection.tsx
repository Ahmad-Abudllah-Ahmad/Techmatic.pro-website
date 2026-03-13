"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";

export function ContactSection() {
    const onionRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (onionRef.current) {
            gsap.to(onionRef.current, {
                rotation: 360,
                repeat: -1,
                duration: 20,
                ease: "linear"
            });
        }
    }, []);

    return (
        <section className="relative bg-foreground text-background transition-colors duration-500">
            <div className="container mx-auto px-4 md:px-12 relative z-10 min-h-[100dvh] flex flex-col justify-center py-24">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

                    {/* Left: Heading */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-5xl md:text-7xl font-bold font-heading uppercase leading-none mb-8">
                            LET&apos;S <br /> CONNECT
                        </h2>
                        <p className="text-background/60 text-lg max-w-md mb-12">
                            Have a project? An idea? Let&apos;s discuss it over coffee (or tea, we are open-minded).
                        </p>

                        <div className="space-y-4">
                            <ContactItem label="Email" value="info@techmatic.pro" />
                            <ContactItem label="Address" value="Frisco, Texas, USA" />
                        </div>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div
                        className="bg-background/5 p-8 md:p-12 backdrop-blur-sm rounded-sm border border-background/10"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                        <form className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-background/60">Name</label>
                                <input type="text" className="w-full bg-transparent border-b border-background/20 py-2 text-background focus:outline-none focus:border-background transition-colors" placeholder="Your name" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-background/60">Email</label>
                                <input type="email" className="w-full bg-transparent border-b border-background/20 py-2 text-background focus:outline-none focus:border-background transition-colors" placeholder="your@email.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-background/60">Message</label>
                                <textarea className="w-full bg-transparent border-b border-background/20 py-2 text-background focus:outline-none focus:border-background transition-colors h-32 resize-none" placeholder="Tell us about your project..."></textarea>
                            </div>
                            <button className="w-full py-4 bg-background text-foreground font-bold uppercase tracking-widest hover:bg-background/90 transition-colors mt-8 flex items-center justify-center gap-2">
                                Send
                                <MoveRight className="w-4 h-4" />
                            </button>
                        </form>
                    </motion.div>

                </div>
            </div>

            {/* Rotating Onion/Bulb SVG */}
            <div className="absolute -bottom-24 -right-24 md:-bottom-32 md:-right-32 z-0 opacity-20 pointer-events-none">
                <svg ref={onionRef} width="400" height="400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-background w-[300px] h-[300px] md:w-[600px] md:h-[600px]">
                    {/* Concentric / Spiral shapes to allow rotation */}
                    <circle cx="50" cy="50" r="45" />
                    <circle cx="50" cy="50" r="35" />
                    <circle cx="50" cy="50" r="25" />
                    <circle cx="50" cy="50" r="15" />
                    <path d="M50 5 Q 95 50 50 95 Q 5 50 50 5" />
                    <path d="M50 15 Q 85 50 50 85 Q 15 50 50 15" />
                </svg>
            </div>
            {/* Bottom Black Strip - Appears after scroll */}
            <div className="w-full bg-black [.theme-brand_&]:bg-[#3459B0] py-4 flex justify-between items-center px-6 md:px-12 z-20 relative">
                <span className="text-white font-thin text-xs md:text-sm tracking-wide">TECHMATIC PRO &copy; {new Date().getFullYear()}</span>
                <span className="text-white font-thin text-xs md:text-sm uppercase tracking-wide cursor-pointer hover:underline">Privacy Terms</span>
            </div>
        </section>
    );
}

function ContactItem({ label, value }: { label: string, value: string }) {
    return (
        <div>
            <span className="block text-xs uppercase tracking-widest text-background/60 mb-1">{label}</span>
            <span className="text-xl font-medium">{value}</span>
        </div>
    )
}
