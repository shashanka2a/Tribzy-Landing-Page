import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Plus,
  Heart,
  Star,
  ExternalLink
} from "lucide-react"

// Mock events data (same as calendar.tsx)
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
  }
]

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function MobileCalendar() {
  const router = useRouter()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    return mockEvents.filter(event => event.date === dateString)
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
  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : []

  const getCategoryGradient = (category: string) => {
    switch (category.toLowerCase()) {
      case 'social': return 'from-blue-500 to-cyan-500'
      case 'academic': return 'from-purple-500 to-pink-500'
      case 'sports': return 'from-green-500 to-blue-500'
      case 'cultural': return 'from-yellow-500 to-orange-500'
      case 'food': return 'from-red-500 to-pink-500'
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
        <meta name="description" content="Mobile calendar view for UF Gainesville events" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/50 to-purple-50/50">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/80 backdrop-blur-xl">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                onClick={() => router.back()}
                className="text-gray-600 hover:text-indigo-600 p-2"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg shadow-lg">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Tribzy</span>
            </div>
            
            <Button 
              onClick={() => router.push('/events/create')}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white p-2"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Event Calendar</h1>
            <p className="text-gray-600">Browse UF Gainesville events by date</p>
          </div>

          {/* Calendar Navigation */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('prev')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-bold text-gray-900 text-center flex-1">
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
              className="w-full text-sm"
            >
              Go to Today
            </Button>
          </div>

          {/* Calendar Grid */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm mb-6">
            <CardContent className="p-4">
              {/* Week Days Header */}
              <div className="grid grid-cols-7 gap-1 mb-3">
                {weekDays.map((day) => (
                  <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
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
                        min-h-[60px] p-1 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200
                        ${isCurrentMonthDay ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 text-gray-400'}
                        ${isCurrentDay ? 'ring-2 ring-indigo-500 bg-indigo-50' : ''}
                        ${isSelected ? 'ring-2 ring-purple-500 bg-purple-50' : ''}
                        ${dayEvents.length > 0 ? 'border-indigo-300' : ''}
                      `}
                      onClick={() => setSelectedDate(day)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-medium ${isCurrentDay ? 'text-indigo-600' : ''}`}>
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
                        {dayEvents.slice(0, 1).map((event) => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded truncate ${getCategoryGradient(event.category)} text-white`}
                            title={event.title}
                          >
                            {event.title.length > 15 ? event.title.substring(0, 15) + '...' : event.title}
                          </div>
                        ))}
                        {dayEvents.length > 1 && (
                          <div className="text-xs text-gray-500">
                            +{dayEvents.length - 1}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Selected Date Events */}
          {selectedDate && (
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm mb-6">
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
              <CardContent className="space-y-4">
                {selectedDateEvents.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-8">
                    No events scheduled for this date
                  </p>
                ) : (
                  selectedDateEvents.map((event) => (
                    <div key={event.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {event.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            by {event.organizer}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {event.isUFEvent && (
                            <Badge className="bg-gradient-to-r from-orange-500 to-blue-500 text-white text-xs px-2 py-1">
                              🐊 UF
                            </Badge>
                          )}
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
                      
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          {event.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {event.location}
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge className={`text-xs px-2 py-1 ${getCategoryGradient(event.category)} text-white`}>
                            {event.category}
                          </Badge>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="font-medium">{event.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">
                            {event.price === 0 ? 'Free' : `$${event.price}`}
                          </span>
                          <span className="text-xs text-gray-500">
                            {event.attendees}/{event.maxAttendees} attendees
                          </span>
                        </div>
                      </div>
                      
                      <Button
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                        onClick={() => window.open(event.registrationUrl, '_blank')}
                      >
                        Register Now
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
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
              <Calendar className="h-4 w-4 mr-2" />
              List View
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
