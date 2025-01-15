"use client";

import React from 'react';
import { AnimatedBackground } from '@/components/Landing/animated-background';
import { Navbar } from '@/components/Landing/navbar';
import { AnnouncementBanner } from '@/components/Landing/announcement-banner';
import { Footer } from '@/components/Landing/footer';
import { ChatButton } from '@/components/Landing/chat-button';
import { NewsletterSection } from './sections/newsletter-section';
import { CTASection } from './sections/cta-section';
import { Toaster } from '@/components/ui/toaster';

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
}

export function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  return (
    <div className="min-h-screen flex flex-col max-w-screen w-full items-center justify-center">
      <AnimatedBackground />

      <AnnouncementBanner />
      <main className="w-full max-w-[1440px] mx-auto flex flex-col items-center justify-center px-6 sm:px-10 lg:px-20 py-6 sm:py-16 lg:py-28 overflow-hidden">
        <Navbar />
        {children}
        <NewsletterSection />
        <CTASection />
      </main>
      <Footer />
      <ChatButton />
      <Toaster />
    </div>
  );
}
