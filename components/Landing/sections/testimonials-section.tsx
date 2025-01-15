"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ParallaxText } from "@/components/ui/parallax-text"

const testimonials = [
  {
    quote: "Tingrader has revolutionized how we grade assignments. It's faster, more efficient, and our students love the quick feedback.",
    author: "Dr. Sarah Johnson",
    role: "Professor of Computer Science",
    image: "/placeholder.svg"
  },
  {
    quote: "The interface is intuitive and the grading process is streamlined. It's exactly what we needed for our coding bootcamp.",
    author: "Michael Chen",
    role: "Lead Instructor",
    image: "/placeholder.svg"
  },
  {
    quote: "We've reduced our grading time by 50% while maintaining high-quality feedback. Amazing tool!",
    author: "Emily Rodriguez",
    role: "Education Director",
    image: "/placeholder.svg"
  }
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <ParallaxText className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">
            Loved by educators worldwide
          </h2>
          <p className="text-muted-foreground text-lg">
            See what our users have to say about their experience with Tingrader
          </p>
        </ParallaxText>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.author}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <blockquote className="text-muted-foreground">
                "{testimonial.quote}"
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

