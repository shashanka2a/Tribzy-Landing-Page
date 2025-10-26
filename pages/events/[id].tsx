import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ImageWithFallback } from "@/components/figma/ImageWithFallback"
import { 
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Heart,
  Share2,
  Star,
  User,
  Mail,
  Phone,
  ExternalLink,
  CheckCircle,
  AlertCircle
} from "lucide-react"

// Mock event data
const mockEvent = {
  id: 1,
  title: "UF Homecoming Week Kickoff",
  organizer: "UF Student Government",
  organizerEmail: "sg@ufl.edu",
  organizerPhone: "(352) 392-1265",
  date: "2025-10-27",
  time: "6:00 PM",
  endTime: "10:00 PM",
  location: "Turlington Plaza",
  virtualLink: "",
  attendees: 342,
  maxAttendees: 1000,
  category: "Social",
  price: 0,
  rating: 4.8,
  image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop",
  description: "Join us for the start of UF Homecoming Week with food trucks, live music, and Gator spirit activities.",
  longDescription: `
    Get ready for the biggest campus event of the fall semester! Our annual UF Homecoming Week Kickoff brings together the entire Gator community for an unforgettable evening of celebration.

    **What to Expect:**
    - Live music from student bands and performers
    - Food trucks serving local Gainesville favorites
    - Gator spirit activities and games
    - Photo opportunities with UF mascots
    - Student organization booths and information

    **Schedule:**
    - 6:00 PM: Event begins with opening ceremony
    - 6:30 PM: Food trucks open for service
    - 7:00 PM: Live music performances start
    - 8:00 PM: Gator spirit activities and games
    - 9:30 PM: Closing ceremony and announcements

    **Important Information:**
    - Free admission for all UF students, faculty, and staff
    - Bring your Gator1 ID for entry
    - Outside food and drinks permitted
    - Parking available in nearby campus lots
    - Rain or shine event (covered areas available)

    This is a student-only event. Please bring your .edu email verification or student ID.
  `,
  tags: ["homecoming", "social", "campus", "free"],
  requirements: "UF Student ID required. Outside food and drinks permitted.",
  isRegistered: false,
  isFavorite: false,
  registrationUrl: "https://calendar.ufl.edu/event/homecoming-kickoff",
  isUFEvent: true
}

export default function EventDetail() {
  const router = useRouter()
  const [event, setEvent] = useState(mockEvent)
  const [isRegistering, setIsRegistering] = useState(false)

  const handleRegister = async () => {
    setIsRegistering(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsRegistering(false)
      setEvent(prev => ({ ...prev, isRegistered: true }))
    }, 2000)
  }

  const toggleFavorite = () => {
    setEvent(prev => ({ ...prev, isFavorite: !prev.isFavorite }))
  }

  const getCategoryGradient = (category: string) => {
    switch (category.toLowerCase()) {
      case 'music': return 'from-pink-500 to-violet-500'
      case 'technology': return 'from-indigo-500 to-purple-500'
      case 'academic': return 'from-purple-500 to-pink-500'
      case 'community': return 'from-violet-500 to-indigo-500'
      case 'sports': return 'from-green-500 to-blue-500'
      case 'arts': return 'from-orange-500 to-red-500'
      default: return 'from-indigo-500 to-purple-500'
    }
  }

  return (
    <div>
      <Head>
        <title>{event.title} - Tribzy</title>
        <meta name="description" content={event.description} />
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
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Tribzy</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={toggleFavorite}>
                <Heart className={`h-4 w-4 ${event.isFavorite ? 'text-red-500 fill-current' : ''}`} />
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Event Image */}
                <div className="relative rounded-2xl overflow-hidden">
                  <ImageWithFallback
                    src={event.image}
                    alt={event.title}
                    className="w-full h-96 object-cover"
                  />
                  <Badge className={`absolute top-4 right-4 bg-gradient-to-r ${getCategoryGradient(event.category)} text-white font-medium px-4 py-2 text-sm border-0 shadow-lg`}>
                    {event.category}
                  </Badge>
                  {event.isUFEvent && (
                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-blue-500 text-white font-medium px-4 py-2 text-sm border-0 shadow-lg">
                      🐊 UF Event
                    </Badge>
                  )}
                </div>

                {/* Event Details */}
                <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-3xl mb-2">{event.title}</CardTitle>
                        <div className="flex items-center space-x-4 text-gray-600">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2" />
                            <span>by {event.organizer}</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                            <span>{event.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Event Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3 p-3 bg-indigo-50 rounded-lg">
                        <Calendar className="h-5 w-5 text-indigo-600" />
                        <div>
                          <p className="font-medium text-gray-900">{event.date}</p>
                          <p className="text-sm text-gray-600">Event Date</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                        <Clock className="h-5 w-5 text-purple-600" />
                        <div>
                          <p className="font-medium text-gray-900">{event.time} - {event.endTime}</p>
                          <p className="text-sm text-gray-600">Duration</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                        <MapPin className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium text-gray-900">{event.location}</p>
                          <p className="text-sm text-gray-600">Location</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                        <Users className="h-5 w-5 text-orange-600" />
                        <div>
                          <p className="font-medium text-gray-900">{event.attendees}/{event.maxAttendees}</p>
                          <p className="text-sm text-gray-600">Attendees</p>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="text-xl font-semibold mb-3">About This Event</h3>
                      <div className="prose prose-gray max-w-none">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {event.longDescription}
                        </p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {event.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="px-3 py-1">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Requirements */}
                    {event.requirements && (
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-start space-x-3">
                            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                            <p className="text-gray-700">{event.requirements}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Registration Card */}
                <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm sticky top-24">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          {event.price === 0 ? 'Free' : `$${event.price}`}
                        </p>
                        <p className="text-sm text-gray-600">per person</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Available spots</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {event.maxAttendees - event.attendees}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {event.isRegistered ? (
                      <div className="text-center py-4">
                        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                        <h3 className="text-lg font-semibold text-green-600 mb-2">You're Registered!</h3>
                        <p className="text-gray-600 text-sm">Check your email for confirmation details.</p>
                      </div>
                    ) : (
                      <Button 
                        onClick={() => event.registrationUrl ? window.open(event.registrationUrl, '_blank') : handleRegister()}
                        disabled={isRegistering || event.attendees >= event.maxAttendees}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3"
                      >
                        {isRegistering ? 'Registering...' : (event.registrationUrl ? 'Register on UF Site' : 'Register for Event')}
                      </Button>
                    )}

                    {event.attendees >= event.maxAttendees && !event.isRegistered && (
                      <div className="text-center py-2">
                        <p className="text-red-600 text-sm font-medium">Event is full</p>
                        <p className="text-gray-600 text-xs">Join the waitlist to be notified of cancellations</p>
                      </div>
                    )}

                    <div className="text-center">
                      <Button variant="outline" className="w-full">
                        Add to Calendar
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Organizer Info */}
                <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Organizer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-3 mb-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face" />
                          <AvatarFallback>{event.organizer.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-gray-900">{event.organizer}</p>
                          <p className="text-sm text-gray-600">Verified Organizer</p>
                        </div>
                      </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>{event.organizerEmail}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{event.organizerPhone}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Share Event */}
                <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Share Event</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share on Social Media
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Copy Event Link
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
