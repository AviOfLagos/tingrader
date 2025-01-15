"use client"

import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
}

export function SectionWrapper({ children, className }: SectionWrapperProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return

    const rect = sectionRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setMousePosition({ x, y })
  }

  return (
    <div
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative rounded-[32px] border-2 border-gray-800/50 bg-background/60 backdrop-blur-sm backdrop-saturate-150 overflow-hidden",
        "before:absolute before:inset-0 before:rounded-[32px] before:bg-gradient-to-r before:from-gray-800/50 before:to-gray-800/50 before:opacity-0 before:transition-opacity group-hover:before:opacity-100",
        className
      )}
    >
      {/* Mouse-following gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(168,85,247,.075), transparent 40%)`,
        }}
      />
      
      {/* Border gradient */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[32px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(168,85,247,.1), transparent 40%)`,
        }}
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

