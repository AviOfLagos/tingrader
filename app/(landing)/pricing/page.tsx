"use client"

import { useState } from "react"
import { Check } from 'lucide-react'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GlowCard } from "@/components/ui/glow-card"

const plans = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for small teams just getting started",
    features: [
      "Up to 100 users in organization",
      "Basic grading features",
      "Standard analytics",
      "Email support",
      "Community access"
    ]
  },
  {
    name: "Pro",
    price: "29",
    description: "Ideal for growing educational institutions",
    features: [
      "Unlimited users",
      "Advanced grading features",
      "Custom analytics",
      "Priority support",
      "API access",
      "Custom integrations",
      "Team collaboration tools"
    ]
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large institutions with custom needs",
    features: [
      "Everything in Pro",
      "Custom deployment",
      "Dedicated support team",
      "SLA guarantees",
      "Custom feature development",
      "Advanced security features",
      "Compliance assistance"
    ]
  }
]

export default function PricingPage() {
  const [showNotification, setShowNotification] = useState(false)
  const [email, setEmail] = useState("")

  const handlePlanClick = () => {
    setShowNotification(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle email submission
    setEmail("")
    setShowNotification(false)
  }

  return (
    <div className="relative min-h-screen">
      <div className="container py-20 space-y-20">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl font-bold sm:text-6xl bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect plan for your institution. All plans include our core
            features with different levels of support and customization.
          </p>
        </section>

        {/* Pricing Grid */}
        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <GlowCard key={plan.name} className="relative">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>
                <div className="flex items-baseline gap-2">
                  {plan.price === "Custom" ? (
                    <span className="text-4xl font-bold">Custom</span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground">/month</span>
                    </>
                  )}
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full" 
                  variant={plan.name === "Pro" ? "default" : "outline"}
                  onClick={handlePlanClick}
                >
                  Get started
                </Button>
              </div>
            </GlowCard>
          ))}
        </section>

        {/* Notification Modal */}
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          >
            <div className="bg-card border rounded-lg p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Coming Soon!</h2>
              <p className="text-muted-foreground mb-6">
                Payments will be available when we release the product. Drop your email
                to get notified when we launch!
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="flex gap-4">
                  <Button type="submit" className="flex-1">
                    Notify me
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowNotification(false)}
                  >
                    Close
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

