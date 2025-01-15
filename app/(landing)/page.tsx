import { Metadata } from "next";
import { HeroSection } from "@/components/Landing/sections/hero-section";
import { FeaturesSection } from "@/components/Landing/sections/features-section";
import { TestimonialsSection } from "@/components/Landing/sections/testimonials-section";
import { BlogSection } from "@/components/Landing/sections/blog-section";
import { NewsletterSection } from "@/components/Landing/sections/newsletter-section";
import { CTASection } from "@/components/Landing/sections/cta-section";

export const metadata: Metadata = {
  title: "Tingrader",
  description: `Tingrader is a modern grading and task management application with a user-friendly, minimalist design that facilitates seamless task submission, grading, and performance tracking. It is built with a mobile-first approach and designed for scalability.`,
};

export default function Home() {
  return (
    <main className="flex flex-col gap-6 items-center justify-center">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <BlogSection />
    </main>
  );
}
