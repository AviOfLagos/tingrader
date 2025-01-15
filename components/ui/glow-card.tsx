"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function GlowCard({ children, className, delay = 0 }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return

      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setMousePosition({ x, y })
    }

    const card = cardRef.current
    card?.addEventListener('mousemove', handleMouseMove)

    return () => {
      card?.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "group relative rounded-xl border-2 border-gray-800/50 bg-background/60 backdrop-blur-sm backdrop-saturate-150 p-6 overflow-hidden",
        "before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-gray-800/50 before:to-gray-800/50 before:opacity-0 before:transition-opacity group-hover:before:opacity-100",
        className
      )}
    >
      {/* Mouse-following gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,.075), transparent 40%)`,
        }}
      />
      
      {/* Border gradient */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,.1), transparent 40%)`,
        }}
      />

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}

