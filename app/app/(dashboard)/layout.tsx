import React from 'react';
import Navbar from '@/components/layout/navbar';
import BottomNav from '@/components/layout/bottom-nav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        {children}
      </div>
      <BottomNav />
    </>
  );
}
