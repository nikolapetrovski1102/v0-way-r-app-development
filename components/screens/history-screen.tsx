'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  MapPin, 
  ChevronRight,
  Clock,
  CheckCircle2,
  Circle
} from 'lucide-react'
import { useNavigation } from '@/components/mobile-app-shell'
import { tripHistory } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import type { Trip } from '@/lib/mock-data'

type FilterType = 'all' | 'upcoming' | 'active' | 'completed'

export function HistoryScreen() {
  const { navigate } = useNavigation()
  const [filter, setFilter] = useState<FilterType>('all')

  const filteredTrips = tripHistory.filter(trip => {
    if (filter === 'all') return true
    return trip.status === filter
  })

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const getStatusConfig = (status: Trip['status']) => {
    switch (status) {
      case 'upcoming':
        return { 
          label: 'Upcoming', 
          icon: Clock, 
          className: 'bg-accent/20 text-accent-foreground border-accent/30' 
        }
      case 'active':
        return { 
          label: 'Active', 
          icon: Circle, 
          className: 'bg-primary/20 text-primary border-primary/30' 
        }
      case 'completed':
        return { 
          label: 'Completed', 
          icon: CheckCircle2, 
          className: 'bg-muted text-muted-foreground border-border' 
        }
    }
  }

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="px-6 pb-4 pt-2">
        <h1 className="text-2xl font-bold text-foreground">Your Trips</h1>
        <p className="text-sm text-muted-foreground">
          {tripHistory.length} trips total
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-border px-6 pb-3">
        <div className="flex gap-2 overflow-x-auto">
          {(['all', 'upcoming', 'active', 'completed'] as FilterType[]).map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors capitalize",
                filter === filterType
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              )}
            >
              {filterType}
            </button>
          ))}
        </div>
      </div>

      {/* Trips List */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {filteredTrips.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
              <MapPin className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-4 font-semibold text-foreground">No trips found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {filter === 'all' 
                ? "Start planning your first adventure!"
                : `You don't have any ${filter} trips`
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTrips.map((trip, index) => {
              const statusConfig = getStatusConfig(trip.status)
              const StatusIcon = statusConfig.icon

              return (
                <motion.button
                  key={trip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => trip.status === 'active' && navigate('itinerary')}
                  className={cn(
                    "w-full overflow-hidden rounded-2xl border bg-card text-left transition-all",
                    trip.status === 'active' 
                      ? "border-primary/30 hover:border-primary/50" 
                      : "border-border hover:border-primary/30"
                  )}
                >
                  <div className="relative h-32">
                    <img
                      src={trip.destination.image || "/placeholder.svg"}
                      alt={trip.destination.name}
                      className="h-full w-full object-cover"
                      crossOrigin="anonymous"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Status Badge */}
                    <div className={cn(
                      "absolute right-3 top-3 flex items-center gap-1.5 rounded-full border px-2.5 py-1",
                      statusConfig.className
                    )}>
                      <StatusIcon className="h-3.5 w-3.5" />
                      <span className="text-xs font-medium">{statusConfig.label}</span>
                    </div>

                    {/* Destination */}
                    <div className="absolute bottom-3 left-3 text-white">
                      <h3 className="text-lg font-bold">{trip.destination.name}</h3>
                      <p className="text-sm opacity-80">{trip.destination.country}</p>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          {formatDate(trip.startDate)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" />
                          {trip.itinerary.reduce((acc, day) => acc + day.checkpoints.length, 0)} stops
                        </span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>

                    {/* Interests Tags */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {trip.interests.slice(0, 3).map((interest) => (
                        <span
                          key={interest}
                          className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground capitalize"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
