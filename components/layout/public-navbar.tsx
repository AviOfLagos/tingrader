import React from 'react';
import { ThemeToggle } from '@/components/theme-toggle';

const PublicNavbar = () => {
  return (
    <nav className="flex items-center justify-between p-4">
      <div className="text-xl font-bold">Tingrader</div>
      <ThemeToggle />
    </nav>
  );
};

export default PublicNavbar;