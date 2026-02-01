'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Plus, ChevronRight, Navigation, MapPin, Calendar, Sparkles, TrendingUp, Clock, Heart, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useNavigation } from '@/components/mobile-app-shell'
import { destinations, tripHistory } from '@/lib/mock-data'

// Example trip preview for new users
const exampleTrip = {
  destination: 'Barcelona',
  country: 'Spain',
  days: 3,
  image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80',
  highlights: ['Sagrada Familia', 'Park Guell', 'La Rambla', 'Gothic Quarter'],
  description: 'Discover Gaudi\'s masterpieces and vibrant culture'
}

// Simulated AI suggestions based on user's past trips and trending destinations
const aiSuggestions = [
  {
    id: 's1',
    destination: destinations[4], // Prague
    reason: 'Based on your love for historic landmarks',
    match: 94,
    tags: ['Architecture', 'History', 'Culture'],
    bestTime: 'Perfect for spring visits'
  },
  {
    id: 's2',
    destination: destinations[5], // Lisbon
    reason: 'Trending this season',
    match: 88,
    tags: ['Cuisine', 'Viewpoints', 'Nightlife'],
    bestTime: 'Great weather right now'
  },
  {
    id: 's3',
    destination: destinations[3], // Amsterdam
    reason: 'Similar to cities you loved',
    match: 91,
    tags: ['Museums', 'Canals', 'Art'],
    bestTime: 'Tulip season approaching'
  }
]

