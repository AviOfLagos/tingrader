import Image from "next/image";
import { GlowCard } from "@/components/ui/glow-card";
import { Metadata } from "next";
import StatsSection from "./StatsSection";
import TeamSection from "./TeamSection";
import TimelineSection from "./TimelineSection";
import JourneySection from "./JourneySection";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { motion, Variants } from "framer-motion";

export const metadata: Metadata = {
  title: "About Tingrader",
  description:
    "Learn about our mission, team, and journey in revolutionizing educational grading.",
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center">
      <div className="container py-20 space-y-20 gap-12 flex flex-col justify-center items-center">
        {/* Hero Section */}
        <SectionWrapper
          className="w-full bg-gradient-to-b bg-gradient-from-t from-primary/10 to-primary-dark
        text-white py-24 rounded-3xl border-2 border-white-800/40 shadow-xl"
        >
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">About Tingrader</h1>
            <p className="text-xl max-w-2xl mx-auto">
              We're on a mission to revolutionize educational assessment through
              innovative technology and human-centered design.
            </p>
          </div>
        </SectionWrapper>

        {/* Journey Section */}
        <JourneySection />

        {/* Stats Section */}
        <StatsSection />

        <SectionWrapper className="text-white text-center p-16 rounded-3xl border-4 border-white-800/40 shadow-xl w-[70%]">
          <h3 className="text-3xl font-bold mb-4 ">Looking Forward</h3>
          <p className="text-muted-foreground">
            As we continue to grow and evolve, our commitment to revolutionizing
            educational assessment remains unwavering. We're constantly
            developing new features and improvements based on educator feedback,
            ensuring our platform grows alongside the needs of our community.
          </p>
        </SectionWrapper>

        {/* Team Section */}
        <TeamSection />

        {/* Timeline Section */}
        <TimelineSection />
      </div>
    </div>
  );
}
