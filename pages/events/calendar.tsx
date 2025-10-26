import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Filter,
  Grid,
  List,
  Search,
  Plus,
  Star,
  Heart,
  Share2,
  ExternalLink
} from "lucide-react"

// Mock events data with dates
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

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function EventCalendar() {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState<number[]>([])

  // Handle mobile detection safely for SSR
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    return mockEvents.filter(event => event.date === dateString)
  }

  // Get events for the current month
  const getEventsForMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return mockEvents.filter(event => {
      const eventDate = new Date(event.date)
      return eventDate.getFullYear() === year && eventDate.getMonth() === month
    })
  }

  // Generate calendar days
  const generateCalendarDays = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
    
    const days = []
    const currentDay = new Date(startDate)
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDay))
      currentDay.setDate(currentDay.getDate() + 1)
    }
    
    return days
  }

  const calendarDays = generateCalendarDays(currentDate)
  const monthEvents = getEventsForMonth(currentDate)
  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : []

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

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth()
  }

  const toggleFavorite = (eventId: number) => {
    setFavorites(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    )
  }

  return (
    <div>
      <Head>
        <title>Event Calendar - Tribzy</title>
        <meta name="description" content="Browse UF Gainesville events by calendar view" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/50 to-purple-50/50">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/80 backdrop-blur-xl">
          <div className="container mx-auto flex h-16 items-center justify-between px-6">
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                onClick={() => router.back()}
                className="text-gray-600 hover:text-indigo-600"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
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
                variant="ghost" 
                onClick={() => router.push('/events')}
                className="text-gray-600 hover:text-indigo-600"
              >
                List View
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Event Calendar</h1>
                <p className="text-gray-600 text-lg">Browse UF Gainesville events by date</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-gradient-to-r from-orange-500 to-blue-500 text-white px-4 py-2">
                  🐊 UF Events
                </Badge>
                <span className="text-sm text-gray-500">{monthEvents.length} events this month</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="mb-8">
            <div className={`flex gap-4 items-center justify-between ${isMobile ? 'flex-col' : 'flex-col lg:flex-row'}`}>
              {/* Calendar Navigation */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateMonth('prev')}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h2 className="text-2xl font-bold text-gray-900 min-w-[200px] text-center">
                    {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateMonth('next')}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setCurrentDate(new Date())}
                  className="text-sm"
                >
                  Today
                </Button>
              </div>

              {/* Filters */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
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
                <div className="flex bg-white/90 backdrop-blur-sm rounded-lg p-1">
                  <Button
                    variant={viewMode === 'month' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('month')}
                  >
                    <Calendar className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'week' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('week')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'day' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('day')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-4'}`}>
            {/* Calendar Grid */}
            <div className={isMobile ? 'col-span-1' : 'lg:col-span-3'}>
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardContent className="p-6">
                  {/* Week Days Header */}
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {weekDays.map((day) => (
                      <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((day, index) => {
                      const dayEvents = getEventsForDate(day)
                      const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString()
                      const isCurrentDay = isToday(day)
                      const isCurrentMonthDay = isCurrentMonth(day)

                      return (
                        <div
                          key={index}
                          className={`
                            min-h-[100px] p-2 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200
                            ${isCurrentMonthDay ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 text-gray-400'}
                            ${isCurrentDay ? 'ring-2 ring-indigo-500 bg-indigo-50' : ''}
                            ${isSelected ? 'ring-2 ring-purple-500 bg-purple-50' : ''}
                            ${dayEvents.length > 0 ? 'border-indigo-300' : ''}
                          `}
                          onClick={() => setSelectedDate(day)}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-sm font-medium ${isCurrentDay ? 'text-indigo-600' : ''}`}>
                              {day.getDate()}
                            </span>
                            {dayEvents.length > 0 && (
                              <Badge className="bg-indigo-500 text-white text-xs px-1 py-0">
                                {dayEvents.length}
                              </Badge>
                            )}
                          </div>
                          
                          {/* Event indicators */}
                          <div className="space-y-1">
                            {dayEvents.slice(0, 2).map((event) => (
                              <div
                                key={event.id}
                                className={`text-xs p-1 rounded truncate ${getCategoryGradient(event.category)} text-white`}
                                title={event.title}
                              >
                                {event.title}
                              </div>
                            ))}
                            {dayEvents.length > 2 && (
                              <div className="text-xs text-gray-500">
                                +{dayEvents.length - 2} more
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className={`space-y-6 ${isMobile ? 'mt-6' : ''}`}>
              {/* Selected Date Events */}
              {selectedDate && (
                <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {selectedDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      {selectedDateEvents.length} event{selectedDateEvents.length !== 1 ? 's' : ''}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {selectedDateEvents.length === 0 ? (
                      <p className="text-gray-500 text-sm text-center py-4">
                        No events scheduled for this date
                      </p>
                    ) : (
                      selectedDateEvents.map((event) => (
                        <div key={event.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-sm text-gray-900 line-clamp-2">
                              {event.title}
                            </h4>
                            <button
                              onClick={() => toggleFavorite(event.id)}
                              className={`p-1 rounded-full transition-colors ${
                                favorites.includes(event.id) 
                                  ? 'text-red-500' 
                                  : 'text-gray-400 hover:text-red-500'
                              }`}
                            >
                              <Heart className="h-3 w-3" />
                            </button>
                          </div>
                          <div className="space-y-1 text-xs text-gray-600">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {event.time}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {event.location}
                            </div>
                            <div className="flex items-center justify-between">
                              <Badge className={`text-xs px-2 py-0 ${getCategoryGradient(event.category)} text-white`}>
                                {event.category}
                              </Badge>
                              <span className="font-medium">{event.price === 0 ? 'Free' : `$${event.price}`}</span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                            onClick={() => window.open(event.registrationUrl, '_blank')}
                          >
                            Register
                          </Button>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Upcoming Events */}
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {monthEvents.slice(0, 5).map((event) => (
                    <div key={event.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-sm text-gray-900 line-clamp-2">
                          {event.title}
                        </h4>
                        {event.isUFEvent && (
                          <Badge className="bg-gradient-to-r from-orange-500 to-blue-500 text-white text-xs px-2 py-0">
                            🐊
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-1 text-xs text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {event.time}
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge className={`text-xs px-2 py-0 ${getCategoryGradient(event.category)} text-white`}>
                            {event.category}
                          </Badge>
                          <span className="font-medium">{event.price === 0 ? 'Free' : `$${event.price}`}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => router.push('/events/create')}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Event
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => router.push('/events')}
                  >
                    <List className="h-4 w-4 mr-2" />
                    List View
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Calendar
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
