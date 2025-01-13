import React from 'react';
import NavbarLogo from './NavbarLogo';
import NavbarSearch from './NavbarSearch';
import NavbarNotifications from './NavbarNotifications';
import NavbarUserProfile from './NavbarUserProfile';
import NavbarInvite from './NavbarInvite';
import { ThemeToggle } from '@/components/theme-toggle';

const DashboardNavbar = () => {
  return (
    <header className="Fixed top-0 inset-x-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <NavbarLogo />

        {/* Search Bar */}
        <NavbarSearch />

        {/* Actions */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <NavbarNotifications />

          {/* Invite People */}
          <NavbarInvite />

          {/* User Profile */}
          <NavbarUserProfile />
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;