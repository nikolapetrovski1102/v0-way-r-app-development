'use client'

import React from "react"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User,
  Bell,
  Volume2,
  MapPin,
  Globe,
  Moon,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Navigation,
  Smartphone
} from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

interface SettingItem {
  icon: React.ElementType
  label: string
  description?: string
  type: 'toggle' | 'link' | 'select'
  value?: boolean
  selectValue?: string
}

interface SettingSection {
  title: string
  items: SettingItem[]
}

export function SettingsScreen() {
  const [settings, setSettings] = useState({
    notifications: true,
    voiceGuidance: true,
    offlineMaps: false,
    darkMode: false,
    locationSharing: true
  })

  const sections: SettingSection[] = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Profile', description: 'Edit your profile information', type: 'link' },
        { icon: Shield, label: 'Privacy', description: 'Manage your data and permissions', type: 'link' }
      ]
    },
    {
      title: 'Preferences',
      items: [
        { icon: Bell, label: 'Notifications', description: 'Push and email alerts', type: 'toggle', value: settings.notifications },
        { icon: Volume2, label: 'Voice Guidance', description: 'Audio navigation prompts', type: 'toggle', value: settings.voiceGuidance },
        { icon: MapPin, label: 'Offline Maps', description: 'Download maps for offline use', type: 'toggle', value: settings.offlineMaps },
        { icon: Globe, label: 'Language', type: 'select', selectValue: 'English' },
        { icon: Moon, label: 'Dark Mode', type: 'toggle', value: settings.darkMode }
      ]
    },
    {
      title: 'Location',
      items: [
        { icon: MapPin, label: 'Location Sharing', description: 'Share location with tour guides', type: 'toggle', value: settings.locationSharing },
        { icon: Smartphone, label: 'GPS Settings', description: 'High accuracy mode', type: 'link' }
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help Center', type: 'link' },
        { icon: Navigation, label: 'About WayR', type: 'link' }
      ]
    }
  ]

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const getToggleKey = (label: string): keyof typeof settings | null => {
    const map: Record<string, keyof typeof settings> = {
      'Notifications': 'notifications',
      'Voice Guidance': 'voiceGuidance',
      'Offline Maps': 'offlineMaps',
      'Dark Mode': 'darkMode',
      'Location Sharing': 'locationSharing'
    }
    return map[label] || null
  }

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="px-6 pb-4 pt-2">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
      </div>

      {/* Profile Card */}
      <div className="px-6 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 rounded-2xl bg-card p-4 border border-border"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
            JD
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">John Doe</h3>
            <p className="text-sm text-muted-foreground">john.doe@email.com</p>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </div>

      {/* Settings Sections */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {sections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
            className="mb-6"
          >
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {section.title}
            </h2>
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon
                const toggleKey = getToggleKey(item.label)
                const isLast = itemIndex === section.items.length - 1

                return (
                  <button
                    key={item.label}
                    className={cn(
                      "flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-secondary/50",
                      !isLast && "border-b border-border"
                    )}
                    onClick={() => {
                      if (item.type === 'toggle' && toggleKey) {
                        handleToggle(toggleKey)
                      }
                    }}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{item.label}</p>
                      {item.description && (
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      )}
                    </div>
                    {item.type === 'toggle' && toggleKey && (
                      <Switch
                        checked={settings[toggleKey]}
                        onCheckedChange={() => handleToggle(toggleKey)}
                      />
                    )}
                    {item.type === 'link' && (
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    )}
                    {item.type === 'select' && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{item.selectValue}</span>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </motion.div>
        ))}

        {/* Logout Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-destructive transition-colors hover:bg-destructive/20"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Sign Out</span>
        </motion.button>

        {/* Version */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          WayR v2.1.0 (Build 2026.01)
        </p>
      </div>
    </div>
  )
}
