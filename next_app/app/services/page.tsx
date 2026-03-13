"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { AccordionItem } from "@/components/AccordionItem";
import { ContactSection } from "@/components/ContactSection";
import { useSearchParams } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
    {
        id: "ai",
        title: "ARTIFICIAL INTELLIGENCE",
        description: "<ul><li>AI-Agent & Chatbot Developer</li><li>AI VoiceBot & Generative AI Specialist</li><li>Expert in AI-Driven Workflow Automation</li><li>AI Integration: OpenAI API, GPT-4, Microsoft Copilot Studio</li><li>Lovable | No Code Less Code</li></ul>",
        projectIds: [8, 15]
    },
    {
        id: "fullstack",
        title: "FULL STACK DEVELOPMENT",
        description: "<ul><li>NodeJS, ReactJS (Hooks, Redux Toolkit), NextJS</li><li>AWS Cloud Solutions (EC2/S3/Route53)</li><li>Firebase, MySQL, MongoDB</li><li>Twilio API, PHP & Laravel</li><li>HTML, CSS, JavaScript</li><li>API Integration (Facebook, Twitter, Google)</li></ul>",
        projectIds: [3, 6]
    },
    {
        id: "app",
        title: "APP DEVELOPMENT",
        description: "<ul><li>Native iOS (Swift, Objective-C, SwiftUI)</li><li>Native Android (Kotlin, Java, Jetpack Compose)</li><li>Backend: Firebase, AWS Amplify, NodeJS</li><li>UI/UX: Figma, Sketch, Adobe XD</li><li>API: RESTful, GraphQL</li><li>Database: Realm, SQLite, Core Data, Room</li><li>Payment: Stripe, PayPal, Apple Pay, Google Pay</li></ul>",
        projectIds: [9, 10]
    },
    {
        id: "uiux",
        title: "UI/UX DESIGN",
        description: "<ul><li>User Research & Wireframing</li><li>High-Fidelity Prototyping with Figma & Adobe XD</li><li>Design Systems & Component Libraries</li><li>Interaction Design & Micro-Animations</li><li>Usability Testing & Heuristic Evaluation</li><li>Responsive & Accessible Design (WCAG Standards)</li></ul>",
        projectIds: [2, 5]
    },
    {
        id: "crm",
        title: "CRM & AUTOMATION",
        description: "<ul><li>Go High Level, Hubspot, Salesforce, Zoho, Zapier, Apollo.ai</li><li>n8n: Open-source automation tool</li><li>Lovable: AI workflows auto-generation</li><li>Make.com: No-code business automation</li><li>Monday.com: Project/Task management</li></ul>",
        projectIds: [1, 13]
    },
    {
        id: "cms",
        title: "CMS DEVELOPMENT",
        description: "<ul><li>WordPress Development and Customization</li><li>Wix Design and Development</li><li>Webflow</li><li>Shopify</li><li>Bubble.io</li></ul>",
        projectIds: [4, 14]
    },
];

const TOOLS = [
    "Visual Studio Code",
    "Jira | Trello | GitHub | BitBucket",
    "AWS & MongoDB Management Tools",
    "Postman, Vercel, NextAuth.js",
    "Google Gemini & Microsoft Copilot"
];

const PROCESS = [
    {
        title: "Team Building",
        description: "Fostering Collaboration and Communication. Creating a Supportive Work Environment. Strengthening Team Cohesion."
    },
    {
        title: "1 - 1 Meeting & Weekly Syn",
        description: "Providing Individualized Support and Guidance. Setting Clear Goals and Expectations. Facilitating Personal and Professional Growth."
    },
    {
        title: "User Testing",
        description: "Ensuring High Customer Satisfaction. Commitment to Quality Work. Efficient and Timely Delivery."
    }
];

import { usePreloader } from "@/context/PreloaderContext";

