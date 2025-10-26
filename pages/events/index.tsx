import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageWithFallback } from "@/components/figma/ImageWithFallback"
import { 
  Search,
  Filter,
  Calendar,
  MapPin,
  Users,
  Clock,
  DollarSign,
  Heart,
  Share2,
  Star,
  TrendingUp,
  Plus,
  Grid,
  List,
  SlidersHorizontal
} from "lucide-react"

// Mock data for events
const mockEvents = [
  {
    id: 1,
    title: "UF Homecoming Week Kickoff",
    organizer: "UF Student Government",
    date: "2025-10-27",
    time: "6:00 PM",
    location: "Turlington Plaza",
    attendees: 342,
    maxAttendees: 1000,
    category: "Social",
    price: 0,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop",
    description: "Join us for the start of UF Homecoming Week with food trucks, live music, and Gator spirit activities.",
    tags: ["homecoming", "social", "campus", "free"],
    registrationUrl: "https://calendar.ufl.edu/event/homecoming-kickoff",
    isUFEvent: true
  },
  {
    id: 2,
    title: "UF Career Fair Fall 2025",
    organizer: "UF Career Connections Center",
    date: "2025-10-29",
    time: "10:00 AM",
    location: "O'Connell Center",
    attendees: 89,
    maxAttendees: 5000,
    category: "Academic",
    price: 0,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop",
    description: "Connect with top employers and explore career opportunities at the largest career fair of the semester.",
    tags: ["career", "networking", "jobs", "professional"],
    registrationUrl: "https://career.ufl.edu/events/career-fair-fall-2025",
    isUFEvent: true
  },
  {
    id: 3,
    title: "GatorNights: Halloween Spooktacular",
    organizer: "UF Student Activities",
    date: "2025-10-31",
    time: "8:00 PM",
    location: "Reitz Union",
    attendees: 32,
    maxAttendees: 800,
    category: "Social",
    price: 0,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1509557965043-1d0b0b4a9a0a?w=400&h=300&fit=crop",
    description: "Join us for a spooky night of Halloween fun with haunted houses, costume contests, and treats.",
    tags: ["halloween", "gatornights", "costume", "social"],
    registrationUrl: "https://www.ufsa.ufl.edu/events/gatornights-halloween",
    isUFEvent: true
  },
  {
    id: 4,
    title: "Gator Football vs Georgia Bulldogs",
    organizer: "UF Athletics",
    date: "2025-11-01",
    time: "3:30 PM",
    location: "Ben Hill Griffin Stadium",
    attendees: 156,
    maxAttendees: 88548,
    category: "Sports",
    price: 45,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&h=300&fit=crop",
    description: "Watch the Gators take on the Georgia Bulldogs in this highly anticipated rivalry game.",
    tags: ["football", "sports", "rivalry", "stadium"],
    registrationUrl: "https://floridagators.com/sports/football/schedule",
    isUFEvent: true
  },
  {
    id: 5,
    title: "UF Research Symposium",
    organizer: "UF Office of Research",
    date: "2025-11-05",
    time: "9:00 AM",
    location: "Reitz Union Grand Ballroom",
    attendees: 45,
    maxAttendees: 300,
    category: "Academic",
    price: 0,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    description: "Showcase undergraduate and graduate research projects across all disciplines.",
    tags: ["research", "academic", "presentation", "scholarship"],
    registrationUrl: "https://research.ufl.edu/events/symposium",
    isUFEvent: true
  },
  {
    id: 6,
    title: "Gainesville Food Truck Rally",
    organizer: "UF Dining Services",
    date: "2025-11-08",
    time: "5:00 PM",
    location: "Plaza of the Americas",
    attendees: 67,
    maxAttendees: 500,
    category: "Food",
    price: 5,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    description: "Sample delicious food from local Gainesville food trucks on campus.",
    tags: ["food", "local", "trucks", "campus"],
    registrationUrl: "https://dining.ufl.edu/events/food-truck-rally",
    isUFEvent: true
  },
  {
    id: 7,
    title: "UF Basketball Season Opener",
    organizer: "UF Athletics",
    date: "2025-11-12",
    time: "7:00 PM",
    location: "Exactech Arena",
    attendees: 89,
    maxAttendees: 10000,
    category: "Sports",
    price: 20,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop",
    description: "Cheer on the Gators as they tip off the 2025-26 basketball season.",
    tags: ["basketball", "sports", "season-opener", "gators"],
    registrationUrl: "https://floridagators.com/sports/mens-basketball/schedule",
    isUFEvent: true
  },
  {
    id: 8,
    title: "UF International Education Week",
    organizer: "UF International Center",
    date: "2025-11-15",
    time: "11:00 AM",
    location: "Turlington Plaza",
    attendees: 45,
    maxAttendees: 1000,
    category: "Cultural",
    price: 0,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop",
    description: "Celebrate global diversity with cultural performances, food, and educational activities.",
    tags: ["international", "cultural", "diversity", "education"],
    registrationUrl: "https://international.ufl.edu/events/education-week",
    isUFEvent: true
  },
  {
    id: 9,
    title: "UF Engineering Expo 2025",
    organizer: "UF College of Engineering",
    date: "2025-11-20",
    time: "9:00 AM",
    location: "Engineering Building Complex",
    attendees: 32,
    maxAttendees: 2000,
    category: "Academic",
    price: 0,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
    description: "Annual engineering showcase featuring student projects, industry presentations, and networking opportunities.",
    tags: ["engineering", "expo", "projects", "industry"],
    registrationUrl: "https://eng.ufl.edu/events/expo-2025",
    isUFEvent: true
  },
  {
    id: 10,
    title: "Gator Volleyball vs LSU",
    organizer: "UF Athletics",
    date: "2025-11-22",
    time: "7:00 PM",
    location: "Exactech Arena",
    attendees: 67,
    maxAttendees: 10000,
    category: "Sports",
    price: 8,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1594736797933-d0c29d4b8a0a?w=400&h=300&fit=crop",
    description: "Support the Gator volleyball team as they face LSU in an exciting conference match.",
    tags: ["volleyball", "sports", "lsu", "conference"],
    registrationUrl: "https://floridagators.com/sports/volleyball/schedule",
    isUFEvent: true
  }
]

