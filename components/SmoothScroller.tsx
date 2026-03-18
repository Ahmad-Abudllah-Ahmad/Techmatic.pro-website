"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { ReactNode } from "react";

export function SmoothScroller({ children }: { children: ReactNode }) {
    return (
        <ReactLenis root options={{
            lerp: 0.08,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom exponential ease
            smoothWheel: true,
            syncTouch: false, // let mobile use native touch scrolling behavior
            touchMultiplier: 2
        }}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {children as any}
        </ReactLenis>
    );
}
