"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AnimatedGradient } from "@/components/Landing/animated-gradient"

export function CTASection() {
  return (
    <section className="relative py-20">
      <AnimatedGradient />
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">
            Ready to transform your grading experience?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join thousands of educators who are already using Tingrader to make grading 
            faster, fairer, and more enjoyable.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg">Start Free Trial</Button>
            <Button variant="outline" size="lg">Contact Sales</Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

