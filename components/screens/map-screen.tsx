'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Navigation, 
  ChevronUp, 
  ChevronDown,
  Clock,
  MapPin,
  Volume2,
  ArrowRight,
  Compass,
  Locate
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigation } from '@/components/mobile-app-shell'
import { mockTrip } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export function MapScreen() {
  const { navigate } = useNavigation()
  const [isBottomSheetExpanded, setIsBottomSheetExpanded] = useState(false)
  const [currentCheckpointIndex, setCurrentCheckpointIndex] = useState(0)
  const [heading, setHeading] = useState(45)
  const [isNavigating, setIsNavigating] = useState(false)

  const currentDay = mockTrip.itinerary[0]
  const currentCheckpoint = currentDay.checkpoints[currentCheckpointIndex]
  const nextCheckpoint = currentDay.checkpoints[currentCheckpointIndex + 1]

  // Simulate heading changes when navigating
  useEffect(() => {
    if (!isNavigating) return
    const interval = setInterval(() => {
      setHeading(prev => (prev + Math.random() * 10 - 5 + 360) % 360)
    }, 1000)
    return () => clearInterval(interval)
  }, [isNavigating])

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours === 0) return `${mins} min`
    return `${hours}h ${mins}min`
  }

  return (
    <div className="relative flex h-full flex-col bg-background">
      {/* Map Area */}
      <div className="relative flex-1">
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80"
          alt="Map"
          className="h-full w-full object-cover"
          crossOrigin="anonymous"
        />
        
        {/* Map Overlay */}
        <div className="absolute inset-0 bg-foreground/5" />

        {/* Markers */}
        <div className="absolute inset-0">
          {currentDay.checkpoints.map((checkpoint, i) => {
            const isActive = i === currentCheckpointIndex
            const isVisited = checkpoint.visited
            const xPos = 15 + i * 22
            const yPos = 25 + (i % 2) * 15

            return (
              <motion.button
                key={checkpoint.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => {
                  setCurrentCheckpointIndex(i)
                  setIsBottomSheetExpanded(true)
                }}
                className="absolute"
                style={{ left: `${xPos}%`, top: `${yPos}%` }}
              >
                <div className={cn(
                  "relative flex h-10 w-10 items-center justify-center rounded-full border-2 shadow-lg transition-all",
                  isActive 
                    ? "scale-125 border-white bg-primary" 
                    : isVisited 
                      ? "border-primary bg-primary" 
                      : "border-white bg-white"
                )}>
                  <span className={cn(
                    "text-sm font-bold",
                    isActive || isVisited ? "text-primary-foreground" : "text-foreground"
                  )}>
                    {i + 1}
                  </span>
                  {isActive && (
                    <motion.div
                      className="absolute -inset-2 rounded-full border-2 border-primary"
                      animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                  )}
                </div>
                {!isActive && (
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium text-foreground shadow">
                      {checkpoint.name.split(' ').slice(0, 2).join(' ')}
                    </span>
                  </div>
                )}
              </motion.button>
            )
          })}

          {/* Polyline simulation */}
          <svg className="absolute inset-0 h-full w-full" style={{ pointerEvents: 'none' }}>
            <defs>
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--accent))" />
              </linearGradient>
            </defs>
            <path
              d="M 90 120 Q 150 150 200 100 Q 270 60 330 130 Q 380 180 420 120"
              fill="none"
              stroke="url(#routeGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={isNavigating ? "none" : "8 8"}
            />
          </svg>

          {/* User location marker */}
          <motion.div
            className="absolute"
            style={{ left: '8%', top: '30%' }}
            animate={{ rotate: heading }}
          >
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-lg">
                <Compass className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="absolute -inset-1 animate-ping rounded-full bg-primary/30" />
            </div>
          </motion.div>
        </div>

        {/* Map Controls */}
        <div className="absolute right-4 top-4 flex flex-col gap-2">
          <button className="flex h-11 w-11 items-center justify-center rounded-xl bg-card shadow-lg">
            <Locate className="h-5 w-5 text-foreground" />
          </button>
        </div>

        {/* Navigation Status */}
        {isNavigating && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute left-4 right-4 top-4"
          >
            <div className="flex items-center gap-3 rounded-2xl bg-primary p-4 shadow-lg">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                <ArrowRight className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex-1 text-primary-foreground">
                <p className="text-sm opacity-80">Next turn in</p>
                <p className="text-lg font-bold">250m - Turn right</p>
              </div>
              <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                <Volume2 className="h-5 w-5 text-primary-foreground" />
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Sheet */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ height: isBottomSheetExpanded ? '55%' : 'auto' }}
        className="relative rounded-t-3xl border-t border-border bg-card shadow-lg"
      >
        {/* Handle */}
        <button
          onClick={() => setIsBottomSheetExpanded(!isBottomSheetExpanded)}
          className="absolute inset-x-0 top-0 flex h-8 items-center justify-center"
        >
          <div className="h-1 w-10 rounded-full bg-border" />
        </button>

        <div className="px-6 pb-8 pt-6">
          {/* Current Checkpoint */}
          <div className="flex items-start gap-4">
            <img
              src={currentCheckpoint.image || "/placeholder.svg"}
              alt={currentCheckpoint.name}
              className="h-16 w-16 rounded-xl object-cover"
              crossOrigin="anonymous"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded bg-primary text-xs font-bold text-primary-foreground">
                  {currentCheckpointIndex + 1}
                </span>
                <span className="text-xs capitalize text-muted-foreground">{currentCheckpoint.type}</span>
              </div>
              <h3 className="mt-1 font-semibold text-foreground">{currentCheckpoint.name}</h3>
              <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {formatDuration(currentCheckpoint.duration)}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  350m away
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex gap-3">
            <Button
              className="flex-1 rounded-xl py-5"
              onClick={() => setIsNavigating(!isNavigating)}
            >
              <Navigation className="mr-2 h-4 w-4" />
              {isNavigating ? 'Stop Navigation' : 'Start Navigation'}
            </Button>
            <Button
              variant="outline"
              className="rounded-xl px-4 py-5 bg-transparent"
              onClick={() => navigate('checkpoint', { checkpoint: currentCheckpoint })}
            >
              Details
            </Button>
          </div>

          {/* Expanded Content */}
          <AnimatePresence>
            {isBottomSheetExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6"
              >
                {/* Next Up */}
                {nextCheckpoint && (
                  <div className="rounded-2xl bg-secondary/50 p-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Next Stop
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <img
                        src={nextCheckpoint.image || "/placeholder.svg"}
                        alt={nextCheckpoint.name}
                        className="h-12 w-12 rounded-lg object-cover"
                        crossOrigin="anonymous"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{nextCheckpoint.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {formatDuration(nextCheckpoint.duration)} estimated
                        </p>
                      </div>
                      <button
                        onClick={() => setCurrentCheckpointIndex(currentCheckpointIndex + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary"
                      >
                        <ChevronUp className="h-4 w-4 text-foreground" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Quick Stats */}
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="rounded-xl bg-secondary/50 p-3 text-center">
                    <p className="text-2xl font-bold text-foreground">2.4</p>
                    <p className="text-xs text-muted-foreground">km left</p>
                  </div>
                  <div className="rounded-xl bg-secondary/50 p-3 text-center">
                    <p className="text-2xl font-bold text-foreground">45</p>
                    <p className="text-xs text-muted-foreground">min</p>
                  </div>
                  <div className="rounded-xl bg-secondary/50 p-3 text-center">
                    <p className="text-2xl font-bold text-foreground">2/3</p>
                    <p className="text-xs text-muted-foreground">stops</p>
                  </div>
                </div>

                {/* Expand/Collapse */}
                <button
                  onClick={() => setIsBottomSheetExpanded(false)}
                  className="mt-4 flex w-full items-center justify-center gap-1 text-sm text-muted-foreground"
                >
                  <ChevronDown className="h-4 w-4" />
                  Collapse
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
