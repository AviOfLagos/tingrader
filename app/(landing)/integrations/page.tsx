import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GlowCard } from '@/components/ui/glow-card'

const integrations = [
  {
    name: "Slack",
    description: "Get instant notifications and grade submissions directly from Slack.",
    image: "/placeholder.svg?height=60&width=60",
    status: "Available"
  },
  {
    name: "Discord",
    description: "Integrate with your educational Discord server for seamless grading.",
    image: "/placeholder.svg?height=60&width=60",
    status: "Available"
  },
  {
    name: "Zapier",
    description: "Connect Tingrader with thousands of apps through Zapier automation.",
    image: "/placeholder.svg?height=60&width=60",
    status: "Coming Soon"
  },
  {
    name: "GitHub",
    description: "Grade code submissions directly from GitHub repositories.",
    image: "/placeholder.svg?height=60&width=60",
    status: "Beta"
  },
  {
    name: "Microsoft Teams",
    description: "Integrate grading workflow with your Microsoft Teams channels.",
    image: "/placeholder.svg?height=60&width=60",
    status: "Coming Soon"
  },
  {
    name: "Google Classroom",
    description: "Sync assignments and grades with Google Classroom automatically.",
    image: "/placeholder.svg?height=60&width=60",
    status: "Coming Soon"
  }
]

export default function IntegrationsPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f610_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent" />
      </div>

      <div className="container py-20 space-y-20">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl font-bold sm:text-6xl bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            Integrations
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect Tingrader with your favorite tools and platforms to create
            a seamless grading workflow.
          </p>
        </section>

        {/* Integrations Grid */}
        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {integrations.map((integration) => (
            <GlowCard key={integration.name} className="relative group">
              <div className="flex flex-col items-start gap-4">
                <Image
                  src={integration.image}
                  alt={integration.name}
                  width={60}
                  height={60}
                  className="rounded-lg"
                />
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold">{integration.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      integration.status === 'Available' 
                        ? 'bg-primary/20 text-primary' 
                        : integration.status === 'Beta'
                        ? 'bg-yellow-500/20 text-yellow-500'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {integration.status}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{integration.description}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </GlowCard>
          ))}
        </section>

        {/* API Section */}
        <section className="text-center space-y-8">
          <h2 className="text-3xl font-bold">Build Custom Integrations</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Need a custom integration? Use our comprehensive API to build exactly
            what you need for your workflow.
          </p>
          <Button size="lg">
            View API Documentation
          </Button>
        </section>
      </div>
    </div>
  )
}

