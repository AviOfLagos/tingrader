"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ContactFormProps {
  type?: "support" | "sales"
}

export function ContactForm({ type = "support" }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // Here you would typically handle the form submission
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <h3 className="text-xl font-semibold">Thank you for reaching out!</h3>
          <p className="text-muted-foreground">
            We'll get back to you as soon as possible.
          </p>
          <Button onClick={() => setSubmitted(false)}>Send another message</Button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input id="name" required />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input type="email" id="email" required />
          </div>

          {type === "sales" && (
            <div className="space-y-2">
              <label htmlFor="organization" className="text-sm font-medium">
                Organization Size
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select organization size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">1-50 users</SelectItem>
                  <SelectItem value="medium">51-200 users</SelectItem>
                  <SelectItem value="large">201-1000 users</SelectItem>
                  <SelectItem value="enterprise">1000+ users</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium">
              Subject
            </label>
            <Input id="subject" required />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <Textarea
              id="message"
              required
              className="min-h-[150px]"
            />
          </div>

          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      )}
    </div>
  )
}

