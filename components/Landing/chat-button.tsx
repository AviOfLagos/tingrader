"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [showResponse, setShowResponse] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowResponse(true)
  }

  return (
    <>
      <motion.div
        initial={false}
        animate={{ scale: isOpen ? 0 : 1 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Button
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-4 z-50 w-full max-w-sm"
          >
            <div className="rounded-lg border bg-background shadow-lg">
              <div className="flex items-center justify-between border-b p-4">
                <h2 className="font-semibold">Chat with us</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsOpen(false)
                    setShowResponse(false)
                  }}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="h-[400px] overflow-y-auto p-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-2">
                      <MessageCircle className="h-4 w-4" />
                    </div>
                    <div className="rounded-lg bg-muted p-3">
                      <p className="text-sm">
                        Hi there! 👋 How can we help you today?
                      </p>
                    </div>
                  </div>
                  {showResponse && (
                    <div className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-2">
                        <MessageCircle className="h-4 w-4" />
                      </div>
                      <div className="rounded-lg bg-muted p-3 space-y-3">
                        <p className="text-sm">
                          This feature isn't functional yet. Please reach out to Avi via:
                        </p>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <Link 
                            href="mailto:avioflagos@gmail.com"
                            className="text-sm text-primary hover:underline"
                          >
                            avioflagos@gmail.com
                          </Link>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <Link 
                            href="https://wa.me/2348190458819"
                            target="_blank"
                            className="text-sm text-primary hover:underline"
                          >
                            +2348190458819 (WhatsApp)
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="border-t p-4">
                <form className="flex gap-2" onSubmit={handleSubmit}>
                  <Input placeholder="Type your message..." />
                  <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

