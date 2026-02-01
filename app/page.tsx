'use client'

import { MobileAppShell } from '@/components/mobile-app-shell'
import { OnboardingScreen } from '@/components/screens/onboarding-screen'
import { HomeScreen } from '@/components/screens/home-screen'
import { PreferencesScreen } from '@/components/screens/preferences-screen'
import { GeneratingScreen } from '@/components/screens/generating-screen'
import { ItineraryScreen } from '@/components/screens/itinerary-screen'
import { MapScreen } from '@/components/screens/map-screen'
import { CheckpointScreen } from '@/components/screens/checkpoint-screen'
import { HistoryScreen } from '@/components/screens/history-screen'
import { SettingsScreen } from '@/components/screens/settings-screen'

export default function WayRApp() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-foreground/5 p-4">
      <MobileAppShell>
        {({ currentScreen }) => {
          switch (currentScreen) {
            case 'onboarding':
              return <OnboardingScreen />
            case 'home':
              return <HomeScreen />
            case 'preferences':
              return <PreferencesScreen />
            case 'generating':
              return <GeneratingScreen />
            case 'itinerary':
              return <ItineraryScreen />
            case 'map':
              return <MapScreen />
            case 'checkpoint':
              return <CheckpointScreen />
            case 'history':
              return <HistoryScreen />
            case 'settings':
              return <SettingsScreen />
            default:
              return <HomeScreen />
          }
        }}
      </MobileAppShell>
    </main>
  )
}
