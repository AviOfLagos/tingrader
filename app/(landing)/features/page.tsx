import { Check } from 'lucide-react'
import { GlowCard } from '@/components/ui/glow-card'

const features = [
  {
    title: "Tinder-Style Grading",
    description: "Grade assignments with simple swipes - right for pass, left for improvements needed.",
    benefits: [
      "Intuitive interface",
      "Faster grading process",
      "Reduced decision fatigue",
      "Consistent evaluation"
    ]
  },
  {
    title: "Star Rating System",
    description: "Use our 7-star rating system for more nuanced grading when needed.",
    benefits: [
      "Detailed feedback",
      "Flexible grading scale",
      "Performance tracking",
      "Grade analytics"
    ]
  },
  {
    title: "Batch Processing",
    description: "Grade multiple submissions efficiently with our batch processing feature.",
    benefits: [
      "Mass grading",
      "Bulk feedback",
      "Time savings",
      "Workload management"
    ]
  }
]

export default function FeaturesPage() {
  return (
    <div className="relative min-h-screen">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3b82f620,transparent)]" />
        <div className="absolute inset-0 bg-[length:20px_20px] bg-grid-primary/[0.02] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000,transparent)]" />
      </div>

      <div className="container py-20 space-y-20">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl font-bold sm:text-6xl bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            Powerful Features
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the tools that make Tingrader the most efficient grading platform
            for modern educators.
          </p>
        </section>

        {/* Features Grid */}
        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <GlowCard key={feature.title} className="space-y-4">
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
              <ul className="space-y-2">
                {feature.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </GlowCard>
          ))}
        </section>

        {/* Feature Comparison */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Compare Plans</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <GlowCard className="space-y-4">
              <h3 className="text-xl font-semibold">Basic</h3>
              <div className="text-3xl font-bold">Free</div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Basic grading features</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Up to 100 submissions/month</span>
                </li>
              </ul>
            </GlowCard>
            <GlowCard className="space-y-4 border-primary">
              <h3 className="text-xl font-semibold">Pro</h3>
              <div className="text-3xl font-bold">$29/mo</div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>All basic features</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Unlimited submissions</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Advanced analytics</span>
                </li>
              </ul>
            </GlowCard>
            <GlowCard className="space-y-4">
              <h3 className="text-xl font-semibold">Enterprise</h3>
              <div className="text-3xl font-bold">Custom</div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>All pro features</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Dedicated support</span>
                </li>
              </ul>
            </GlowCard>
          </div>
        </section>
      </div>
    </div>
  )
}

