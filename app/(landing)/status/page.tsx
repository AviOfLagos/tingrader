"use client"

import { CheckCircle2, AlertCircle, Clock } from 'lucide-react'
import { motion } from "framer-motion"
import { SectionWrapper } from "@/components/ui/section-wrapper"

type ServiceStatus = 'operational' | 'degraded' | 'maintenance';

interface Service {
  name: string;
  status: ServiceStatus;
  latency: string;
}

const systems: {
  core: Service[],
  api: Service[],
  integrations: Service[]
} = {
  core: [
    {
      name: "Authentication Service",
      status: "operational",
      latency: "45ms"
    },
    {
      name: "Grading Engine",
      status: "operational",
      latency: "120ms"
    },
    {
      name: "File Upload Service",
      status: "operational",
      latency: "180ms"
    }
  ],
  api: [
    {
      name: "REST API",
      status: "operational",
      latency: "65ms"
    },
    {
      name: "WebSocket API",
      status: "degraded",
      latency: "250ms"
    }
  ],
  integrations: [
    {
      name: "Slack Integration",
      status: "operational",
      latency: "95ms"
    },
    {
      name: "Discord Bot",
      status: "maintenance",
      latency: "-"
    }
  ]
}

function StatusBadge({ status }: { status: 'operational' | 'degraded' | 'maintenance' }) {
  const config = {
    operational: {
      icon: CheckCircle2,
      text: "Operational",
      className: "text-green-500"
    },
    degraded: {
      icon: AlertCircle,
      text: "Degraded",
      className: "text-yellow-500"
    },
    maintenance: {
      icon: Clock,
      text: "Maintenance",
      className: "text-blue-500"
    }
  }[status]

  const Icon = config.icon

  return (
    <div className={`flex items-center gap-2 ${config.className}`}>
      <Icon className="h-4 w-4" />
      <span>{config.text}</span>
    </div>
  )
}

export default function StatusPage() {
  return (
    <div className="relative min-h-screen">
      <div className="container py-20 space-y-20">
        {/* Hero Section */}
        <SectionWrapper className="py-10">
          <div className="container max-w-4xl text-center space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold sm:text-6xl bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent"
            >
              System Status
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted-foreground"
            >
              Track the performance and availability of our services in real-time
            </motion.p>
          </div>
        </SectionWrapper>

        {/* Status Sections */}
        <div className="space-y-12">
          {/* Core Services */}
          <SectionWrapper className="p-6">
            <h2 className="text-2xl font-bold mb-6">Core Services</h2>
            <div className="space-y-4">
              {systems.core.map((service) => (
                <div
                  key={service.name}
                  className="flex items-center justify-between p-4 rounded-lg bg-card"
                >
                  <div className="space-y-1">
                    <h3 className="font-medium">{service.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Latency: {service.latency}
                    </p>
                  </div>
                  <StatusBadge status={service.status} />
                </div>
              ))}
            </div>
          </SectionWrapper>

          {/* API Services */}
          <SectionWrapper className="p-6">
            <h2 className="text-2xl font-bold mb-6">API Services</h2>
            <div className="space-y-4">
              {systems.api.map((service) => (
                <div
                  key={service.name}
                  className="flex items-center justify-between p-4 rounded-lg bg-card"
                >
                  <div className="space-y-1">
                    <h3 className="font-medium">{service.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Latency: {service.latency}
                    </p>
                  </div>
                  <StatusBadge status={service.status} />
                </div>
              ))}
            </div>
          </SectionWrapper>

          {/* Integrations */}
          <SectionWrapper className="p-6">
            <h2 className="text-2xl font-bold mb-6">Integrations</h2>
            <div className="space-y-4">
              {systems.integrations.map((service) => (
                <div
                  key={service.name}
                  className="flex items-center justify-between p-4 rounded-lg bg-card"
                >
                  <div className="space-y-1">
                    <h3 className="font-medium">{service.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Latency: {service.latency}
                    </p>
                  </div>
                  <StatusBadge status={service.status} />
                </div>
              ))}
            </div>
          </SectionWrapper>
        </div>
      </div>
    </div>
  )
}

