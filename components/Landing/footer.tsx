"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const footerLinks = {
  product: [
    { label: "Features", href: "/features" },
    { label: "Use Cases", href: "/use-cases" },
    { label: "Integrations", href: "/integrations" },
    { label: "Pricing", href: "/pricing" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Documentation", href: "/docs" },
    { label: "Help Center", href: "/help" },
    { label: "Community", href: "/community" },
    { label: "Status", href: "/status" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Security", href: "/security" },
    { label: "Cookies", href: "/cookies" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-background/20 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="relative overflow-hidden">
        <div className="container relative py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12 pb-20  border-b">
            <div>
              <h3 className="text-base font-medium mb-4">Product</h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-base font-medium mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-base font-medium mb-4">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-base font-medium mb-4">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className=" flex items-center justify-center m-12 ">
            <motion.h2
              initial={{ backgroundPosition: "200% center" }}
              animate={{ backgroundPosition: "-200% center" }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-[15vw] font-black text-gray-400 whitespace-nowrap bg-gradient-to-r from-primary via-purple-300 to-primary bg-clip-text text-transparent bg-[length:150%_auto]"
            >
              TinGrader
            </motion.h2>
          </div>
          <div className="pt-8 border-t">
            <div className="flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/" className="flex items-center space-x-2">
                  <motion.span
                    className="text-xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Tingrader
                  </motion.span>
                </Link>
                <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} Tingrader. All rights reserved.
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-sm text-muted-foreground">
                  Connect with us on social media
                </p>
                <Link
                  href="https://twitter.com/avioflagos"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link
                  href="https://github.com/avioflagos"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link
                  href="https://linkedin.com/in/avioflagos"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
