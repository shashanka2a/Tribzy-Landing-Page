import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Plus,
  Calendar,
  Users,
  MapPin,
  Settings,
  Bell,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Share2,
  TrendingUp,
  Clock,
  DollarSign,
  Star
} from "lucide-react"

// Mock data for events
const mockEvents = [
  {
    id: 1,
    title: "Spring Campus Concert",
    date: "2024-03-15",
    time: "7:00 PM",
    location: "Campus Amphitheater",
    attendees: 342,
    maxAttendees: 500,
    status: "published",
    category: "Music",
    price: 0,
    image: "https://images.unsplash.com/photo-1757143090778-311db757078d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTc3NTg2NzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 2,
    title: "AI & Machine Learning Workshop",
    date: "2024-03-20",
    time: "2:00 PM",
    location: "Tech Innovation Hub",
    attendees: 89,
    maxAttendees: 100,
    status: "published",
    category: "Technology",
    price: 15,
    image: "https://images.unsplash.com/photo-1646579886135-068c73800308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTc3NTg2NzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 3,
    title: "Creative Writing Club Meeting",
    date: "2024-03-18",
    time: "6:00 PM",
    location: "Library Study Room 3",
    attendees: 32,
    maxAttendees: 40,
    status: "draft",
    category: "Academic",
    price: 0,
    image: "https://images.unsplash.com/photo-1753546466496-d2d8a819f61a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTc2NjUyNzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
]

const stats = [
  { label: "Total Events", value: "12", change: "+3 this month", trend: "up" },
  { label: "Total Attendees", value: "1,247", change: "+156 this month", trend: "up" },
  { label: "Revenue", value: "$2,340", change: "+$890 this month", trend: "up" },
  { label: "Avg. Rating", value: "4.8", change: "+0.2 this month", trend: "up" }
]

export default function Dashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
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
        <title>Dashboard - Tribzy</title>
        <meta name="description" content="Manage your events on Tribzy" />
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
              <Button variant="ghost" size="sm">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John!</h1>
            <p className="text-gray-600">Here's what's happening with your events</p>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => router.push('/events/create')}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
              <Button 
                variant="outline" 
                className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                onClick={() => router.push('/events/calendar')}
              >
                <Calendar className="h-4 w-4 mr-2" />
                View Calendar
              </Button>
              <Button variant="outline" className="border-indigo-200 text-indigo-600 hover:bg-indigo-50">
                <Users className="h-4 w-4 mr-2" />
                Manage Attendees
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="flex space-x-1 bg-white/60 backdrop-blur-sm rounded-lg p-1 w-fit">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'overview' 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('events')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'events' 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                My Events
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'analytics' 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Analytics
              </button>
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Events */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Recent Events</span>
                      <Button variant="ghost" size="sm">
                        View All
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockEvents.slice(0, 3).map((event) => (
                        <div key={event.id} className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200">
                            <img 
                              src={event.image} 
                              alt={event.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 truncate">{event.title}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {event.date}
                              </div>
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                {event.attendees}/{event.maxAttendees}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(event.status)}>
                              {event.status}
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Stats */}
              <div>
                <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>This Week</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Users className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">New Attendees</p>
                            <p className="text-sm text-gray-600">This week</p>
                          </div>
                        </div>
                        <span className="text-lg font-bold text-green-600">+47</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Calendar className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Events Created</p>
                            <p className="text-sm text-gray-600">This week</p>
                          </div>
                        </div>
                        <span className="text-lg font-bold text-blue-600">2</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <DollarSign className="h-4 w-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Revenue</p>
                            <p className="text-sm text-gray-600">This week</p>
                          </div>
                        </div>
                        <span className="text-lg font-bold text-purple-600">$340</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="space-y-6">
              {/* Events Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockEvents.map((event) => (
                  <Card key={event.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 bg-white/90 backdrop-blur-sm">
                    <div className="relative">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className={`absolute top-3 right-3 bg-gradient-to-r ${getCategoryColor(event.category)} text-white font-medium px-3 py-1 text-xs border-0 shadow-lg`}>
                        {event.category}
                      </Badge>
                      <Badge className={`absolute top-3 left-3 ${getStatusColor(event.status)}`}>
                        {event.status}
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
                          <div className="flex items-center space-x-2 text-gray-600">
                            <DollarSign className="h-4 w-4 text-gray-400" />
                            <span className="text-sm font-medium">{event.price === 0 ? 'Free' : `$${event.price}`}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-5 pt-0">
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Event Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                      <TrendingUp className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Coming Soon</h3>
                    <p className="text-gray-600">Detailed insights and analytics will be available soon.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