const categories = [
  'All',
  'Academic',
  'Sports',
  'Social',
  'Cultural',
  'Food',
  'Music',
  'Technology',
  'Community',
  'Arts',
  'Workshop',
  'Conference'
]

const sortOptions = [
  { value: 'date', label: 'Date' },
  { value: 'popularity', label: 'Popularity' },
  { value: 'rating', label: 'Rating' },
  { value: 'price', label: 'Price' }
]

export default function Events() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('date')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])

  const filteredEvents = mockEvents
    .filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case 'popularity':
          return b.attendees - a.attendees
        case 'rating':
          return b.rating - a.rating
        case 'price':
          return a.price - b.price
        default:
          return 0
      }
    })

  const toggleFavorite = (eventId: number) => {
    setFavorites(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    )
  }

  const getCategoryGradient = (category: string) => {
    switch (category.toLowerCase()) {
      case 'music': return 'from-pink-500 to-violet-500'
      case 'technology': return 'from-indigo-500 to-purple-500'
      case 'academic': return 'from-purple-500 to-pink-500'
      case 'community': return 'from-violet-500 to-indigo-500'
      case 'sports': return 'from-green-500 to-blue-500'
      case 'arts': return 'from-orange-500 to-red-500'
      case 'social': return 'from-blue-500 to-cyan-500'
      case 'cultural': return 'from-yellow-500 to-orange-500'
      case 'food': return 'from-red-500 to-pink-500'
      case 'workshop': return 'from-teal-500 to-green-500'
      case 'conference': return 'from-indigo-500 to-blue-500'
      default: return 'from-indigo-500 to-purple-500'
    }
  }

  return (
    <div>
      <Head>
        <title>Events - Tribzy</title>
        <meta name="description" content="Discover campus events on Tribzy" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/50 to-purple-50/50">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/80 backdrop-blur-xl">
          <div className="container mx-auto flex h-16 items-center justify-between px-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Tribzy</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => router.push('/events/create')}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
              <Button 
                variant="outline"
                onClick={() => router.push('/events/calendar')}
                className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Calendar View
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => router.push('/dashboard')}
                className="text-gray-600 hover:text-indigo-600"
              >
                Dashboard
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">UF Gainesville Events</h1>
            <p className="text-gray-600 text-lg">Discover amazing events happening at University of Florida starting October 27, 2025</p>
            <div className="mt-4 flex items-center space-x-4">
              <Badge className="bg-gradient-to-r from-orange-500 to-blue-500 text-white px-4 py-2">
                🐊 Official UF Events
              </Badge>
              <span className="text-sm text-gray-500">10 events found</span>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search events, organizers, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/90 backdrop-blur-sm"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 bg-white/90 backdrop-blur-sm">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 bg-white/90 backdrop-blur-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* View Mode Toggle */}
              <div className="flex bg-white/90 backdrop-blur-sm rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Filters Button */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="bg-white/90 backdrop-blur-sm"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-4 p-4 bg-white/90 backdrop-blur-sm rounded-lg border">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Price Range</label>
                    <div className="flex space-x-2">
                      <Input placeholder="Min" type="number" />
                      <Input placeholder="Max" type="number" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Date Range</label>
                    <div className="flex space-x-2">
                      <Input type="date" />
                      <Input type="date" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Event Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in-person">In-Person</SelectItem>
                        <SelectItem value="virtual">Virtual</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
              {searchQuery && ` for "${searchQuery}"`}
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            </p>
          </div>

          {/* Events Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 bg-white/90 backdrop-blur-sm">
                  <div className="relative">
                    <ImageWithFallback
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className={`absolute top-3 right-3 bg-gradient-to-r ${getCategoryGradient(event.category)} text-white font-medium px-3 py-1 text-xs border-0 shadow-lg`}>
                      {event.category}
                    </Badge>
                    {event.isUFEvent && (
                      <Badge className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-blue-500 text-white font-medium px-3 py-1 text-xs border-0 shadow-lg">
                        🐊 UF Event
                      </Badge>
                    )}
                    <button
                      onClick={() => toggleFavorite(event.id)}
                      className={`absolute ${event.isUFEvent ? 'top-12 left-3' : 'top-3 left-3'} p-2 rounded-full transition-colors ${
                        favorites.includes(event.id) 
                          ? 'bg-red-500 text-white' 
                          : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
                      }`}
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>
                  <CardHeader className="p-5">
                    <CardTitle className="text-lg mb-2 font-bold line-clamp-2">
                      {event.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 bg-indigo-50 px-3 py-1 rounded-full">
                          <Calendar className="h-4 w-4 text-indigo-600" />
                          <span className="text-sm font-medium text-indigo-700">{event.date}</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-purple-50 px-3 py-1 rounded-full">
                          <Users className="h-4 w-4 text-purple-600" />
                          <span className="text-sm font-medium text-purple-700">{event.attendees}/{event.maxAttendees}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          <span className="text-sm font-medium">{event.price === 0 ? 'Free' : `$${event.price}`}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium text-gray-700">{event.rating}</span>
                        </div>
                        <span className="text-xs text-gray-500">by {event.organizer}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-5 pt-0">
                    <div className="flex space-x-2">
                      <Button 
                        className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                        onClick={() => window.open(event.registrationUrl || `/events/${event.id}`, '_blank')}
                      >
                        {event.registrationUrl ? 'Register Now' : 'View Details'}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex space-x-4">
                      <div className="w-32 h-24 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                        <ImageWithFallback
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 truncate">{event.title}</h3>
                          <div className="flex items-center space-x-2">
                            <Badge className={`bg-gradient-to-r ${getCategoryGradient(event.category)} text-white text-xs`}>
                              {event.category}
                            </Badge>
                            <button
                              onClick={() => toggleFavorite(event.id)}
                              className={`p-1 rounded-full transition-colors ${
                                favorites.includes(event.id) 
                                  ? 'text-red-500' 
                                  : 'text-gray-400 hover:text-red-500'
                              }`}
                            >
                              <Heart className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{event.description}</p>
                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {event.date} at {event.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {event.location}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {event.attendees}/{event.maxAttendees}
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {event.price === 0 ? 'Free' : `$${event.price}`}
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                            {event.rating}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button 
                          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                          onClick={() => window.open(event.registrationUrl || `/events/${event.id}`, '_blank')}
                        >
                          {event.registrationUrl ? 'Register Now' : 'View Details'}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Empty State */}
          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
              <Button 
                onClick={() => router.push('/events/create')}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
