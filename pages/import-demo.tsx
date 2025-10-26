import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft,
  Download,
  ExternalLink,
  CheckCircle,
  Globe,
  Link as LinkIcon
} from "lucide-react"

const demoUrls = [
  {
    platform: 'Luma',
    url: 'https://lu.ma/campus-tech-talk',
    description: 'Tech Talk: AI in Education',
    color: 'from-blue-500 to-purple-500',
    icon: '🎯'
  },
  {
    platform: 'Eventbrite',
    url: 'https://www.eventbrite.com/e/spring-concert-2024',
    description: 'Spring Campus Concert',
    color: 'from-red-500 to-orange-500',
    icon: '🎫'
  },
  {
    platform: 'Partiful',
    url: 'https://partiful.com/e/study-group-meetup',
    description: 'Study Group Meetup',
    color: 'from-pink-500 to-rose-500',
    icon: '🎉'
  }
]

export default function ImportDemo() {
  const router = useRouter()
  const [selectedUrl, setSelectedUrl] = useState('')

  return (
    <div>
      <Head>
        <title>Event Import Demo - Tribzy</title>
        <meta name="description" content="Demo of event import feature" />
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
          </div>
        </header>

        <div className="container mx-auto px-6 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Download className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Event Import Feature</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Easily import events from popular platforms like Luma, Eventbrite, and Partiful 
                to save time and avoid manual data entry.
              </p>
            </div>

            {/* How it Works */}
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-center">How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">1</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Paste Event URL</h3>
                    <p className="text-gray-600 text-sm">
                      Copy the event URL from any supported platform and paste it into our import tool.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">2</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Auto-Extract Data</h3>
                    <p className="text-gray-600 text-sm">
                      We automatically extract event details like title, description, date, and location.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-violet-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">3</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Review & Publish</h3>
                    <p className="text-gray-600 text-sm">
                      Review the imported data, make any necessary changes, and publish to Tribzy.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Supported Platforms */}
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Supported Platforms</CardTitle>
                <p className="text-gray-600 text-center">
                  Import events from these popular event platforms
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {demoUrls.map((demo, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg bg-gradient-to-r ${demo.color} text-white cursor-pointer hover:scale-105 transition-transform`}
                      onClick={() => setSelectedUrl(demo.url)}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">{demo.icon}</span>
                        <span className="font-semibold">{demo.platform}</span>
                      </div>
                      <p className="text-sm opacity-90">{demo.description}</p>
                      <div className="flex items-center mt-2 text-xs opacity-75">
                        <LinkIcon className="h-3 w-3 mr-1" />
                        <span className="truncate">{demo.url}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Demo Section */}
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Try It Out</CardTitle>
                <p className="text-gray-600 text-center">
                  Click "Import Event" in the event creation flow to see this feature in action
                </p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Example URLs you can try:</p>
                    <div className="space-y-2 text-left">
                      {demoUrls.map((demo, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <span className="text-lg">{demo.icon}</span>
                          <code className="bg-white px-2 py-1 rounded text-xs">{demo.url}</code>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => router.push('/events/create')}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Try Import Feature
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Why Use Event Import?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Save Time</h3>
                      <p className="text-gray-600 text-sm">
                        No more manual data entry. Import events in seconds instead of minutes.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Reduce Errors</h3>
                      <p className="text-gray-600 text-sm">
                        Automatic data extraction eliminates typos and missing information.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Cross-Platform</h3>
                      <p className="text-gray-600 text-sm">
                        Import from multiple platforms and consolidate your events in one place.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Easy Migration</h3>
                      <p className="text-gray-600 text-sm">
                        Move your existing events to Tribzy without starting from scratch.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
