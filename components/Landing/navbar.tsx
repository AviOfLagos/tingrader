// "use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import SignInButton from '@/components/auth/SignInButton';
import { useToast } from '@/components/ui/use-toast';

const navItems = [
  { label: 'About', href: '/about' },
  { label: 'Features', href: '/features' },
  { label: 'Blog', href: '/blog' },
  { label: 'Use Cases', href: '/use-cases' },
  { label: 'Contact', href: '/contact' },
  { label: 'Integrations', href: '/integrations' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if scrolled past threshold
      setIsScrolled(currentScrollY > 0);

      // Determine scroll direction
      setIsScrollingUp(currentScrollY < lastScrollY || currentScrollY < 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // List of random sentences for the toast notification
  const trickMessages = [
    "Gotcha! Light mode isn't ready yet.",
    "Patience is a virtue—light mode is coming soon!",
    "We prefer the dark side... for now.",
    "Hold tight! Light mode is under development.",
    "Oops! Light mode seems to be offline.",
    "Surprise! Dark mode only at the moment.",
    "Did you expect light mode? It's a work in progress.",
  ];

  const handleThemeToggle = () => {
    // Select a random message
    const randomMessage =
      trickMessages[Math.floor(Math.random() * trickMessages.length)];

    // Show toast notification
    toast({
      description: randomMessage,
    });
  };

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{
        y: isScrollingUp ? 0 : -100,
        boxShadow: isScrolled
          ? '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
          : 'none',
      }}
      transition={{ duration: 0.3 }}
      className={cn(
        'fixed top-6 right-0 left-0 flex -translate-x-1/2 z-50 w-full  max-w-[88vw] justify-between items-center rounded-3xl  mx-auto px-3',
        'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        'border transition-[border-color,background-color]',
        isScrolled ? 'border-border' : 'border-transparent'
      )}
    >
      <div className="container w-full flex h-16 items-center justify-between gap-6  px-4">
        <Link href="/" className="flex items-center space-x-2">
          <motion.span
            className="text-xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Tingrader
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-6 gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname === item.href
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex md:items-end md:space-x-4 gap-2">
          {/* Theme Toggle Trick Button */}
          <Button
            variant="ghost"
            size="icon"
            className="w-9 px-0"
            onClick={handleThemeToggle}
          >
            <Sun className="h-4 w-4" />
          </Button>

          <SignInButton />
          <Link href="/sign-up">
            <Button className="font-medium text-white">Get Started</Button>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="w-6 px-0"
            onClick={handleThemeToggle}
          >
            <Sun className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t bg-background"
          >
            <div className="container py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'block py-2 text-sm font-medium transition-colors hover:text-primary',
                    pathname === item.href
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 space-y-3">
                <SignInButton />
                <Link href="/sign-up">
                  <Button className="w-full text-white">Get Started</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
