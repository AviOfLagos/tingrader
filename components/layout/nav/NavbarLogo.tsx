import React from 'react';
import Link from 'next/link';

const NavbarLogo = () => {
  return (
    <Link
      href="/app"
      className="mr-4 flex items-center space-x-2"
    >
      <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
        Tingrader
      </span>
    </Link>
  );
};

export default NavbarLogo;