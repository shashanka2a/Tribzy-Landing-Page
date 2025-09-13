import React, { useState } from 'react'
import Head from 'next/head'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ImageWithFallback } from "@/components/figma/ImageWithFallback"
import { 
  Calendar, 
  MapPin, 
  Users, 
  ArrowRight,
  Menu,
  X,
  Shield,
  Search,
  Zap,
  GraduationCap,
  PartyPopper,
  Code,
  Users2,
  Heart,
  Sparkles,
  Star,
  Instagram,
  MessageCircle,
  Music
} from "lucide-react"

// Campus events with professional styling
const featuredEvents = [
  {
    id: 1,
    title: "Spring Campus Concert",
    date: "Mar 15",
    location: "Campus Amphitheater",
    attendees: 342,
    category: "Music",
    image: "https://images.unsplash.com/photo-1757143090778-311db757078d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTc3NTg2NzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 2,
    title: "AI & Machine Learning Workshop",
    date: "Mar 20",
    location: "Tech Innovation Hub",
    attendees: 89,
    category: "Technology",
    image: "https://images.unsplash.com/photo-1646579886135-068c73800308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTc3NTg2NzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 3,
    title: "Creative Writing Club",
    date: "Mar 18",
    location: "Library Study Room 3",
    attendees: 32,
    category: "Academic",
    image: "https://images.unsplash.com/photo-1753546466496-d2d8a819f61a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTc2NjUyNzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 4,
    title: "Community Service Day",
    date: "Mar 22",
    location: "Local Community Center",
    attendees: 67,
    category: "Community",
    image: "https://images.unsplash.com/photo-1743793174491-bcbdf1882ad5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTc3NTg2NzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
]

const keyFeatures = [
  {
    icon: Search,
    title: "Discover Campus Events",
    description: "Find study groups, parties, workshops, and more happening at your school",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    icon: Shield,
    title: "Student-Only Access",
    description: "Safe, verified community - only students with .edu emails can join",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Zap,
    title: "Host & Promote Events",
    description: "Create and share your events to reach students across campus",
    gradient: "from-pink-500 to-violet-500"
  }
]

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [email, setEmail] = useState("")

  const getCategoryGradient = (category: string) => {
    switch (category.toLowerCase()) {
      case 'music': return 'from-pink-500 to-violet-500'
      case 'technology': return 'from-indigo-500 to-purple-500'
      case 'academic': return 'from-purple-500 to-pink-500'
      case 'community': return 'from-violet-500 to-indigo-500'
      default: return 'from-indigo-500 to-purple-500'
    }
  }

  return (
    <div>
      <Head>
        <title>Tribzy - Campus Events Platform</title>
        <meta name="description" content="Discover and host campus events. Connect with your college community through verified student-only access." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/50 to-purple-50/50">
        {/* Header - Luma inspired */}
        <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/80 backdrop-blur-xl">
          <div className="container mx-auto flex h-16 items-center justify-between px-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Tribzy</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-600 hover:text-indigo-600 hover:bg-indigo-50">
                Events
              </Button>
              <Button variant="ghost" className="text-gray-600 hover:text-indigo-600 hover:bg-indigo-50">
                About
              </Button>
              <Button variant="outline" className="border-indigo-200 text-indigo-600 hover:bg-indigo-50">
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg">
                Get Started
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-indigo-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-white/20 bg-white/95 backdrop-blur-xl">
              <nav className="container mx-auto px-6 py-4 space-y-2">
                <Button variant="ghost" className="w-full justify-start text-gray-600">Events</Button>
                <Button variant="ghost" className="w-full justify-start text-gray-600">About</Button>
                <Button variant="outline" className="w-full border-indigo-200 text-indigo-600">Sign In</Button>
                <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  Get Started
                </Button>
              </nav>
            </div>
          )}
        </header>

        {/* Hero Section - Luma inspired with light gradients */}
        <section className="relative overflow-hidden">
          {/* Background Gradients */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-pink-200/30 to-violet-200/30 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-100/20 to-indigo-100/20 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-6 py-20 md:py-28 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-8 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 text-sm font-medium border-0 shadow-lg">
                🎓 Verified Student Community
              </Badge>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                Your Campus Events,
                <br />
                All in One Place
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                Discover workshops, parties, study groups, and community events. Connect with fellow students through our secure, .edu-verified platform.
              </p>

              {/* Email Signup - Clean Luma style */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl max-w-md mx-auto mb-12 border border-white/30">
                <div className="flex items-center justify-center mb-6">
                  <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl mr-3">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-lg font-semibold text-gray-800">Join with .edu email</span>
                </div>
                <div className="space-y-4">
                  <Input
                    type="email"
                    placeholder="your.name@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-center py-3 border-gray-200 focus:border-indigo-400 focus:ring-indigo-400/20 bg-white/80"
                  />
                  <Button 
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 shadow-xl"
                  >
                    Join Tribzy
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-4">Only verified .edu emails accepted</p>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap justify-center items-center gap-6 text-gray-600">
                <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/40">
                  <Users className="h-5 w-5 text-indigo-600" />
                  <span className="font-medium">500+ events monthly</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/40">
                  <Shield className="h-5 w-5 text-purple-600" />
                  <span className="font-medium">Student verified</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/40">
                  <Heart className="h-5 w-5 text-pink-600" />
                  <span className="font-medium">Campus community</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Combined Features Section */}
        <section className="py-20 bg-gradient-to-b from-white/50 to-indigo-50/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-6 font-bold text-gray-900">
                Why Tribzy over Eventbrite or Luma?
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 font-medium">
                Because it's built for students, not promoters.
              </p>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Everything you need for authentic campus experiences
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Verified College-Only Events */}
              <Card className="text-center p-8 hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm group">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Verified College-Only Events
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Hosted by .edu verified students—no random promoters or commercial spam cluttering your feed
                  </p>
                </CardContent>
              </Card>

              {/* Dedicated Campus Calendar */}
              <Card className="text-center p-8 hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm group">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Calendar className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Dedicated Campus Calendar
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Curated specifically for your school—see what's actually happening on your campus
                  </p>
                </CardContent>
              </Card>

              {/* Noise-Free, Student-First */}
              <Card className="text-center p-8 hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm group">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Noise-Free, Student-First
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    No random commercial events—just authentic campus experiences by and for students
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-10 py-4 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Discover Campus Events
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </div>
          </div>
        </section>

        {/* Events Grid - Luma inspired */}
        <section className="py-20 bg-white/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-6 font-bold text-gray-900">
                This Week's Events
              </h2>
              <p className="text-gray-600 text-xl">
                See what's happening on campus
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredEvents.map((event) => (
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
                  </div>
                  <CardHeader className="p-5">
                    <CardTitle className="text-lg mb-3 font-bold line-clamp-2">
                      {event.title}
                    </CardTitle>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 bg-indigo-50 px-3 py-1 rounded-full">
                          <Calendar className="h-4 w-4 text-indigo-600" />
                          <span className="text-sm font-medium text-indigo-700">{event.date}</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-purple-50 px-3 py-1 rounded-full">
                          <Users className="h-4 w-4 text-purple-600" />
                          <span className="text-sm font-medium text-purple-700">{event.attendees}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button variant="outline" className="border-indigo-300 text-indigo-600 hover:bg-indigo-50 px-8 py-3 shadow-lg">
                View All Events
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>


        {/* Footer */}
        <footer className="bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 border-t border-indigo-100 py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              {/* Brand */}
              <div className="md:col-span-1">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl shadow-lg">
                    <span className="text-white font-bold text-xl">T</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-800">Tribzy</span>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Connecting college communities through amazing campus events.
                </p>
              </div>

              {/* Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Platform</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Events</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Create Event</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Campus Guide</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Company</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">About</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Blog</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Careers</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Support</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Help Center</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Contact</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Privacy</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-indigo-200 pt-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <p className="text-gray-500 mb-4 md:mb-0">
                  © 2024 Tribzy. Connecting college communities.
                </p>
                <div className="flex space-x-6">
                  <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">
                    <MessageCircle className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-pink-600 transition-colors">
                    <Music className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}