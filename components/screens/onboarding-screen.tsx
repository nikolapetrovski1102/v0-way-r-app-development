'use client'

import { motion } from 'framer-motion'
import { MapPin, Sparkles, Navigation } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigation } from '@/components/mobile-app-shell'

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Planning',
    description: 'Get personalized itineraries tailored to your interests'
  },
  {
    icon: MapPin,
    title: 'Curated Experiences',
    description: 'Discover hidden gems and local favorites'
  },
  {
    icon: Navigation,
    title: 'Real-Time Navigation',
    description: 'Turn-by-turn guidance with voice cues'
  }
]

export function OnboardingScreen() {
  const { navigate } = useNavigation()

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Hero Image */}
      <div className="relative h-[45%] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80"
          alt="Paris cityscape"
          className="h-full w-full object-cover"
          crossOrigin="anonymous"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute left-6 top-4"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Navigation className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-white drop-shadow-lg">WayR</span>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-6 pb-10 pt-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance">
            Explore cities like never before
          </h1>
          <p className="mt-2 text-muted-foreground">
            Your AI travel companion for unforgettable adventures
          </p>
        </motion.div>

        {/* Features */}
        <div className="mt-6 flex-1 space-y-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-auto space-y-3"
        >
          <Button 
            size="lg" 
            className="w-full rounded-xl py-6 text-base font-semibold"
            onClick={() => navigate('home')}
          >
            Get Started
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </motion.div>
      </div>
    </div>
  )
}
