"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";
import { FilterBar } from "@/components/FilterBar";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { ContactSection } from "@/components/ContactSection";
import { usePreloader } from "@/context/PreloaderContext";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

// ... existing imports

function AchievementsContent() {
    const heroTextRef = useRef<HTMLHeadingElement>(null);
    const [currentFilter, setCurrentFilter] = useState("ALL");
    const { isPreloaderFinished } = usePreloader();
    const searchParams = useSearchParams();
    const projectIdParam = searchParams.get("projectId");
    const initialProjectId = projectIdParam ? parseInt(projectIdParam) : undefined;

    useEffect(() => {
        if (!isPreloaderFinished) return;

        // Hero Text Animation
        if (heroTextRef.current) {
            const text = new SplitType(heroTextRef.current, { types: "lines" });

            // Wrap lines for overflow hidden
            text.lines?.forEach(line => {
                const wrapper = document.createElement("div");
                wrapper.style.overflow = "hidden";
                line.parentNode?.insertBefore(wrapper, line);
                wrapper.appendChild(line);
            });

            gsap.set(heroTextRef.current, { autoAlpha: 1 }); // Reveal container

            gsap.from(text.lines, {
                yPercent: 100,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out",
                stagger: 0.1,
                delay: 0.2
            });
        }
    }, [isPreloaderFinished]);

    return (
        <main className="bg-background min-h-screen transition-colors duration-500">
            {/* HERO SECTION */}
            <section className="min-h-[60vh] flex flex-col justify-center px-6 md:px-20 pt-32 pb-12">
                <div className="max-w-[90vw] relative">
                    <h1 ref={heroTextRef} className="invisible font-heading text-[7vw] leading-[0.9] uppercase text-foreground font-bold">
                        DISCOVER OUR <span className="font-light text-highlight">CREATIONS</span><br />
                        FRUITS OF <span className="font-light text-highlight">AUTHENTIC</span> COLLABORATIONS !
                    </h1>

                    <div className="relative mt-8 md:mt-12 ml-12 md:ml-32 w-fit">
                        <svg className="w-16 h-16 md:w-24 md:h-24 text-foreground transform -rotate-12 absolute -top-12 -left-8" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 10 Q 20 60 80 80" />
                            <path d="M55 80 L 80 80 L 80 55" />
                        </svg>
                        <p className="font-handwritten text-xl md:text-2xl text-foreground/60 italic transform -rotate-2 ml-16 pt-6">
                            &quot;Doesn&apos;t sting the eyes - Mixabebe&quot;
                        </p>
                    </div>
                </div>
            </section>

            {/* FILTER BAR Components */}
            <section className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-foreground/10 transition-colors duration-500">
                <FilterBar currentFilter={currentFilter} onFilterChange={setCurrentFilter} />
            </section>

            {/* PORTFOLIO GRID */}
            <section className="bg-background/5 min-h-screen transition-colors duration-500">
                <PortfolioGrid filter={currentFilter} initialProjectId={initialProjectId} />
            </section>

            {/* CALL TO ACTION BANNER */}
            <ContactSection />
        </main>
    );
}

export default function AchievementsPage() {
    return (
        <Suspense fallback={null}>
            <AchievementsContent />
        </Suspense>
    );
}
