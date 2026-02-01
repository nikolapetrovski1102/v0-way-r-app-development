export interface Destination {
  id: string
  name: string
  country: string
  image: string
  description: string
}

export interface Interest {
  id: string
  label: string
  icon: string
}

export interface Checkpoint {
  id: string
  name: string
  type: 'landmark' | 'restaurant' | 'museum' | 'viewpoint' | 'shopping'
  description: string
  story: string
  image: string
  duration: number
  lat: number
  lng: number
  visited: boolean
}

export interface DayItinerary {
  day: number
  date: string
  checkpoints: Checkpoint[]
}

export interface Trip {
  id: string
  destination: Destination
  startDate: string
  endDate: string
  itinerary: DayItinerary[]
  status: 'upcoming' | 'active' | 'completed'
  interests: string[]
}

export const destinations: Destination[] = [
  {
    id: '1',
    name: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    description: 'The City of Light'
  },
  {
    id: '2',
    name: 'Rome',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80',
    description: 'The Eternal City'
  },
  {
    id: '3',
    name: 'Barcelona',
    country: 'Spain',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80',
    description: 'City of Gaudi'
  },
  {
    id: '4',
    name: 'Amsterdam',
    country: 'Netherlands',
    image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80',
    description: 'Venice of the North'
  },
  {
    id: '5',
    name: 'Prague',
    country: 'Czech Republic',
    image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=800&q=80',
    description: 'City of a Hundred Spires'
  },
  {
    id: '6',
    name: 'Lisbon',
    country: 'Portugal',
    image: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800&q=80',
    description: 'City of Seven Hills'
  }
]

export const interests: Interest[] = [
  { id: 'landmarks', label: 'Historic Landmarks', icon: 'landmark' },
  { id: 'museums', label: 'Museums & Art', icon: 'palette' },
  { id: 'food', label: 'Local Cuisine', icon: 'utensils' },
  { id: 'nature', label: 'Parks & Nature', icon: 'trees' },
  { id: 'nightlife', label: 'Nightlife', icon: 'wine' },
  { id: 'shopping', label: 'Shopping', icon: 'shopping-bag' },
  { id: 'architecture', label: 'Architecture', icon: 'building' },
  { id: 'photography', label: 'Photo Spots', icon: 'camera' }
]

export const mockTrip: Trip = {
  id: '1',
  destination: destinations[0],
  startDate: '2026-02-15',
  endDate: '2026-02-18',
  interests: ['landmarks', 'food', 'museums'],
  status: 'completed',
  itinerary: [
    {
      day: 1,
      date: '2026-02-15',
      checkpoints: [
        {
          id: 'c1',
          name: 'Eiffel Tower',
          type: 'landmark',
          description: 'Iconic iron lattice tower on the Champ de Mars',
          story: 'Built for the 1889 World\'s Fair, the Eiffel Tower was initially criticized by leading French intellectuals and artists. Gustave Eiffel defended his creation by comparing it to the pyramids of Egypt. Today, it stands as the most-visited paid monument in the world, welcoming nearly 7 million visitors annually.',
          image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce65f4?w=800&q=80',
          duration: 120,
          lat: 48.8584,
          lng: 2.2945,
          visited: true
        },
        {
          id: 'c2',
          name: 'Café de Flore',
          type: 'restaurant',
          description: 'Historic café in the Saint-Germain-des-Prés area',
          story: 'Since 1887, Café de Flore has been a gathering place for artists, writers, and philosophers. Jean-Paul Sartre and Simone de Beauvoir practically lived here during the 1940s, developing existentialist philosophy over countless cups of coffee.',
          image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80',
          duration: 60,
          lat: 48.8540,
          lng: 2.3326,
          visited: true
        },
        {
          id: 'c3',
          name: 'Louvre Museum',
          type: 'museum',
          description: 'World\'s largest art museum and historic monument',
          story: 'Originally built as a fortress in the 12th century, the Louvre has evolved into the world\'s most visited museum. Its collection spans 9,000 years of art history, including the enigmatic Mona Lisa and the majestic Winged Victory of Samothrace.',
          image: 'https://images.unsplash.com/photo-1499426600726-ac36e6f22193?w=800&q=80',
          duration: 180,
          lat: 48.8606,
          lng: 2.3376,
          visited: false
        }
      ]
    },
    {
      day: 2,
      date: '2026-02-16',
      checkpoints: [
        {
          id: 'c4',
          name: 'Montmartre',
          type: 'viewpoint',
          description: 'Hilltop district famous for Sacré-Cœur and artists',
          story: 'Montmartre was once a village outside Paris, known for its vineyards and windmills. In the late 19th century, it became the gathering place for artists like Picasso, Van Gogh, and Toulouse-Lautrec, who were drawn by cheap rents and bohemian atmosphere.',
          image: 'https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=800&q=80',
          duration: 150,
          lat: 48.8867,
          lng: 2.3431,
          visited: false
        },
        {
          id: 'c5',
          name: 'Le Marais',
          type: 'shopping',
          description: 'Historic district with boutiques and galleries',
          story: 'Le Marais miraculously survived Baron Haussmann\'s 19th-century renovations that transformed much of Paris. Today, its medieval streets house cutting-edge fashion boutiques, art galleries, and some of the city\'s best falafel shops.',
          image: 'https://images.unsplash.com/photo-1550340498-c7abef14d6f4?w=800&q=80',
          duration: 120,
          lat: 48.8559,
          lng: 2.3596,
          visited: false
        }
      ]
    },
    {
      day: 3,
      date: '2026-02-17',
      checkpoints: [
        {
          id: 'c6',
          name: 'Notre-Dame Cathedral',
          type: 'landmark',
          description: 'Medieval Catholic cathedral under restoration',
          story: 'Construction began in 1163 and took nearly 200 years to complete. The cathedral witnessed the coronation of Napoleon and inspired Victor Hugo\'s famous novel. After the 2019 fire, an international effort is restoring this Gothic masterpiece to its former glory.',
          image: 'https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?w=800&q=80',
          duration: 90,
          lat: 48.8530,
          lng: 2.3499,
          visited: false
        },
        {
          id: 'c7',
          name: 'Luxembourg Gardens',
          type: 'viewpoint',
          description: 'Beautiful park with fountains and sculptures',
          story: 'Created for Marie de Medici in 1612 as the garden for the Luxembourg Palace, this 23-hectare oasis features the iconic Medici Fountain, an orchard with heritage apple varieties, and one of Paris\'s most beloved spots for people-watching.',
          image: 'https://images.unsplash.com/photo-1597910037310-7dd8ddb93e24?w=800&q=80',
          duration: 60,
          lat: 48.8462,
          lng: 2.3371,
          visited: false
        }
      ]
    }
  ]
}

// Set to empty array to simulate new user (shows onboarding prompts)
// Add trips back to see AI personalized suggestions
export const tripHistory: Trip[] = [
  // Uncomment below to simulate returning user with past trips:
  // {
  //   ...mockTrip,
  //   id: '2',
  //   status: 'completed',
  //   startDate: '2025-12-10',
  //   endDate: '2025-12-13',
  //   destination: destinations[1]
  // },
  // {
  //   ...mockTrip,
  //   id: '3',
  //   status: 'completed',
  //   startDate: '2025-10-05',
  //   endDate: '2025-10-08',
  //   destination: destinations[2]
  // },
  {
    ...mockTrip,
    id: '4',
    status: 'active',
    startDate: '2026-05-12',
    endDate: '2026-05-18',
    destination: destinations[0] // Paris
  }
]
