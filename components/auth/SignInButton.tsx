import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const SignInButton = () => (
  <Link href="/sign-in">
    <Button variant="outline" className="text-white">
      Sign In
    </Button>
  </Link>
);

export default SignInButton;
