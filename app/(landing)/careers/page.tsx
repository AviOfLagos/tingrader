"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Mail } from 'lucide-react'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { GlowCard } from "@/components/ui/glow-card"
import { SectionWrapper } from "@/components/ui/section-wrapper"

const roles = [
  {
    title: "AI Engineer Intern",
    department: "Engineering",
    description: "Help build and optimize our AI-powered grading algorithms.",
    requirements: [
      "Strong understanding of machine learning concepts",
      "Experience with Python and PyTorch/TensorFlow",
      "Passion for education technology",
    ],
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    title: "Frontend Developer Intern",
    department: "Engineering",
    description: "Create beautiful and intuitive user interfaces for our platform.",
    requirements: [
      "Experience with React and TypeScript",
      "Understanding of modern CSS and animations",
      "Eye for design and user experience",
    ],
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    title: "Product Designer Intern",
    department: "Design",
    description: "Design the future of educational technology interfaces.",
    requirements: [
      "Strong portfolio of UI/UX work",
      "Experience with Figma or similar tools",
      "Understanding of accessibility principles",
    ],
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    title: "Growth Marketing Intern",
    department: "Marketing",
    description: "Help us reach more educators and institutions.",
    requirements: [
      "Understanding of digital marketing channels",
      "Data analysis skills",
      "Creative content creation abilities",
    ],
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    title: "Education Specialist Intern",
    department: "Education",
    description: "Shape our product to meet real educational needs.",
    requirements: [
      "Background in education or teaching",
      "Understanding of assessment methods",
      "Strong communication skills",
    ],
    image: "/placeholder.svg?height=400&width=600"
  }
]

export default function CareersPage() {
  const [selectedRole, setSelectedRole] = useState<typeof roles[0] | null>(null)

  return (
    <div className="relative min-h-screen">
      <div className="container py-20 space-y-20">
        {/* Hero Section */}
        <SectionWrapper className="py-20">
          <div className="container max-w-4xl text-center space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold sm:text-6xl bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent"
            >
              Join Our Mission
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted-foreground"
            >
              We're looking for passionate AI builders who want to revolutionize
              education through technology. Join us as an intern and help shape
              the future of grading.
            </motion.p>
          </div>
        </SectionWrapper>

        {/* Roles Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {roles.map((role, index) => (
            <GlowCard 
              key={role.title}
              className="cursor-pointer"
              onClick={() => setSelectedRole(role)}
              delay={index * 0.1}
            >
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={role.image}
                  alt={role.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{role.title}</h3>
                  <span className="text-sm text-primary">{role.department}</span>
                </div>
                <p className="text-muted-foreground">{role.description}</p>
              </div>
            </GlowCard>
          ))}
        </div>

        {/* Application Modal */}
        <Modal
          isOpen={!!selectedRole}
          onClose={() => setSelectedRole(null)}
          title={selectedRole?.title || ""}
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">{selectedRole?.description}</p>
            <div className="space-y-2">
              <h4 className="font-semibold">Requirements:</h4>
              <ul className="list-disc list-inside text-muted-foreground">
                {selectedRole?.requirements.map((req) => (
                  <li key={req}>{req}</li>
                ))}
              </ul>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-4">
                To apply for this position, please send your resume and portfolio (if applicable) to:
              </p>
              <Link
                href="mailto:avioflagos@gmail.com"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <Mail className="h-4 w-4" />
                avioflagos@gmail.com
              </Link>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}

