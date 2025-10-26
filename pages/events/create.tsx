import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Upload,
  Image as ImageIcon,
  Plus,
  X,
  Save,
  Eye,
  Send,
  Download,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Loader2,
  Globe,
  Link as LinkIcon
} from "lucide-react"

const categories = [
  'Academic',
  'Music',
  'Technology',
  'Sports',
  'Community',
  'Arts',
  'Social',
  'Workshop',
  'Conference',
  'Other'
]

const eventTypes = [
  'In-Person',
  'Virtual',
  'Hybrid'
]

const supportedPlatforms = [
  { name: 'Luma', domain: 'lu.ma', icon: '🎯', color: 'from-blue-500 to-purple-500' },
  { name: 'Eventbrite', domain: 'eventbrite.com', icon: '🎫', color: 'from-red-500 to-orange-500' },
  { name: 'Partiful', domain: 'partiful.com', icon: '🎉', color: 'from-pink-500 to-rose-500' },
  { name: 'Meetup', domain: 'meetup.com', icon: '👥', color: 'from-green-500 to-teal-500' },
  { name: 'Facebook Events', domain: 'facebook.com', icon: '📘', color: 'from-blue-600 to-blue-800' }
]

export default function CreateEvent() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    eventType: '',
    date: '',
    time: '',
    endTime: '',
    location: '',
    virtualLink: '',
    maxAttendees: '',
    price: '',
    isFree: true,
    image: '',
    tags: [] as string[],
    requirements: '',
    contactEmail: '',
    contactPhone: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [newTag, setNewTag] = useState('')
  const [showImportModal, setShowImportModal] = useState(false)
  const [importUrl, setImportUrl] = useState('')
  const [isImporting, setIsImporting] = useState(false)
  const [importError, setImportError] = useState('')
  const [importedData, setImportedData] = useState<any>(null)

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = 'Event title is required'
      if (!formData.description.trim()) newErrors.description = 'Event description is required'
      if (!formData.category) newErrors.category = 'Please select a category'
      if (!formData.eventType) newErrors.eventType = 'Please select an event type'
    }

    if (step === 2) {
      if (!formData.date) newErrors.date = 'Event date is required'
      if (!formData.time) newErrors.time = 'Event time is required'
      if (formData.eventType !== 'Virtual' && !formData.location.trim()) {
        newErrors.location = 'Location is required for in-person events'
      }
      if (formData.eventType === 'Virtual' && !formData.virtualLink.trim()) {
        newErrors.virtualLink = 'Virtual meeting link is required'
      }
    }

    if (step === 3) {
      if (!formData.maxAttendees) newErrors.maxAttendees = 'Maximum attendees is required'
      if (!formData.isFree && !formData.price) newErrors.price = 'Price is required for paid events'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async () => {
    if (!validateStep(3)) return

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push('/dashboard')
    }, 2000)
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const detectPlatform = (url: string) => {
    return supportedPlatforms.find(platform => 
      url.includes(platform.domain)
    )
  }

  const parseEventData = (url: string, platform: any) => {
    // Mock parsing logic - in real implementation, this would call APIs or scrape data
    const mockEventData = {
      title: `Imported Event from ${platform.name}`,
      description: `This event was imported from ${platform.name}. Please review and edit the details below.`,
      category: 'Social',
      eventType: 'In-Person',
      date: '2024-04-15',
      time: '7:00 PM',
      endTime: '9:00 PM',
      location: 'Campus Center',
      maxAttendees: '50',
      price: '0',
      isFree: true,
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop',
      tags: ['imported', platform.name.toLowerCase()],
      requirements: 'Please bring your student ID',
      contactEmail: 'organizer@university.edu',
      contactPhone: '(555) 123-4567'
    }
    return mockEventData
  }

  const handleImportEvent = async () => {
    if (!importUrl.trim()) {
      setImportError('Please enter a valid event URL')
      return
    }

    const platform = detectPlatform(importUrl)
    if (!platform) {
      setImportError('Unsupported platform. Please use Luma, Eventbrite, Partiful, Meetup, or Facebook Events.')
      return
    }

    setIsImporting(true)
    setImportError('')

    // Simulate API call
    setTimeout(() => {
      try {
        const eventData = parseEventData(importUrl, platform)
        setImportedData(eventData)
        setFormData(prev => ({ ...prev, ...eventData }))
        setShowImportModal(false)
        setImportUrl('')
      } catch (error) {
        setImportError('Failed to import event. Please check the URL and try again.')
      } finally {
        setIsImporting(false)
      }
    }, 2000)
  }

  const handleUseImportedData = () => {
    if (importedData) {
      setFormData(prev => ({ ...prev, ...importedData }))
      setImportedData(null)
    }
  }

  const steps = [
    { number: 1, title: 'Basic Info', description: 'Event details and description' },
    { number: 2, title: 'Date & Location', description: 'When and where' },
    { number: 3, title: 'Settings', description: 'Capacity and pricing' }
  ]

  return (
    <div>
      <Head>
        <title>Create Event - Tribzy</title>
        <meta name="description" content="Create a new event on Tribzy" />
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
              <Button 
                variant="outline" 
                className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                onClick={() => setShowImportModal(true)}
              >
                <Download className="h-4 w-4 mr-2" />
                Import Event
              </Button>
              <Button variant="outline" className="border-indigo-200 text-indigo-600 hover:bg-indigo-50">
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button variant="outline" className="border-indigo-200 text-indigo-600 hover:bg-indigo-50">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.number 
                      ? 'bg-indigo-600 border-indigo-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-500'
                  }`}>
                    {step.number}
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.number ? 'text-indigo-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      currentStep > step.number ? 'bg-indigo-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">Basic Information</CardTitle>
                      <p className="text-gray-600">Tell us about your event</p>
                    </div>
                    {importedData && (
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1">
                        <Download className="h-3 w-3 mr-1" />
                        Imported Event
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Import Success Message */}
                  {importedData && (
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        <strong>Event imported successfully!</strong> The form has been pre-filled with data from the imported event. 
                        Please review and modify any details as needed before publishing.
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Event Title */}
                  <div>
                    <Label htmlFor="title">Event Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter your event title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className={errors.title ? 'border-red-500' : ''}
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <Label htmlFor="description">Event Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your event in detail..."
                      rows={6}
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className={errors.description ? 'border-red-500' : ''}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                    )}
                  </div>

                  {/* Category and Event Type */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                        <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="eventType">Event Type *</Label>
                      <Select value={formData.eventType} onValueChange={(value) => handleInputChange('eventType', value)}>
                        <SelectTrigger className={errors.eventType ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          {eventTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.eventType && (
                        <p className="text-red-500 text-sm mt-1">{errors.eventType}</p>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="px-3 py-1">
                          {tag}
                          <button
                            onClick={() => removeTag(tag)}
                            className="ml-2 hover:text-red-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add a tag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTag()}
                      />
                      <Button type="button" onClick={addTag} variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Event Image */}
                  <div>
                    <Label>Event Image</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition-colors">
                      <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Upload an image for your event</p>
                      <Button variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Choose File
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Date & Location */}
            {currentStep === 2 && (
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">Date & Location</CardTitle>
                  <p className="text-gray-600">When and where will your event take place?</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Date and Time */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="date">Event Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        className={errors.date ? 'border-red-500' : ''}
                      />
                      {errors.date && (
                        <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="time">Start Time *</Label>
                      <Input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={(e) => handleInputChange('time', e.target.value)}
                        className={errors.time ? 'border-red-500' : ''}
                      />
                      {errors.time && (
                        <p className="text-red-500 text-sm mt-1">{errors.time}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="endTime">End Time</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={formData.endTime}
                        onChange={(e) => handleInputChange('endTime', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Location */}
                  {formData.eventType !== 'Virtual' && (
                    <div>
                      <Label htmlFor="location">Location *</Label>
                      <Input
                        id="location"
                        placeholder="Enter event location"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className={errors.location ? 'border-red-500' : ''}
                      />
                      {errors.location && (
                        <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                      )}
                    </div>
                  )}

                  {/* Virtual Link */}
                  {formData.eventType === 'Virtual' && (
                    <div>
                      <Label htmlFor="virtualLink">Virtual Meeting Link *</Label>
                      <Input
                        id="virtualLink"
                        placeholder="https://zoom.us/j/..."
                        value={formData.virtualLink}
                        onChange={(e) => handleInputChange('virtualLink', e.target.value)}
                        className={errors.virtualLink ? 'border-red-500' : ''}
                      />
                      {errors.virtualLink && (
                        <p className="text-red-500 text-sm mt-1">{errors.virtualLink}</p>
                      )}
                    </div>
                  )}

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="contactEmail">Contact Email</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        placeholder="contact@example.edu"
                        value={formData.contactEmail}
                        onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="contactPhone">Contact Phone</Label>
                      <Input
                        id="contactPhone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={formData.contactPhone}
                        onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Requirements */}
                  <div>
                    <Label htmlFor="requirements">Special Requirements</Label>
                    <Textarea
                      id="requirements"
                      placeholder="Any special requirements or instructions for attendees..."
                      rows={3}
                      value={formData.requirements}
                      onChange={(e) => handleInputChange('requirements', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Settings */}
            {currentStep === 3 && (
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">Event Settings</CardTitle>
                  <p className="text-gray-600">Set capacity, pricing, and other options</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Capacity */}
                  <div>
                    <Label htmlFor="maxAttendees">Maximum Attendees *</Label>
                    <Input
                      id="maxAttendees"
                      type="number"
                      placeholder="100"
                      value={formData.maxAttendees}
                      onChange={(e) => handleInputChange('maxAttendees', e.target.value)}
                      className={errors.maxAttendees ? 'border-red-500' : ''}
                    />
                    {errors.maxAttendees && (
                      <p className="text-red-500 text-sm mt-1">{errors.maxAttendees}</p>
                    )}
                  </div>

                  {/* Pricing */}
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <Switch
                        checked={formData.isFree}
                        onCheckedChange={(checked) => handleInputChange('isFree', checked)}
                      />
                      <Label>Free Event</Label>
                    </div>

                    {!formData.isFree && (
                      <div>
                        <Label htmlFor="price">Price per Ticket ($) *</Label>
                        <Input
                          id="price"
                          type="number"
                          placeholder="25.00"
                          value={formData.price}
                          onChange={(e) => handleInputChange('price', e.target.value)}
                          className={errors.price ? 'border-red-500' : ''}
                        />
                        {errors.price && (
                          <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Additional Options */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Additional Options</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Require Registration</Label>
                          <p className="text-sm text-gray-600">Attendees must register to attend</p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Allow Waitlist</Label>
                          <p className="text-sm text-gray-600">Add attendees to waitlist when full</p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Send Reminders</Label>
                          <p className="text-sm text-gray-600">Send email reminders to attendees</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                Previous
              </Button>

              <div className="flex space-x-2">
                {currentStep < 3 ? (
                  <Button
                    onClick={handleNext}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                  >
                    {isLoading ? 'Creating Event...' : 'Create Event'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Import Event Modal */}
        {showImportModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="h-5 w-5 mr-2 text-indigo-600" />
                  Import Event
                </CardTitle>
                <p className="text-gray-600 text-sm">
                  Import an event from supported platforms
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Supported Platforms */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Supported Platforms
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {supportedPlatforms.map((platform) => (
                      <div
                        key={platform.name}
                        className={`flex items-center space-x-2 p-2 rounded-lg bg-gradient-to-r ${platform.color} text-white text-sm`}
                      >
                        <span className="text-lg">{platform.icon}</span>
                        <span className="font-medium">{platform.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* URL Input */}
                <div>
                  <Label htmlFor="importUrl">Event URL</Label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="importUrl"
                      placeholder="https://lu.ma/event/..."
                      value={importUrl}
                      onChange={(e) => setImportUrl(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Error Message */}
                {importError && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-600">
                      {importError}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Import Preview */}
                {importedData && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">
                        Event imported successfully!
                      </span>
                    </div>
                    <p className="text-sm text-green-700">
                      "{importedData.title}" has been imported. Review the details below and make any necessary changes.
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowImportModal(false)
                      setImportUrl('')
                      setImportError('')
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleImportEvent}
                    disabled={isImporting || !importUrl.trim()}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                  >
                    {isImporting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Importing...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Import Event
                      </>
                    )}
                  </Button>
                </div>

                {/* Help Text */}
                <div className="text-xs text-gray-500 text-center">
                  <p>Paste the full URL of the event you want to import.</p>
                  <p className="mt-1">
                    <ExternalLink className="h-3 w-3 inline mr-1" />
                    We'll automatically extract the event details for you.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
