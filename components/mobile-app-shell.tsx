'use client'

import { useState, createContext, useContext, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Map, History, Settings } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type Screen = 
  | 'home' 
  | 'onboarding' 
  | 'preferences' 
  | 'generating' 
  | 'itinerary' 
  | 'map' 
  | 'checkpoint' 
  | 'history' 
  | 'settings'

interface NavigationContextType {
  currentScreen: Screen
  navigate: (screen: Screen, data?: Record<string, unknown>) => void
  goBack: () => void
  screenData: Record<string, unknown>
}

const NavigationContext = createContext<NavigationContextType | null>(null)

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (!context) throw new Error('useNavigation must be used within MobileAppShell')
  return context
}

interface NavItem {
  icon: LucideIcon
  label: string
  screen: Screen
}

const navItems: NavItem[] = [
  { icon: Home, label: 'Home', screen: 'home' },
  { icon: Map, label: 'Explore', screen: 'map' },
  { icon: History, label: 'Trips', screen: 'history' },
  { icon: Settings, label: 'Settings', screen: 'settings' }
]

const screensWithTabBar: Screen[] = ['home', 'map', 'itinerary', 'history', 'settings']

interface MobileAppShellProps {
  children: (props: { currentScreen: Screen }) => ReactNode
}

export function MobileAppShell({ children }: MobileAppShellProps) {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding')
  const [screenHistory, setScreenHistory] = useState<Screen[]>([])
  const [screenData, setScreenData] = useState<Record<string, unknown>>({})

  const navigate = (screen: Screen, data?: Record<string, unknown>) => {
    setScreenHistory(prev => [...prev, currentScreen])
    setCurrentScreen(screen)
    if (data) setScreenData(prev => ({ ...prev, ...data }))
  }

  const goBack = () => {
    if (screenHistory.length > 0) {
      const prevScreen = screenHistory[screenHistory.length - 1]
      setScreenHistory(prev => prev.slice(0, -1))
      setCurrentScreen(prevScreen)
    }
  }

  const showTabBar = screensWithTabBar.includes(currentScreen)

  return (
    <NavigationContext.Provider value={{ currentScreen, navigate, goBack, screenData }}>
      <div className="relative mx-auto h-screen max-h-[932px] w-full max-w-[430px] overflow-hidden bg-background">
        {/* Status Bar Simulation */}
        <div className="flex h-11 items-center justify-between bg-background px-6">
          <span className="text-sm font-semibold">9:41</span>
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              <div className="h-2.5 w-1 rounded-sm bg-foreground" />
              <div className="h-3 w-1 rounded-sm bg-foreground" />
              <div className="h-3.5 w-1 rounded-sm bg-foreground" />
              <div className="h-4 w-1 rounded-sm bg-foreground" />
            </div>
            <div className="ml-1 flex items-center gap-0.5">
              <div className="h-3 w-5 rounded-sm border border-foreground">
                <div className="ml-0.5 mt-0.5 h-2 w-3.5 rounded-xs bg-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Screen Content */}
        <div className={cn(
          "h-[calc(100%-44px)] overflow-hidden",
          showTabBar && "h-[calc(100%-44px-80px)]"
        )}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="h-full"
            >
              {children({ currentScreen })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tab Bar */}
        <AnimatePresence>
          {showTabBar && (
            <motion.nav
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-x-0 bottom-0 border-t border-border bg-background/95 backdrop-blur-lg"
            >
              <div className="flex items-center justify-around px-2 pb-6 pt-3">
                {navItems.map(({ icon: Icon, label, screen }) => {
                  const isActive = currentScreen === screen || 
                    (screen === 'home' && currentScreen === 'itinerary') ||
                    (screen === 'map' && currentScreen === 'checkpoint')
                  return (
                    <button
                      key={screen}
                      onClick={() => navigate(screen)}
                      className={cn(
                        "flex flex-col items-center gap-1 rounded-xl px-4 py-2 transition-all",
                        isActive 
                          ? "text-primary" 
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Icon className={cn("h-6 w-6", isActive && "stroke-[2.5]")} />
                      <span className="text-xs font-medium">{label}</span>
                    </button>
                  )
                })}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </NavigationContext.Provider>
  )
}
