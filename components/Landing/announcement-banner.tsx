"use client"

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

const announcements = [
  "🎉 New Feature: Batch grading now available!",
  "📚 Join our weekly webinar every Thursday",
  "⭐ Try our new AI-powered grading assistant",
]

export function AnnouncementBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/40 bg-background/60 backdrop-blur-xl backdrop-saturate-150">
      <div className="container relative h-10 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center text-sm"
          >
            <span className="flex items-center gap-2">
              {announcements[currentIndex]}
              <ChevronRight className="h-4 w-4" />
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