export function HomeScreen() {
  const { navigate } = useNavigation()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredDestinations = destinations.filter(
    d => d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         d.country.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Check if user has an active trip
  const activeTrip = tripHistory.find(t => t.status === 'active')
  const hasActiveTrip = !!activeTrip
  const completedTripsCount = tripHistory.filter(t => t.status === 'completed').length
  const isNewUser = completedTripsCount === 0

  const handleViewExampleTrip = () => {
    // Navigate to itinerary to show the example trip
    navigate('itinerary')
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-background">
      {/* Header */}
      <div className="px-6 pb-4 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Welcome back</p>
            <h1 className="text-2xl font-bold text-foreground">Where to next?</h1>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary">
            <Navigation className="h-5 w-5 text-primary-foreground" />
          </div>
        </div>

        {/* Search */}
        <div className="relative mt-5">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 rounded-xl border-none bg-secondary pl-12 text-base placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Active Trip Card */}
      {hasActiveTrip && activeTrip && (
        <div className="px-6 pb-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-2xl bg-primary p-4"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-white/20 px-3 py-1">
                  <span className="text-xs font-medium text-primary-foreground">Active Trip</span>
                </div>
              </div>
              <h3 className="mt-3 text-xl font-bold text-primary-foreground">
                {activeTrip.destination.name}, {activeTrip.destination.country}
              </h3>
              <div className="mt-2 flex items-center gap-4 text-sm text-primary-foreground/80">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Day 1 of 3
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  3 stops today
                </span>
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="mt-4 rounded-lg bg-white text-primary hover:bg-white/90"
                onClick={() => navigate('itinerary')}
              >
                Continue Exploring
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
            <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-white/10" />
          </motion.div>
        </div>
      )}

      {/* Example Trip Preview - shown for new users with no past trips */}
      {!hasActiveTrip && isNewUser && (
        <div className="px-6 pb-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-hidden rounded-2xl bg-card ring-1 ring-border"
          >
            {/* Image Section */}
            <div className="relative h-44 overflow-hidden">
              <img
                src={exampleTrip.image}
                alt={exampleTrip.destination}
                className="h-full w-full object-cover"
                crossOrigin="anonymous"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              
              {/* Badge */}
              <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-medium text-foreground">Example Trip</span>
              </div>
              
              {/* Destination Info */}
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="text-xl font-bold text-white">
                  {exampleTrip.destination}, {exampleTrip.country}
                </h3>
                <p className="mt-1 text-sm text-white/80">
                  {exampleTrip.description}
                </p>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4">
              {/* Trip Stats */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {exampleTrip.days} days
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {exampleTrip.highlights.length} stops
                </span>
              </div>

              {/* Highlights */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {exampleTrip.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {highlight}
                  </span>
                ))}
              </div>

              {/* CTA Button */}
              <Button
                onClick={handleViewExampleTrip}
                className="mt-4 w-full rounded-xl"
                size="lg"
              >
                <Play className="mr-2 h-4 w-4" />
                See how a {exampleTrip.days}-day {exampleTrip.destination} trip looks
              </Button>

              {/* Create Your Own */}
              <button 
                onClick={() => navigate('preferences')}
                className="mt-3 w-full text-center text-sm font-medium text-primary hover:underline"
              >
                Or create your own trip
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* AI Personalized Suggestions - shown when user has past trips but no active trip */}
      {!hasActiveTrip && !isNewUser && (
        <div className="px-6 pb-4">
          {/* Section Header */}
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Picked for You</h2>
              <p className="text-xs text-muted-foreground">
                Based on {completedTripsCount} past {completedTripsCount === 1 ? 'trip' : 'trips'}
              </p>
            </div>
          </div>

          {/* Horizontal Scrolling Suggestion Cards */}
          <div className="-mx-6 px-6">
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {aiSuggestions.map((suggestion, index) => (
                <motion.div
                  key={suggestion.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-[280px] flex-shrink-0"
                >
                  <button
                    onClick={() => navigate('preferences', { selectedDestination: suggestion.destination })}
                    className="group w-full overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border transition-all hover:shadow-md"
                  >
                    {/* Image Header */}
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={suggestion.destination.image || "/placeholder.svg"}
                        alt={suggestion.destination.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        crossOrigin="anonymous"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      {/* Match Badge */}
                      <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 backdrop-blur-sm">
                        <Heart className="h-3 w-3 fill-primary text-primary" />
                        <span className="text-xs font-semibold text-foreground">{suggestion.match}% match</span>
                      </div>
                      
                      {/* Destination Name */}
                      <div className="absolute inset-x-0 bottom-0 p-3">
                        <h3 className="text-left text-lg font-bold text-white">
                          {suggestion.destination.name}
                        </h3>
                        <p className="text-left text-sm text-white/80">
                          {suggestion.destination.country}
                        </p>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-3">
                      {/* Reason */}
                      <div className="flex items-start gap-2">
                        {suggestion.reason.includes('Trending') ? (
                          <TrendingUp className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                        ) : (
                          <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                        )}
                        <p className="text-left text-sm text-muted-foreground">
                          {suggestion.reason}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="mt-2 flex flex-wrap gap-1">
                        {suggestion.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Best Time */}
                      <div className="mt-2 flex items-center gap-1 text-xs text-primary">
                        <Clock className="h-3 w-3" />
                        <span>{suggestion.bestTime}</span>
                      </div>

                      {/* CTA */}
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm font-medium text-primary">Plan this trip</span>
                        <ChevronRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Create Tour CTA */}
      <div className="px-6 pb-4">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('preferences')}
          className="flex w-full items-center gap-4 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 p-4 transition-colors hover:border-primary/50 hover:bg-primary/10"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <Plus className="h-6 w-6 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-foreground">Create New Tour</h3>
            <p className="text-sm text-muted-foreground">Plan your next adventure with AI</p>
          </div>
          <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
        </motion.button>
      </div>

      {/* Popular Destinations */}
      <div className="flex-1 px-6 pb-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Popular Destinations</h2>
          <button className="text-sm font-medium text-primary">See all</button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {filteredDestinations.slice(0, 4).map((destination, index) => (
            <motion.button
              key={destination.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('preferences', { selectedDestination: destination })}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl"
            >
              <img
                src={destination.image || "/placeholder.svg"}
                alt={destination.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                crossOrigin="anonymous"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <h3 className="font-semibold text-white">{destination.name}</h3>
                <p className="text-sm text-white/80">{destination.country}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
