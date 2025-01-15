"use client";

import React from 'react';
import { AnimatedBackground } from "@/components/Landing/animated-background";
import { Navbar } from "@/components/Landing/navbar";
import { AnnouncementBanner } from "@/components/Landing/announcement-banner";
import { Footer } from "@/components/Landing/footer";
import { ChatButton } from "@/components/Landing/chat-button";

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
}

export function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  return (
    <div className="relative  min-h-screen flex flex-col max-w-screen item-center justify-center">
      <AnimatedBackground />
      <Navbar />
      <AnnouncementBanner />
      <main className="flex-1 px-6 sm:px-10 lg:px-20 py-6 sm:py-16 lg:py-28">
        {children}
      </main>
      <Footer />
      <ChatButton />
    </div>
  );
}