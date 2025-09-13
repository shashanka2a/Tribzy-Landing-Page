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
    color: "bg-gradient-to-r from-blue-500 to-purple-500"
  },
  {
    icon: Shield,
    title: "Student-Only Access",
    description: "Safe, verified community - only students with .edu emails can join",
    color: "bg-gradient-to-r from-pink-500 to-red-500"
  },
  {
    icon: Zap,
    title: "Host with .edu Email",
    description: "Create and promote your events to reach students across campus",
    color: "bg-gradient-to-r from-green-500 to-emerald-500"
  }
]

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [email, setEmail] = useState("")

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'party': return 'bg-gradient-to-r from-pink-500 to-red-500'
      case 'tech': return 'bg-gradient-to-r from-blue-500 to-purple-500'
      case 'club': return 'bg-gradient-to-r from-green-500 to-emerald-500'
      case 'community': return 'bg-gradient-to-r from-orange-500 to-yellow-500'
      default: return 'bg-gradient-to-r from-blue-500 to-purple-500'
    }
  }

  return (
    <div>
      <Head>
        <title>Tribzy - Your Campus Events, All in One Place</title>
        <meta name="description" content="Discover parties, study groups, club meetings, and more. Connect with your campus community through verified student-only events." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen bg-white">
        <h1>Welcome to Tribzy</h1>
      </div>
    </div>
  )
}