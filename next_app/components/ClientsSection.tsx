"use client";

import { motion } from "framer-motion";


// Placeholder images since user only provided filenames. 
// Ideally these would be real assets in /public.
const clients = [
    { name: "Antartica", src: "/Antartica.png" },
    { name: "Crawl", src: "/Crawl.png" },
    { name: "Ovolo", src: "/Ovolo.png" },
    { name: "Wildroot", src: "/Wildroot.png" },
    { name: "Welling", src: "/Welling.png" },
    { name: "Globalmass", src: "/Globalmass.png" },
    { name: "Black-box", src: "/black-box.png" },
];

export function ClientsSection() {
    return (
        <section className="bg-background py-16 md:py-24 overflow-hidden border-t border-foreground/5 transition-colors duration-500">
            <div className="container mx-auto px-4 md:px-12 mb-12 text-center">
                <h2 className="text-2xl md:text-3xl font-heading font-bold uppercase tracking-widest text-foreground opacity-80">
                    OUR CLIENTS
                </h2>
            </div>

            <motion.div
                className="flex items-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                {/* Marquee Effect */}
                <div className="flex w-full overflow-hidden relative">
                    <motion.div
                        className="flex gap-16 md:gap-24 items-center whitespace-nowrap min-w-full"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
                    >
                        {[...clients, ...clients, ...clients].map((client, i) => (
                            <div key={i} className="flex-shrink-0 relative h-12 w-32 md:h-16 md:w-40 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                                {/* Using a text placeholder if image fails, but attempting Image component */}
                                <div className="w-full h-full flex items-center justify-center border border-foreground/10 rounded-lg p-2">
                                    {/* 
                                        Since we don't have the actual images yet, displaying text fallback 
                                        inside the box, effectively creating a 'logo box'.
                                     */}
                                    <span className="text-foreground font-bold uppercase text-sm">{client.name}</span>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
