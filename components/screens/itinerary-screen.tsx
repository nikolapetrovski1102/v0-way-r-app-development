'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  Clock, 
  ChevronRight, 
  Navigation, 
  CheckCircle2,
  Circle,
  Landmark,
  UtensilsCrossed,
  Palette,
  Eye,
  ShoppingBag
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigation } from '@/components/mobile-app-shell'
import { mockTrip } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import type { Checkpoint } from '@/lib/mock-data'

const typeIcons = {
  landmark: Landmark,
  restaurant: UtensilsCrossed,
  museum: Palette,
  viewpoint: Eye,
  shopping: ShoppingBag
}

export function ItineraryScreen() {
  const { navigate } = useNavigation()
  const [selectedDay, setSelectedDay] = useState(1)

  const currentDayItinerary = mockTrip.itinerary.find(d => d.day === selectedDay)

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours === 0) return `${mins}m`
    if (mins === 0) return `${hours}h`
    return `${hours}h ${mins}m`
  }

  const handleCheckpointClick = (checkpoint: Checkpoint) => {
    navigate('checkpoint', { checkpoint })
  }

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="px-6 pb-2 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{mockTrip.destination.name}</h1>
            <p className="text-sm text-muted-foreground">
              {mockTrip.startDate.split('-').slice(1).join('/')} - {mockTrip.endDate.split('-').slice(1).join('/')}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="rounded-lg bg-transparent"
            onClick={() => navigate('map')}
          >
            <Navigation className="mr-1.5 h-4 w-4" />
            Navigate
          </Button>
        </div>
      </div>

      {/* Day Tabs */}
      <div className="border-b border-border px-6 py-3">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {mockTrip.itinerary.map((day) => (
            <button
              key={day.day}
              onClick={() => setSelectedDay(day.day)}
              className={cn(
                "flex shrink-0 flex-col items-center rounded-xl px-4 py-2 transition-all",
                selectedDay === day.day
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              )}
            >
              <span className="text-xs font-medium">Day</span>
              <span className="text-lg font-bold">{day.day}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Map Preview */}
      <div className="px-6 py-4">
        <button
          onClick={() => navigate('map')}
          className="relative h-32 w-full overflow-hidden rounded-2xl"
        >
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
            alt="Map preview"
            className="h-full w-full object-cover"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Simulated markers */}
          <div className="absolute inset-0 p-4">
            {currentDayItinerary?.checkpoints.map((checkpoint, i) => (
              <div
                key={checkpoint.id}
                className="absolute"
                style={{
                  left: `${20 + i * 25}%`,
                  top: `${30 + (i % 2) * 20}%`
                }}
              >
                <div className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
                  checkpoint.visited ? "bg-primary text-primary-foreground" : "bg-white text-foreground"
                )}>
                  {i + 1}
                </div>
              </div>
            ))}
            
            {/* Simulated polyline */}
            <svg className="absolute inset-0 h-full w-full" style={{ pointerEvents: 'none' }}>
              <path
                d="M 80 50 Q 120 60 160 45 Q 200 30 240 55"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="4 4"
                opacity="0.6"
              />
            </svg>
          </div>

          <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white">
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-medium">View full map</span>
          </div>
        </button>
      </div>

      {/* Checkpoints List */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Today's Stops
        </h3>

        <div className="space-y-4">
          {currentDayItinerary?.checkpoints.map((checkpoint, index) => {
            const Icon = typeIcons[checkpoint.type]
            const isLast = index === (currentDayItinerary?.checkpoints.length || 0) - 1
            
            return (
              <motion.div
                key={checkpoint.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => handleCheckpointClick(checkpoint)}
                  className="relative flex w-full gap-4"
                >
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    {checkpoint.visited ? (
                      <CheckCircle2 className="h-6 w-6 shrink-0 text-primary" />
                    ) : (
                      <Circle className="h-6 w-6 shrink-0 text-muted-foreground" />
                    )}
                    {!isLast && (
                      <div className={cn(
                        "mt-2 w-0.5 flex-1",
                        checkpoint.visited ? "bg-primary" : "bg-border"
                      )} />
                    )}
                  </div>

                  {/* Card */}
                  <div className={cn(
                    "flex-1 overflow-hidden rounded-2xl border bg-card transition-all",
                    checkpoint.visited ? "border-primary/30" : "border-border",
                    "hover:border-primary/50"
                  )}>
                    <div className="flex gap-3 p-3">
                      <img
                        src={checkpoint.image || "/placeholder.svg"}
                        alt={checkpoint.name}
                        className="h-20 w-20 shrink-0 rounded-xl object-cover"
                        crossOrigin="anonymous"
                      />
                      <div className="flex flex-1 flex-col justify-between py-0.5 text-left">
                        <div>
                          <div className="flex items-center gap-2">
                            <div className={cn(
                              "flex h-5 w-5 items-center justify-center rounded",
                              checkpoint.visited ? "bg-primary/20" : "bg-secondary"
                            )}>
                              <Icon className={cn(
                                "h-3 w-3",
                                checkpoint.visited ? "text-primary" : "text-muted-foreground"
                              )} />
                            </div>
                            <span className="text-xs capitalize text-muted-foreground">
                              {checkpoint.type}
                            </span>
                          </div>
                          <h4 className="mt-1 font-semibold text-foreground line-clamp-1">
                            {checkpoint.name}
                          </h4>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            <span className="text-xs">{formatDuration(checkpoint.duration)}</span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
