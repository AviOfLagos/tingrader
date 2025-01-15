"use client"

import { motion } from "framer-motion"
import { GlowCard } from "@/components/Landing/glow-card"
import { Zap, Star, BarChart, Users, Shield, Clock } from 'lucide-react'

const features = [
  {
    title: "Lightning Fast Grading",
    description: "Grade assignments with simple swipes or star ratings. No more complex rubrics.",
    icon: Zap,
  },
  {
    title: "Fair Evaluation",
    description: "Standardized grading system ensures fair evaluation for all submissions.",
    icon: Star,
  },
  {
    title: "Real-time Analytics",
    description: "Track progress and performance with detailed analytics and insights.",
    icon: BarChart,
  },
  {
    title: "Team Collaboration",
    description: "Work together with other graders seamlessly on the same platform.",
    icon: Users,
  },
  {
    title: "Secure & Private",
    description: "Your data is encrypted and protected with enterprise-grade security.",
    icon: Shield,
  },
  {
    title: "Time-Saving",
    description: "Reduce grading time by up to 60% with our efficient system.",
    icon: Clock,
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">
            Everything you need to grade efficiently
          </h2>
          <p className="text-muted-foreground text-lg">
            Our platform combines the best of modern technology with intuitive design 
            to make grading a breeze.
          </p>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <GlowCard key={index} delay={index * 0.1}>
              <feature.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  )
}

