import Image from 'next/image'
import { GlowCard } from '@/components/ui/glow-card'

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Former educator with 10+ years experience in EdTech"
  },
  {
    name: "Michael Chen",
    role: "CTO",
    image: "/placeholder.svg?height=400&width=400",
    bio: "AI specialist with a passion for education"
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Product",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Product leader focused on user experience"
  }
]

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      </div>

      <div className="container py-20 space-y-20">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl font-bold sm:text-6xl bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            Our Mission
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're on a mission to revolutionize the way educators grade assignments,
            making the process more efficient, engaging, and fair for everyone.
          </p>
        </section>

        {/* Team Section */}
        <section className="space-y-10">
          <h2 className="text-3xl font-bold text-center">Meet Our Team</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <GlowCard key={member.name} className="text-center space-y-4">
                <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-primary">{member.role}</p>
                </div>
                <p className="text-muted-foreground">{member.bio}</p>
              </GlowCard>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid gap-8 md:grid-cols-3">
          <GlowCard className="text-center space-y-2">
            <h3 className="text-4xl font-bold text-primary">50K+</h3>
            <p className="text-muted-foreground">Assignments Graded</p>
          </GlowCard>
          <GlowCard className="text-center space-y-2">
            <h3 className="text-4xl font-bold text-primary">1000+</h3>
            <p className="text-muted-foreground">Active Users</p>
          </GlowCard>
          <GlowCard className="text-center space-y-2">
            <h3 className="text-4xl font-bold text-primary">98%</h3>
            <p className="text-muted-foreground">Satisfaction Rate</p>
          </GlowCard>
        </section>
      </div>
    </div>
  )
}

