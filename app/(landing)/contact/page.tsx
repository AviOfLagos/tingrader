import Image from "next/image"
import { Mail, MessageCircle, Phone } from 'lucide-react'
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { ContactForm } from "@/components/Landing/contact-form"

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    description: "Drop us a line anytime",
    value: "avioflagos@gmail.com",
    href: "mailto:avioflagos@gmail.com"
  },
  {
    icon: Phone,
    title: "WhatsApp",
    description: "Mon-Fri from 8am to 5pm",
    value: "+2348190458819",
    href: "https://wa.me/2348190458819"
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Available during business hours",
    value: "Start a conversation",
    href: "#chat"
  }
]

export default function ContactPage() {
  return (
    <div className="relative min-h-screen">
      <div className="container py-20 space-y-20">
        {/* Hero Section */}
        <SectionWrapper className="py-20">
          <div className="container max-w-4xl text-center space-y-6">
            <h1 className="text-4xl font-bold sm:text-6xl bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground">
              Have questions? We'd love to hear from you. Send us a message
              and we'll respond as soon as possible.
            </p>
          </div>
        </SectionWrapper>

        {/* Contact Methods */}
        <div className="grid gap-8 md:grid-cols-3">
          {contactMethods.map((method) => {
            const Icon = method.icon
            return (
              <a
                key={method.title}
                href={method.href}
                className="group block"
              >
                <SectionWrapper className="h-full p-6 transition-colors hover:bg-card">
                  <div className="space-y-4">
                    <Icon className="h-6 w-6 text-primary" />
                    <h3 className="text-lg font-semibold">{method.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {method.description}
                    </p>
                    <p className="text-sm font-medium group-hover:text-primary">
                      {method.value}
                    </p>
                  </div>
                </SectionWrapper>
              </a>
            )
          })}
        </div>

        {/* Contact Form */}
        <SectionWrapper className="py-20">
          <div className="container max-w-5xl">
            <div className="grid gap-12 md:grid-cols-2">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Send us a message</h2>
                <p className="text-muted-foreground">
                  We're here to help and answer any question you might have.
                  We look forward to hearing from you!
                </p>
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt="Contact illustration"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </SectionWrapper>
      </div>
    </div>
  )
}

