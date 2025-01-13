import React from 'react';
import PublicNavbar from '@/components/layout/public-navbar';

export default function AuthPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicNavbar />
      <div className="max-w-7xl flex flex-col gap-12 items-center justify-center min-h-screen">
        {children}
      </div>
    </>
  );
}
