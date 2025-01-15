"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { AnimatedGradient } from "@/components/ui/animated-gradient"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center">
      <AnimatedGradient />
      <div className="container relative z-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
              Grade Assignments Like Never Before
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Transform your grading experience with our intuitive, Tinder-style interface. 
              Make grading fun, fast, and efficient.
            </p>
            <div className="mt-10 flex gap-4">
              <Link href="/sign-up">
                <Button size="lg" className="text-white">
                  Get Started Free
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-[400px] lg:h-[600px]"
          >
            <Image
              src="/placeholder.svg"
              alt="Tingrader Interface"
              fill
              className="object-contain"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
