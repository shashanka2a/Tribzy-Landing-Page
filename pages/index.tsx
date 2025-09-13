"use client"

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
  Heart
} from "lucide-react"
import { useState } from "react"

// Simplified event data for MVP
const featuredEvents = [
  {
    id: 1,
    title: "Spring Campus Concert",
    date: "Mar 15",
    location: "Campus Amphitheater",
    attendees: 342,
    category: "Party",
    image: "https://images.unsplash.com/photo-1757143090778-311db757078d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTc3NTg2NzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 2,
    title: "AI Workshop",
    date: "Mar 20",
    location: "Tech Hall",
    attendees: 89,
    category: "Tech",
    image: "https://images.unsplash.com/photo-1646579886135-068c73800308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTc3NTg2NzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 3,
    title: "Writing Club",
    date: "Mar 18",
    location: "Library",
    attendees: 32,
    category: "Club",
    image: "https://images.unsplash.com/photo-1753546466496-d2d8a819f61a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTc2NjUyNzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 4,
    title: "Community Service",
    date: "Mar 22",
    location: "Downtown",
    attendees: 45,
    category: "Community",
    image: "https://images.unsplash.com/photo-1743793174491-bcbdf1882ad5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTc3NTg2NzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
]

const keyFeatures = [
  {
    icon: Search,
    title: "Discover Campus Events",
    description: "Find parties, study groups, club meetings, and more happening at your school",
    color: "bg-[#14b8a6]"
  },
  {
    icon: Shield,
    title: "Student-Only Access",
    description: "Safe, verified community - only students with .edu emails can join",
    color: "bg-[#f97316]"
  },
  {
    icon: Zap,
    title: "Host with .edu Email",
    description: "Create and promote your events to reach students across campus",
    color: "bg-[#84cc16]"
  }
]

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [email, setEmail] = useState("")

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'party': return 'bg-[#f97316]'
      case 'tech': return 'bg-[#84cc16]'
      case 'club': return 'bg-[#14b8a6]'
      case 'community': return 'bg-[#f97316]'
      default: return 'bg-[#14b8a6]'
    }
  }

  return (
    <>
      <Head>
        <title>Tribzy - Your Campus Events, All in One Place</title>
        <meta name="description" content="Discover parties, study groups, club meetings, and more. Connect with your campus community through verified student-only events." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen bg-[#fdfcf8]">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur">
          <div className="container mx-auto flex h-16 items-center justify-between px-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-9 h-9 bg-gradient-to-br from-[#14b8a6] to-[#0d9488] rounded-xl">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-2xl font-bold tracking-tight" style={{fontFamily: 'Space Grotesk'}}>Tribzy</span>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-6">
              <Button variant="outline" size="sm" className="border-gray-300 hover:border-[#14b8a6] hover:text-[#14b8a6]">
                Sign In
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-[#14b8a6] to-[#0d9488] hover:from-[#0d9488] hover:to-[#0f766e] text-white font-semibold">
                Get Started
              </Button>
            </nav>

            {/* Mobile Menu */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden border-t bg-white">
              <nav className="container mx-auto px-6 py-4 space-y-3">
                <Button variant="outline" size="sm" className="w-full">Sign In</Button>
                <Button size="sm" className="w-full bg-gradient-to-r from-[#14b8a6] to-[#0d9488]">
                  Get Started
                </Button>
              </nav>
            </div>
          )}
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#fdfcf8] via-emerald-50 to-orange-50">
          <div className="container mx-auto px-6 py-20 md:py-28">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-gradient-to-r from-[#14b8a6] to-[#0d9488] text-white px-4 py-2 font-semibold">
                🎓 College Students Only
              </Badge>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-[#14b8a6] via-[#f97316] to-[#84cc16] bg-clip-text text-transparent leading-tight tracking-tight" style={{fontFamily: 'Space Grotesk'}}>
                Your Campus Events, All in One Place
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                Discover parties, study groups, club meetings, and more. Connect with your campus community through verified student-only events.
              </p>

              {/* .edu Email Signup */}
              <div className="bg-white rounded-2xl p-8 shadow-xl max-w-md mx-auto mb-8">
                <div className="flex items-center justify-center mb-4">
                  <GraduationCap className="h-8 w-8 text-[#14b8a6] mr-3" />
                  <span className="font-semibold text-gray-800">Sign up with your .edu email</span>
                </div>
                <div className="flex flex-col space-y-3">
                  <Input
                    type="email"
                    placeholder="your.name@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-center text-lg py-3 rounded-xl border-2 border-gray-200 focus:border-[#14b8a6]"
                  />
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-[#14b8a6] to-[#0d9488] hover:from-[#0d9488] hover:to-[#0f766e] text-white font-semibold py-3 rounded-xl shadow-lg shadow-[#14b8a6]/25"
                  >
                    Join Tribzy
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-3">Only verified .edu email addresses accepted</p>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-6 text-gray-600">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-[#14b8a6]" />
                  <span className="font-medium">500+ events monthly</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-[#f97316]" />
                  <span className="font-medium">Student-verified</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-6 text-gray-900" style={{fontFamily: 'Space Grotesk'}}>
                Campus Events Made Simple
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Everything you need to discover and create amazing campus experiences
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {keyFeatures.map((feature) => (
                <Card key={feature.title} className="text-center p-8 hover:shadow-xl transition-all duration-300 border-0 shadow-lg rounded-3xl">
                  <CardContent className="p-0">
                    <div className={`w-16 h-16 ${feature.color} rounded-2xl mx-auto mb-6 flex items-center justify-center`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl mb-4 font-semibold text-gray-900" style={{fontFamily: 'Space Grotesk'}}>
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Event Preview Grid */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-6 text-gray-900" style={{fontFamily: 'Space Grotesk'}}>
                Happening This Week
              </h2>
              <p className="text-gray-600 text-lg">
                See what's trending on campus right now
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredEvents.map((event) => (
                <Card key={event.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-lg rounded-2xl">
                  <div className="relative">
                    <ImageWithFallback
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className={`absolute top-3 right-3 ${getCategoryColor(event.category)} text-white font-semibold px-2 py-1`}>
                      {event.category}
                    </Badge>
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg mb-2" style={{fontFamily: 'Space Grotesk'}}>
                      {event.title}
                    </CardTitle>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{event.attendees}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button size="lg" variant="outline" className="border-2 border-[#14b8a6] text-[#14b8a6] hover:bg-[#14b8a6] hover:text-white font-semibold px-8 py-3 rounded-xl">
                View All Events
              </Button>
            </div>
          </div>
        </section>

        {/* Organizer Signup */}
        <section className="py-20 bg-gradient-to-br from-[#14b8a6] to-[#0d9488] text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl mb-8 font-bold" style={{fontFamily: 'Space Grotesk'}}>
                Ready to Host Your Event?
              </h2>
              <p className="text-xl mb-8 text-teal-100 max-w-2xl mx-auto leading-relaxed">
                Create events that reach your entire campus community. All you need is a .edu email address.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <PartyPopper className="h-12 w-12 mx-auto mb-4 text-[#f97316]" />
                  <h3 className="text-xl mb-3 font-semibold" style={{fontFamily: 'Space Grotesk'}}>Any Type of Event</h3>
                  <p className="text-teal-100">Parties, study groups, club meetings, sports, and more</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <Users2 className="h-12 w-12 mx-auto mb-4 text-[#84cc16]" />
                  <h3 className="text-xl mb-3 font-semibold" style={{fontFamily: 'Space Grotesk'}}>Reach Students</h3>
                  <p className="text-teal-100">Get discovered by thousands of students on your campus</p>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
                <div className="flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-white mr-2" />
                  <span className="font-semibold">Host with your .edu email</span>
                </div>
                <div className="flex flex-col space-y-3">
                  <Input 
                    placeholder="organizer@university.edu"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30 rounded-xl py-3 text-center"
                  />
                  <Button size="lg" className="bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold py-3 rounded-xl shadow-lg">
                    Start Creating Events
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-3 mb-6 md:mb-0">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#14b8a6] to-[#0d9488] rounded-xl">
                  <span className="text-white font-bold text-xl">T</span>
                </div>
                <span className="text-2xl font-bold" style={{fontFamily: 'Space Grotesk'}}>Tribzy</span>
              </div>
              
              <div className="flex space-x-8 text-gray-400">
                <a href="#" className="hover:text-[#14b8a6] transition-colors">Privacy</a>
                <a href="#" className="hover:text-[#14b8a6] transition-colors">Terms</a>
                <a href="#" className="hover:text-[#14b8a6] transition-colors">Contact</a>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 Tribzy. Connecting college communities.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
