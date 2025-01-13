import React from 'react';
import Navbar from './navbar';
import BottomNav from './bottom-nav';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <BottomNav />
    </div>
  );
};

export default DashboardLayout;
