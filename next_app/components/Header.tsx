/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { usePreloader } from "@/context/PreloaderContext";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/achievements" },
    { name: "Contact", href: "/contact" },
];

export function Header() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const { isPreloaderFinished } = usePreloader();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    });

    // Variant for the full-screen menu container
    const menuVariants = {
        initial: { x: "100%" },
        animate: {
            x: 0,
            transition: {
                duration: 1.0,
                ease: [0.32, 0.72, 0, 1] as any, // Smoother transition
            }
        },
        exit: {
            x: "100%",
            transition: {
                duration: 1.0,
                ease: [0.32, 0.72, 0, 1] as any,
            }
        }
    };

    // Variant for the list container to stagger children
    const listVariants = {
        initial: {
            transition: {
                staggerChildren: 0.15,
            }
        },
        animate: {
            transition: {
                delayChildren: 0.4,
                staggerChildren: 0.15,
            }
        },
        exit: {
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1,
            }
        }
    };

    // Variant for each link item container
    const itemVariants = {
        initial: {
            y: 40,
            opacity: 0,
            transition: { duration: 0.8, ease: [0.32, 0.72, 0, 1] as any }
        },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 1.0,
                ease: [0.32, 0.72, 0, 1] as any
            }
        },
        exit: {
            y: 40,
            opacity: 0,
            transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] as any }
        }
    };

    // Character animation
    const letterVariants = {
        initial: { y: "100%", x: -20, opacity: 0 },
        animate: {
            y: 0,
            x: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: [0.32, 0.72, 0, 1] as any }
        },
        exit: { y: "100%", opacity: 0 }
    };

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={isPreloaderFinished ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 [.theme-brand_&]:bg-white",
                    isScrolled ? "bg-background/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-3"
                )}
            >
                <div
                    className="container mx-auto px-4 md:px-12 flex justify-between items-center"
                    suppressHydrationWarning={true}
                >
                    <Link href="/" className="flex items-center gap-2 group z-50 relative md:ml-4">
                        <Image
                            src="/assets/techmatic_globe-removebg-preview.png"
                            alt="TECHMATIC PRO"
                            width={120}
                            height={120}
                            sizes="(max-width: 768px) 56px, 96px"
                            className="w-auto h-14 md:h-24 object-contain logo-img"
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex space-x-12 mt-2 items-center">
                        {navLinks.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium text-foreground [.theme-brand_&]:text-[#3459B0] hover:text-foreground/70 transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:bg-foreground [.theme-brand_&]:after:bg-[#3459B0] hover:after:w-full hover:after:left-0 after:transition-all after:duration-300",
                                    pathname === item.href ? "after:w-1/2 after:left-1/4" : "after:w-0"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <ThemeSwitcher />
                    </nav>

                    {/* Mobile Menu Button */}
                    <div
                        className="md:hidden flex items-center gap-3 z-50 relative"
                        suppressHydrationWarning={true}
                    >
                        <ThemeSwitcher />
                        <button
                            className="block focus:outline-none"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <span
                                className={cn(
                                    "block w-6 h-0.5 bg-foreground [.theme-brand_&]:bg-[#3459B0] mb-1.5 transition-all duration-300",
                                    isMobileMenuOpen && "rotate-45 translate-y-2"
                                )}
                            ></span>
                            <span
                                className={cn(
                                    "block w-6 h-0.5 bg-foreground [.theme-brand_&]:bg-[#3459B0] mb-1.5 transition-all duration-300",
                                    isMobileMenuOpen && "opacity-0"
                                )}
                            ></span>
                            <span
                                className={cn(
                                    "block w-6 h-0.5 bg-foreground [.theme-brand_&]:bg-[#3459B0] transition-all duration-300",
                                    isMobileMenuOpen && "-rotate-45 -translate-y-2"
                                )}
                            ></span>
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        variants={menuVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center md:hidden"
                    >
                        <motion.div
                            variants={listVariants}
                            className="flex flex-col items-center justify-center space-y-8"
                        >
                            {navLinks.map((item) => (
                                <motion.div key={item.name} variants={itemVariants} className="overflow-hidden">
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-4xl md:text-5xl font-light text-foreground hover:text-highlight transition-colors relative group font-heading uppercase tracking-wider block overflow-hidden"
                                    >
                                        <div className="flex">
                                            {item.name.split("").map((char, index) => (
                                                <motion.span
                                                    key={index}
                                                    variants={letterVariants}
                                                    transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] as any, delay: index * 0.05 }}
                                                    className="inline-block"
                                                >
                                                    {char === " " ? "\u00A0" : char}
                                                </motion.span>
                                            ))}
                                        </div>
                                        <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-highlight transition-all duration-300 group-hover:w-full"></span>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
