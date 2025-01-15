import { ThemeToggle } from '@/components/theme-toggle';
import React from 'react';

export default function AuthPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="max-w-7xl flex flex-col gap-12 items-center justify-center min-h-screen ">
        {children}
      </div>
      <div className="fixed bottom-10 right-10  backdrop-blur-sm">
        <ThemeToggle />
      </div>
      <div className="fixed  bg-background/80 backdrop-blur-sm" />
    </>
  );
}
