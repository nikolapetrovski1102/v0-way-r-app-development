'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Calendar, 
  Landmark, 
  Palette, 
  UtensilsCrossed, 
  Trees, 
  Wine, 
  ShoppingBag, 
  Building2, 
  Camera,
  Check
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigation } from '@/components/mobile-app-shell'
import { cn } from '@/lib/utils'
import type { Destination } from '@/lib/mock-data'
import { destinations } from '@/lib/mock-data'

const interestOptions = [
  { id: 'landmarks', label: 'Historic Landmarks', icon: Landmark },
  { id: 'museums', label: 'Museums & Art', icon: Palette },
  { id: 'food', label: 'Local Cuisine', icon: UtensilsCrossed },
  { id: 'nature', label: 'Parks & Nature', icon: Trees },
  { id: 'nightlife', label: 'Nightlife', icon: Wine },
  { id: 'shopping', label: 'Shopping', icon: ShoppingBag },
  { id: 'architecture', label: 'Architecture', icon: Building2 },
  { id: 'photography', label: 'Photo Spots', icon: Camera }
]

const durationOptions = [
  { days: 1, label: '1 Day' },
  { days: 2, label: '2 Days' },
  { days: 3, label: '3 Days' },
  { days: 5, label: '5 Days' },
  { days: 7, label: '1 Week' }
]

export function PreferencesScreen() {
  const { navigate, goBack, screenData } = useNavigation()
  const selectedDestination = (screenData.selectedDestination as Destination) || destinations[0]
  
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [selectedDuration, setSelectedDuration] = useState<number>(3)
  const [step, setStep] = useState<'interests' | 'duration'>('interests')

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const handleContinue = () => {
    if (step === 'interests' && selectedInterests.length > 0) {
      setStep('duration')
    } else if (step === 'duration') {
      navigate('generating', { 
        destination: selectedDestination,
        interests: selectedInterests,
        duration: selectedDuration
      })
    }
  }

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-3">
        <button
          onClick={() => step === 'interests' ? goBack() : setStep('interests')}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">Planning trip to</p>
          <h2 className="font-semibold text-foreground">{selectedDestination.name}, {selectedDestination.country}</h2>
        </div>
      </div>

      {/* Progress */}
      <div className="px-6 py-2">
        <div className="flex gap-2">
          <div className="h-1.5 flex-1 rounded-full bg-primary" />
          <div className={cn(
            "h-1.5 flex-1 rounded-full transition-colors",
            step === 'duration' ? "bg-primary" : "bg-secondary"
          )} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {step === 'interests' ? (
          <motion.div
            key="interests"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h1 className="text-2xl font-bold text-foreground">What interests you?</h1>
            <p className="mt-1 text-muted-foreground">Select at least 2 to personalize your tour</p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {interestOptions.map((interest) => {
                const isSelected = selectedInterests.includes(interest.id)
                return (
                  <motion.button
                    key={interest.id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => toggleInterest(interest.id)}
                    className={cn(
                      "relative flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all",
                      isSelected
                        ? "border-primary bg-primary/10"
                        : "border-border bg-card hover:border-primary/30"
                    )}
                  >
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary"
                      >
                        <Check className="h-3 w-3 text-primary-foreground" />
                      </motion.div>
                    )}
                    <div className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
                      isSelected ? "bg-primary/20" : "bg-secondary"
                    )}>
                      <interest.icon className={cn(
                        "h-6 w-6 transition-colors",
                        isSelected ? "text-primary" : "text-muted-foreground"
                      )} />
                    </div>
                    <span className={cn(
                      "text-sm font-medium transition-colors",
                      isSelected ? "text-primary" : "text-foreground"
                    )}>
                      {interest.label}
                    </span>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="duration"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h1 className="text-2xl font-bold text-foreground">How long is your trip?</h1>
            <p className="mt-1 text-muted-foreground">We'll optimize your itinerary accordingly</p>

            <div className="mt-6 space-y-3">
              {durationOptions.map((option) => {
                const isSelected = selectedDuration === option.days
                return (
                  <motion.button
                    key={option.days}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedDuration(option.days)}
                    className={cn(
                      "flex w-full items-center gap-4 rounded-2xl border-2 p-4 transition-all",
                      isSelected
                        ? "border-primary bg-primary/10"
                        : "border-border bg-card hover:border-primary/30"
                    )}
                  >
                    <div className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
                      isSelected ? "bg-primary/20" : "bg-secondary"
                    )}>
                      <Calendar className={cn(
                        "h-6 w-6 transition-colors",
                        isSelected ? "text-primary" : "text-muted-foreground"
                      )} />
                    </div>
                    <span className={cn(
                      "text-lg font-semibold transition-colors",
                      isSelected ? "text-primary" : "text-foreground"
                    )}>
                      {option.label}
                    </span>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-primary"
                      >
                        <Check className="h-4 w-4 text-primary-foreground" />
                      </motion.div>
                    )}
                  </motion.button>
                )
              })}
            </div>

            {/* Date Picker Preview */}
            <div className="mt-6 rounded-2xl border border-border bg-card p-4">
              <p className="text-sm font-medium text-foreground">Trip Dates</p>
              <p className="mt-1 text-muted-foreground">Feb 15 - Feb {14 + selectedDuration}, 2026</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* CTA */}
      <div className="border-t border-border bg-background p-6">
        <Button
          size="lg"
          className="w-full rounded-xl py-6 text-base font-semibold"
          disabled={step === 'interests' && selectedInterests.length < 2}
          onClick={handleContinue}
        >
          {step === 'interests' ? 'Continue' : 'Generate Itinerary'}
        </Button>
        {step === 'interests' && selectedInterests.length < 2 && (
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Select at least {2 - selectedInterests.length} more {selectedInterests.length === 1 ? 'interest' : 'interests'}
          </p>
        )}
      </div>
    </div>
  )
}