function ServicesContent() {
    const heroTextRef = useRef<HTMLHeadingElement>(null);
    const toolsRef = useRef<HTMLDivElement>(null);
    const processRef = useRef<HTMLDivElement>(null);
    const [openService, setOpenService] = useState<string | null>(null);
    const { isPreloaderFinished } = usePreloader();
    const searchParams = useSearchParams();

    // Handle Query Param for Auto-Opening Service
    useEffect(() => {
        // Debounce check to allow PreloaderContext to reset 'isPreloaderFinished' to false on route change
        const checkTimer = setTimeout(() => {
            if (!isPreloaderFinished) return;

            const serviceId = searchParams.get("service");
            if (serviceId) {
                // Check if serviceId exists in SERVICES
                const service = SERVICES.find(s => s.id === serviceId);
                if (service) {
                    setOpenService(serviceId);
                    // Slight delay to allow render and then scroll
                    setTimeout(() => {
                        const element = document.getElementById(serviceId);
                        if (element) {
                            element.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                    }, 500);
                }
            }
        }, 100);

        return () => clearTimeout(checkTimer);
    }, [searchParams, isPreloaderFinished]);

    useEffect(() => {
        if (!isPreloaderFinished) return;

        // Hero Text Animation (Load)
        if (heroTextRef.current) {
            const text = new SplitType(heroTextRef.current, { types: "lines" });
            text.lines?.forEach(line => {
                const wrapper = document.createElement("div");
                wrapper.style.overflow = "hidden";
                line.parentNode?.insertBefore(wrapper, line);
                wrapper.appendChild(line);
            });

            // Ensure lines are visible but off-screen initially via GSAP set if needed, but handled by .invisible class removal + from animation
            gsap.set(heroTextRef.current, { autoAlpha: 1 }); // Make container visible

            gsap.from(text.lines, {
                yPercent: 100,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out",
                stagger: 0.1,
                delay: 0.2 // Reduced delay
            });
        }

        // Hero Arrow Animation
        const arrowPath = document.querySelector(".hero-arrow path");
        const arrowSVG = document.querySelector(".hero-arrow");
        if (arrowPath && arrowSVG) {
            const length = (arrowPath as SVGPathElement).getTotalLength();
            gsap.set(arrowSVG, { autoAlpha: 1 });
            gsap.set(arrowPath, { strokeDasharray: length, strokeDashoffset: length });
            gsap.to(arrowPath, {
                strokeDashoffset: 0,
                duration: 1.5,
                ease: "power2.out",
                delay: 0.5 // Reduced delay
            });
        }


        // Tools Pop-up Animation
        if (toolsRef.current) {
            const tools = toolsRef.current.children;
            gsap.fromTo(tools,
                { scale: 0.5, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.05,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: toolsRef.current,
                        start: "top 80%",
                    }
                }
            );
        }

        // Process Parallax & Pop-up
        if (processRef.current) {
            const steps = processRef.current.children;
            // Initial Pop-up
            gsap.fromTo(steps,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: processRef.current,
                        start: "top 75%",
                    }
                }
            );

            // Parallax Effect (Loop through to give different speeds if desired, or just simple scroll movement)
            Array.from(steps).forEach((step, i) => {
                const speed = (i + 1) * 20; // Varied speed
                gsap.to(step, {
                    y: -speed,
                    ease: "none",
                    scrollTrigger: {
                        trigger: processRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            });
        }

        // General Scroll Animations (Fade Up)
        const animateElements = [
            { selector: ".accordion-list", stagger: 0 },
            { selector: ".contact-footer", stagger: 0 }
        ];

        animateElements.forEach(({ selector, stagger }) => {
            const elements = document.querySelectorAll(selector);
            if (elements.length > 0) {
                gsap.to(elements, {
                    autoAlpha: 1, // Reveal
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: selector,
                        start: "top 85%",
                    }
                });
            }
        });

    }, [isPreloaderFinished]);

    const toggleService = (id: string) => {
        setOpenService(openService === id ? null : id);
    };

    return (
        <main className="bg-background min-h-screen transition-colors duration-500">
            {/* HERO SECTION */}
            <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 pt-32 pb-20">
                <div className="max-w-[90vw]">
                    <h1 ref={heroTextRef} className="invisible font-sans font-light text-[8vw] leading-[0.9] uppercase text-foreground">
                        <span className="font-bold font-heading text-highlight">TAILORED</span> <span className="[.theme-brand_&]:text-[#66C37B]">SOLUTIONS</span><br />
                        <span className="[.theme-brand_&]:text-[#66C37B]">& PROJECTS</span> <span className="font-bold font-heading text-highlight">THAT STAND OUT !</span>
                    </h1>

                    <div className="relative mt-8 md:mt-12 ml-auto w-fit mr-12 md:mr-32">
                        {/* Arrow curving from 'STAND' (top-left relative to here) down to 'inspiration' (bottom-right) */}
                        <svg className="invisible hero-arrow w-32 h-32 md:w-48 md:h-48 text-foreground absolute -top-24 -left-12 opacity-80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                            {/* Double curve (S-shape) starting high and ending at inspiration */}
                            <path d="M10 0 C 10 40, 60 40, 60 80" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M50 70 L 60 80 L 75 75" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="font-handwritten text-xl md:text-2xl text-foreground/60 italic transform -rotate-6 relative z-10 pt-10">
                            &quot;Become our source of inspiration&quot;
                        </p>
                    </div>
                </div>
            </section>

            {/* ACCORDION SECTION */}
            <section className="px-6 md:px-20 py-20">
                <div className="accordion-list space-y-4 opacity-0 translate-y-20"> {/* Initial hidden state for animation */}
                    {SERVICES.map((service) => (
                        <div id={service.id} key={service.id} className="scroll-mt-32 md:scroll-mt-40">
                            <AccordionItem
                                service={service}
                                isOpen={openService === service.id}
                                onClick={() => toggleService(service.id)}
                            />
                        </div>
                    ))}
                    {/* Closing border */}
                    <div className="border-t border-foreground/30"></div>
                </div>
            </section>

            {/* TOOLS SECTION */}
            <section className="px-6 md:px-20 py-20 bg-background/5">
                <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase mb-12 text-center">Our Tools</h2>
                <div ref={toolsRef} className="flex flex-wrap justify-center gap-4">
                    {TOOLS.map((tool, index) => (
                        <span key={index} className="px-6 py-3 border border-foreground/20 rounded-full text-foreground/80 font-sans uppercase tracking-widest text-sm hover:bg-foreground hover:text-background transition-colors duration-300 cursor-default opacity-0 transform scale-50"> {/* Initial state for animation handled by GSAP fromTo, but added classes for safety/Flash of Unstyled Content prevention if needed, though GSAP handles it. keeping it clean. */}
                            {tool}
                        </span>
                    ))}
                </div>
            </section>

            {/* PROCESS SECTION */}
            <section className="px-6 md:px-20 py-24">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase mb-6">Our Process</h2>
                    <p className="max-w-2xl text-foreground/70 font-sans text-lg">
                        We follow a structured yet flexible workflow to deliver high-quality digital solutions. Our process ensures efficiency, innovation, and client satisfaction at every stage.
                    </p>
                </div>

                <div ref={processRef} className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {PROCESS.map((step, index) => (
                        <div key={index} className="flex flex-col gap-4 group opacity-0 translate-y-20"> {/* Initial hidden state for animation */}
                            <div className="h-[1px] w-full bg-foreground/20 group-hover:bg-foreground/100 transition-colors duration-500 mb-4"></div>
                            <h3 className="text-2xl font-bold font-heading uppercase">{step.title}</h3>
                            <p className="text-foreground/70 font-sans leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CONTACT FOOTER */}
            <ContactSection />
        </main>
    );
}

export default function ServicesPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-foreground font-heading">Loading services...</div>}>
            <ServicesContent />
        </Suspense>
    );
}
