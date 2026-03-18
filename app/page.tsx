import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";
import { ValuesSection } from "@/components/ValuesSection";

const ServicesSection = dynamic(() => import("@/components/ServicesSection").then(mod => mod.ServicesSection));
const WorkSection = dynamic(() => import("@/components/WorkSection").then(mod => mod.WorkSection));
const TeamSection = dynamic(() => import("@/components/TeamSection").then(mod => mod.TeamSection));
const TestimonialsSection = dynamic(() => import("@/components/TestimonialsSection").then(mod => mod.TestimonialsSection));
const ContactSection = dynamic(() => import("@/components/ContactSection").then(mod => mod.ContactSection));
const ClientsSection = dynamic(() => import("@/components/ClientsSection").then(mod => mod.ClientsSection));
export default function Home() {
  return (
    <main className="min-h-screen bg-background transition-colors duration-500">

      <Hero />
      <ValuesSection />
      <ServicesSection />
      <WorkSection />
      <TeamSection />

      <ClientsSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
}

