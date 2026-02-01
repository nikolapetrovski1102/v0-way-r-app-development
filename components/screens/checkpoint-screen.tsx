'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Volume2, 
  VolumeX, 
  Clock, 
  MapPin, 
  Share2, 
  Heart,
  Navigation,
  CheckCircle2,
  Landmark,
  UtensilsCrossed,
  Palette,
  Eye,
  ShoppingBag
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigation } from '@/components/mobile-app-shell'
import { cn } from '@/lib/utils'
import type { Checkpoint } from '@/lib/mock-data'
import { mockTrip } from '@/lib/mock-data'

const typeIcons = {
  landmark: Landmark,
  restaurant: UtensilsCrossed,
  museum: Palette,
  viewpoint: Eye,
  shopping: ShoppingBag
}

const typeLabels = {
  landmark: 'Historic Landmark',
  restaurant: 'Restaurant & Cafe',
  museum: 'Museum & Gallery',
  viewpoint: 'Scenic Viewpoint',
  shopping: 'Shopping District'
}

export function CheckpointScreen() {
  const { goBack, screenData } = useNavigation()
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  
  const checkpoint = (screenData.checkpoint as Checkpoint) || mockTrip.itinerary[0].checkpoints[0]
  const TypeIcon = typeIcons[checkpoint.type]

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours === 0) return `${mins} min`
    return `${hours}h ${mins}min`
  }

  const handleTTS = () => {
    if (isSpeaking) {
      window.speechSynthesis?.cancel()
      setIsSpeaking(false)
    } else {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(checkpoint.story)
        utterance.rate = 0.9
        utterance.onend = () => setIsSpeaking(false)
        window.speechSynthesis.speak(utterance)
        setIsSpeaking(true)
      }
    }
  }

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Hero Image */}
      <div className="relative h-[45%] shrink-0">
        <img
          src={checkpoint.image || "/placeholder.svg"}
          alt={checkpoint.name}
          className="h-full w-full object-cover"
          crossOrigin="anonymous"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        {/* Header Actions */}
        <div className="absolute left-4 right-4 top-2 flex items-center justify-between">
          <button
            onClick={goBack}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm"
          >
            <ArrowLeft className="h-5 w-5 text-white" />
          </button>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm transition-colors",
                isLiked ? "bg-red-500" : "bg-black/30"
              )}
            >
              <Heart className={cn("h-5 w-5", isLiked ? "fill-white text-white" : "text-white")} />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm">
              <Share2 className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        {/* Visited Badge */}
        {checkpoint.visited && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute bottom-20 right-4 flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5"
          >
            <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
            <span className="text-sm font-medium text-primary-foreground">Visited</span>
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col overflow-hidden px-6 -mt-8">
        {/* Title Section */}
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <TypeIcon className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              {typeLabels[checkpoint.type]}
            </span>
          </div>
          <h1 className="mt-2 text-2xl font-bold text-foreground text-balance">{checkpoint.name}</h1>
          
          {/* Meta Info */}
          <div className="mt-3 flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{formatDuration(checkpoint.duration)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">Paris, France</span>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="mt-6 flex-1 overflow-y-auto pb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">The Story</h2>
            <button
              onClick={handleTTS}
              className={cn(
                "flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors",
                isSpeaking ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
              )}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="h-4 w-4" />
                  <span className="text-sm font-medium">Stop</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-4 w-4" />
                  <span className="text-sm font-medium">Listen</span>
                </>
              )}
            </button>
          </div>
          
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {checkpoint.story}
          </p>

          {/* Quick Description */}
          <div className="mt-6 rounded-2xl bg-secondary/50 p-4">
            <h3 className="font-medium text-foreground">At a Glance</h3>
            <p className="mt-2 text-sm text-muted-foreground">{checkpoint.description}</p>
          </div>

          {/* Tips */}
          <div className="mt-4 rounded-2xl border border-accent/30 bg-accent/10 p-4">
            <h3 className="font-medium text-foreground">Pro Tips</h3>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                Best visited in the morning for fewer crowds
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                Photography is allowed without flash
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                Audio guides available in multiple languages
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="border-t border-border bg-background p-4">
        <Button
          size="lg"
          className="w-full rounded-xl py-6 text-base font-semibold"
          onClick={goBack}
        >
          <Navigation className="mr-2 h-5 w-5" />
          Navigate Here
        </Button>
      </div>
    </div>
  )
}
