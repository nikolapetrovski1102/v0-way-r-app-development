'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, MapPin, Route, Clock, CheckCircle2 } from 'lucide-react'
import { useNavigation } from '@/components/mobile-app-shell'
import { cn } from '@/lib/utils'

const steps = [
  { id: 1, label: 'Analyzing your preferences', icon: Sparkles },
  { id: 2, label: 'Finding best locations', icon: MapPin },
  { id: 3, label: 'Optimizing your route', icon: Route },
  { id: 4, label: 'Estimating time for each stop', icon: Clock }
]

export function GeneratingScreen() {
  const { navigate } = useNavigation()
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const stepDuration = 1200
    const totalSteps = steps.length
    
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < totalSteps - 1) return prev + 1
        return prev
      })
    }, stepDuration)

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          clearInterval(stepInterval)
          setTimeout(() => navigate('itinerary'), 500)
          return 100
        }
        return prev + 2
      })
    }, 100)

    return () => {
      clearInterval(stepInterval)
      clearInterval(progressInterval)
    }
  }, [navigate])

  return (
    <div className="flex h-full flex-col items-center justify-center bg-background px-6">
      {/* Animated Icon */}
      <div className="relative">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut"
          }}
          className="flex h-24 w-24 items-center justify-center rounded-3xl bg-primary"
        >
          <Sparkles className="h-12 w-12 text-primary-foreground" />
        </motion.div>
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-primary/40"
            initial={{ 
              x: 0, 
              y: 0,
              opacity: 0 
            }}
            animate={{
              x: Math.cos((i * Math.PI * 2) / 6) * 60,
              y: Math.sin((i * Math.PI * 2) / 6) * 60,
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 text-center"
      >
        <h1 className="text-2xl font-bold text-foreground">Creating your itinerary</h1>
        <p className="mt-2 text-muted-foreground">This will just take a moment...</p>
      </motion.div>

      {/* Progress Bar */}
      <div className="mt-8 w-full max-w-xs">
        <div className="h-2 overflow-hidden rounded-full bg-secondary">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <p className="mt-2 text-center text-sm text-muted-foreground">{progress}%</p>
      </div>

      {/* Steps */}
      <div className="mt-8 w-full max-w-xs space-y-3">
        <AnimatePresence mode="popLayout">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep
            const isActive = index === currentStep
            
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: index <= currentStep ? 1 : 0.4,
                  x: 0 
                }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "flex items-center gap-3 rounded-xl p-3 transition-colors",
                  isActive && "bg-primary/10"
                )}
              >
                <div className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                  isCompleted ? "bg-primary" : isActive ? "bg-primary/20" : "bg-secondary"
                )}>
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                  ) : (
                    <step.icon className={cn(
                      "h-4 w-4",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )} />
                  )}
                </div>
                <span className={cn(
                  "text-sm font-medium transition-colors",
                  isCompleted ? "text-primary" : isActive ? "text-foreground" : "text-muted-foreground"
                )}>
                  {step.label}
                </span>
                {isActive && (
                  <motion.div
                    className="ml-auto"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
