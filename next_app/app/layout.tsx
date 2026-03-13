import type { Metadata } from "next";
import { Montserrat, Caveat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SmoothScroller } from "@/components/SmoothScroller";
import { Header } from "@/components/Header";

import { Preloader } from "@/components/Preloader";
import { PreloaderProvider } from "@/context/PreloaderContext";
import { PageReveal } from "@/components/PageReveal";
import { ThemeProvider } from "@/context/ThemeContext";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Techmatic Pro - Communication Agency",
  description: "Communication Agency - Proximity, Adaptability, Responsibility",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(
          montserrat.variable,
          caveat.variable,
          "antialiased min-h-screen flex flex-col font-sans bg-background text-foreground transition-colors duration-300 overflow-x-hidden"
        )}
      >
        <PreloaderProvider>
          <ThemeProvider>
            <SmoothScroller>
              <Preloader />
              <PageReveal>
                <Header />
                {children}
              </PageReveal>
            </SmoothScroller>
          </ThemeProvider>
        </PreloaderProvider>
      </body>
    </html>
  );
}
