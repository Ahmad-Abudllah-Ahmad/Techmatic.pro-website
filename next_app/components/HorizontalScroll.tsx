"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HorizontalScroll() {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);

    useEffect(() => {
        const pin = gsap.fromTo(
            sectionRef.current,
            {
                translateX: 0,
            },
            {
                translateX: "-200vw", // Move container left by 2 viewport widths (assuming 3 items = 300vw total width)
                ease: "none",
                duration: 1,
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "2000 top", // Scroll distance
                    scrub: 0.6,
                    pin: true,
                },
            }
        );

        return () => {
            pin.kill(); // Cleanup
        };
    }, []);

    return (
        <section className="overflow-hidden bg-foreground text-background">
            {/* Trigger container for pinning */}
            <div ref={triggerRef}>
                {/* Horizontal scrolling container */}
                <div
                    ref={sectionRef}
                    className="flex h-screen w-[300vw] flex-row relative"
                >
                    {/* Item 1 */}
                    <div className="w-screen h-full flex items-center justify-center border-r border-background/10">
                        <h2 className="text-[12vw] font-bold font-heading uppercase tracking-tighter leading-none">
                            PROXIMITÉ
                        </h2>
                    </div>

                    {/* Item 2 */}
                    <div className="w-screen h-full flex items-center justify-center border-r border-background/10">
                        <h2 className="text-[12vw] font-bold font-heading uppercase tracking-tighter leading-none">
                            ADAPTABILITÉ
                        </h2>
                    </div>

                    {/* Item 3 */}
                    <div className="w-screen h-full flex items-center justify-center">
                        <h2 className="text-[12vw] font-bold font-heading uppercase tracking-tighter leading-none">
                            RESPONSABILITÉ
                        </h2>
                    </div>
                </div>
            </div>
        </section>
    );
}
