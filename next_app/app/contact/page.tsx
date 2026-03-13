"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";
import Link from "next/link";
import { Facebook, Linkedin, MapPin, Mail } from "lucide-react";
import Image from "next/image";

import { usePreloader } from "@/context/PreloaderContext";

export default function ContactPage() {
    const heroTextRef = useRef<HTMLHeadingElement>(null);
    const { isPreloaderFinished } = usePreloader();

    useEffect(() => {
        if (!isPreloaderFinished) return;

        // Hero Text Animation
        if (heroTextRef.current) {
            const text = new SplitType(heroTextRef.current, { types: "words,chars" });

            gsap.set(heroTextRef.current, { autoAlpha: 1 }); // Reveal container

            gsap.from(text.chars, {
                y: 100,
                opacity: 0,
                duration: 1,
                ease: "power4.out",
                stagger: 0.02,
                delay: 0.2
            });
        }
    }, [isPreloaderFinished]);

    return (
        <main className="bg-background min-h-screen pt-32 transition-colors duration-500">
            {/* HERO SECTION */}
            <section className="px-6 md:px-20 pb-24 text-center">
                <div className="max-w-5xl mx-auto relative">
                    <h1 ref={heroTextRef} className="invisible font-heading font-bold text-5xl md:text-7xl lg:text-8xl uppercase leading-none mb-12">
                        DID WE <span className="text-highlight">PIQUE</span><br />YOUR <span className="text-highlight">INTEREST</span> ?
                    </h1>

                    <div className="relative flex justify-center items-start gap-4 -mt-4">
                        <div className="relative -top-6">
                            <svg className="w-16 h-16 md:w-20 md:h-20 text-foreground" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M80 80 Q 40 50 20 20" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M35 20 L 20 20 L 25 35" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <p className="font-handwritten text-sm md:text-base text-foreground/60 italic text-left pt-8">
                            &quot;Let&apos;s build together!&quot;<br />
                            <span className="font-sans not-italic text-xs uppercase tracking-wide text-foreground">Techmatic Pro</span>
                        </p>
                    </div>

                    {/* Cactus Logo Placeholder centered below text - REMOVED */}
                    <div className="mt-32 md:mt-40 flex justify-center">
                        {/* SVG Removed */}
                    </div>
                </div>
            </section>

            {/* SPLIT CONTENT SECTION */}
            <section className="flex flex-col md:flex-row border-t border-foreground text-foreground">
                {/* LEFT: INFO & MAP (Inverts: Black in Light, White in Dark) */}
                <div className="w-full md:w-1/2 bg-foreground text-background p-12 md:p-24 flex flex-col justify-between relative overflow-hidden min-h-[600px] transition-colors duration-500">
                    <div className="space-y-12 z-10 relative">
                        <div className="flex items-start gap-6">
                            <Mail className="w-8 h-8 mt-1" />
                            <div>
                                <h3 className="text-xl font-bold font-heading mb-1">EMAIL</h3>
                                <a href="mailto:info@techmatic.pro" className="text-lg hover:opacity-70 transition-opacity">info@techmatic.pro</a>
                            </div>
                        </div>

                        <div className="flex items-start gap-6">
                            <MapPin className="w-8 h-8 mt-1" />
                            <div>
                                <h3 className="text-xl font-bold font-heading mb-1">TECHMATIC PRO</h3>
                                <p className="text-lg leading-relaxed opacity-80">
                                    Frisco, Texas, USA
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Map Background/Image Placeholder */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 md:h-2/3 bg-background opacity-20 mix-blend-overlay">
                        {/* Placeholder for Map Image */}
                        <div className="w-full h-full bg-[url('/map-placeholder.png')] bg-cover bg-center grayscale opacity-60"></div>
                        {/* Stylized Map Lines/Overlays could go here */}
                        <svg className="absolute inset-0 w-full h-full text-current" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <line x1="0" y1="20" x2="100" y2="40" stroke="currentColor" strokeWidth="0.5" />
                            <line x1="20" y1="0" x2="40" y2="100" stroke="currentColor" strokeWidth="0.5" />
                            <circle cx="70" cy="70" r="5" fill="currentColor" />
                        </svg>
                    </div>
                </div>

                {/* RIGHT: FORM (Standard: White in Light, Black in Dark) */}
                <div className="w-full md:w-1/2 bg-background p-12 md:p-24 flex flex-col justify-center transition-colors duration-500">
                    <form className="space-y-12">
                        <div className="group relative">
                            <input type="text" placeholder="NAME / SURNAME*" className="w-full bg-transparent border-b border-foreground/20 py-4 text-sm font-bold uppercase tracking-widest outline-none placeholder-foreground/50 focus:border-foreground text-foreground transition-colors" required />
                        </div>

                        <div className="group relative">
                            <input type="email" placeholder="E-MAIL*" className="w-full bg-transparent border-b border-foreground/20 py-4 text-sm font-bold uppercase tracking-widest outline-none placeholder-foreground/50 focus:border-foreground text-foreground transition-colors" required />
                        </div>

                        <div className="group relative">
                            <textarea placeholder="MESSAGE" rows={4} className="w-full bg-transparent border-b border-foreground/20 py-4 text-sm font-bold uppercase tracking-widest outline-none placeholder-foreground/50 focus:border-foreground text-foreground transition-colors resize-none"></textarea>
                        </div>


                        <div className="flex items-start gap-3">
                            <input type="checkbox" id="consent" className="mt-1 w-4 h-4 border-foreground rounded-sm accent-foreground" />
                            <label htmlFor="consent" className="text-xs text-foreground/50 leading-relaxed">
                                I consent to the use of my personal data in order to respond to my request. <br />
                                TECHMATIC PRO is committed to not using your information for any purpose other than responding to your request.
                            </label>
                        </div>

                        <button type="submit" className="w-full bg-foreground text-background font-bold uppercase tracking-[0.2em] py-5 hover:opacity-90 transition-opacity duration-300">
                            SEND
                        </button>
                    </form>
                </div>
            </section >

            {/* RECRUITMENT BANNER */}
            < section className="py-24 md:py-32 text-center bg-background transition-colors duration-500" >
                <div className="container mx-auto px-6">
                    <p className="text-lg md:text-xl text-foreground/60 mb-2">Interested in joining the TECHMATIC PRO ecosystem?</p>
                    <h2 className="text-2xl md:text-4xl font-bold font-heading">
                        Contact us at <a href="mailto:info@techmatic.pro" className="underline decoration-2 underline-offset-4 hover:text-gray-600 transition-colors">info@techmatic.pro</a>
                    </h2>
                </div>
            </section >

            {/* PAGE FOOTER */}
            <footer className="bg-black [.theme-brand_&]:bg-[#3459B0] text-white py-16 px-6 md:px-20">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    {/* Socials */}
                    <div className="flex gap-6">
                        <Link href="https://www.facebook.com/p/Techmaticpro-61575170211254/" target="_blank" className="hover:text-gray-400 hover:rotate-12 transition-all"><Facebook className="w-6 h-6" /></Link>
                        <Link href="https://www.linkedin.com/company/techmatic-pro-inc/" target="_blank" className="hover:text-gray-400 hover:rotate-12 transition-all"><Linkedin className="w-6 h-6" /></Link>
                    </div>

                    {/* Logo */}
                    <div className="order-first md:order-none">
                        <Image
                            src="/assets/techmatic_globe-removebg-preview.png"
                            alt="TECHMATIC PRO"
                            width={80}
                            height={80}
                            className="w-16 h-16 md:w-20 md:h-20 object-contain"
                        />
                    </div>

                    {/* Links */}
                    <div className="hidden md:block w-24"></div> {/* Spacer to center logo roughly */}
                </div>

                <div className="container mx-auto mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 uppercase tracking-widest gap-4">
                    <p>© TECHMATIC PRO - Communication and development agency in Frisco - 2026</p>
                    <div className="flex gap-6">
                        {/* Legal links removed as requested */}
                    </div>
                </div>
            </footer >
        </main >
    );
}
