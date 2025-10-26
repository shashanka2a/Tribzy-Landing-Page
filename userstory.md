# 🎯 Tribzy App Flow & User Story

## 📱 Complete User Journey

This document walks through the entire Tribzy application flow, showing how all components work together to create a complete event management platform for UF Gainesville.

---

## 🚀 Tribzy Complete User Story

### 1. 🏠 Landing Page Experience (`/`)

**User Story**: *"As a UF student, I want to discover what Tribzy offers so I can decide if I want to join the platform."*

**What happens**:
- **Beautiful hero section** with gradient backgrounds
- **Clear value proposition**: "Discover Campus Events Like Never Before"
- **Navigation bar** with Events, About, Sign In, Get Started
- **Feature highlights**: Event Discovery, Easy Registration, Campus Community
- **Call-to-action**: "Join Tribzy" and "Discover Campus Events" buttons

**User Actions**:
- Click "Get Started" → Goes to `/auth/signup`
- Click "Events" → Goes to `/events` 
- Click "Discover Campus Events" → Goes to `/events`

---

### 2. 🔐 Authentication Flow

#### A. Sign Up (`/auth/signup`)

**User Story**: *"As a new user, I want to create an account with my .edu email so I can access campus events."*

**What happens**:
- **Clean signup form** with .edu email validation
- **Password requirements** clearly displayed
- **Terms and conditions** checkbox
- **"Sign Up" button** with loading state

**User Actions**:
- Enter .edu email (e.g., `student@ufl.edu`)
- Create secure password
- Check terms agreement
- Click "Sign Up" → Redirects to `/auth/verify-otp`

#### B. OTP Verification (`/auth/verify-otp`)

**User Story**: *"As a new user, I want to verify my email address so I can complete my account setup."*

**What happens**:
- **OTP input fields** (6-digit code)
- **Resend code** functionality
- **Timer countdown** for resend
- **Verification success** message

**User Actions**:
- Enter 6-digit OTP from email
- Click "Verify Email" → Redirects to `/dashboard`

#### C. Sign In (`/auth/signin`)

**User Story**: *"As a returning user, I want to sign in quickly so I can access my dashboard and events."*

**What happens**:
- **Email and password** fields
- **Remember me** option
- **Forgot password** link
- **"Sign In" button**

**User Actions**:
- Enter credentials
- Click "Sign In" → Redirects to `/dashboard`

---

### 3. 📊 Organizer Dashboard (`/dashboard`)

**User Story**: *"As an event organizer, I want to see my event management overview so I can track my events and attendees."*

**What happens**:
- **Welcome message** with user's name
- **Quick stats**: Total Events, Total Attendees, Upcoming Events
- **Recent events** with attendee counts
- **Action buttons**: Create Event, View Calendar, Manage Attendees

**User Actions**:
- Click "Create Event" → Goes to `/events/create`
- Click "View Calendar" → Goes to `/events/calendar`
- Click on event → Goes to event detail page

---

### 4. 🎉 Event Discovery Experience

#### A. Events List View (`/events`)

**User Story**: *"As a student, I want to browse UF Gainesville events so I can find activities I'm interested in."*

**What happens**:
- **Page header**: "UF Gainesville Events" with UF badge
- **Search bar** for event titles
- **Category filters**: All, Academic, Sports, Social, Cultural, Food, etc.
- **Sort options**: Date, Popularity, Rating
- **View toggle**: Grid/List view
- **Event cards** with:
  - Event images and titles
  - UF Event badges (🐊)
  - Date, time, location
  - Category badges with colors
  - Attendee counts and ratings
  - "Register Now" buttons

**User Actions**:
- **Search** for specific events
- **Filter** by category
- **Sort** by preference
- **Click event** → Goes to `/events/[id]`
- **Click "Register Now"** → Opens external UF registration site
- **Click "Calendar View"** → Goes to `/events/calendar`

#### B. Event Detail Page (`/events/[id]`)

**User Story**: *"As a student, I want to see detailed event information so I can decide whether to register."*

**What happens**:
- **Large event image** with UF badge overlay
- **Event title** and organizer information
- **Detailed description** with formatting
- **Event details**: Date, time, location, price
- **Attendee information** and capacity
- **Requirements** and important notes
- **Registration button**: "Register on UF Site" (external link)
- **Share and favorite** buttons

**User Actions**:
- **Click "Register on UF Site"** → Opens official UF registration
- **Add to favorites** (heart button)
- **Share event** with others
- **Navigate back** to events list

#### C. Calendar View (`/events/calendar`)

**User Story**: *"As a student, I want to see events in a calendar format so I can plan my schedule visually."*

**What happens**:
- **Full calendar grid** with month navigation
- **Event indicators** on calendar days
- **Color-coded events** by category
- **Event count badges** on busy days
- **Selected date panel** showing events for that day
- **Upcoming events** sidebar
- **Quick actions** panel

**User Actions**:
- **Click calendar days** → Shows events for that date
- **Navigate months** with prev/next buttons
- **Click "Today"** → Jumps to current date
- **Register for events** from selected date panel
- **Switch to List View** → Goes to `/events`

---

### 5. 🎨 Event Creation Flow (`/events/create`)

**User Story**: *"As an event organizer, I want to create events easily so I can promote my campus activities."*

**What happens**:
- **Multi-step form** with progress indicator
- **Step 1**: Basic Information (title, description, category)
- **Step 2**: Date & Time (start/end, timezone)
- **Step 3**: Location (venue, address, virtual options)
- **Step 4**: Pricing & Capacity (free/paid, attendee limits)
- **Step 5**: Additional Details (requirements, tags)
- **Step 6**: Review & Publish

**Special Features**:
- **Import Event** button → Opens import modal
- **Supported platforms**: Luma, Eventbrite, Partiful, Meetup, Facebook Events
- **URL input** for event import
- **Auto-fill** imported event data
- **Form validation** at each step

**User Actions**:
- **Fill out form** step by step
- **Click "Import Event"** → Opens import modal
- **Paste event URL** → Auto-fills form data
- **Review and publish** → Event goes live

---

### 6. 📥 Event Import Feature

**User Story**: *"As an organizer, I want to import events from other platforms so I can easily migrate my existing events."*

**What happens**:
- **Import modal** with supported platforms
- **Platform cards** showing Luma, Eventbrite, Partiful, etc.
- **URL input field** with validation
- **Error handling** for invalid URLs
- **Success preview** of imported data
- **Auto-population** of event creation form

**User Actions**:
- **Click "Import Event"** → Opens modal
- **Select platform** (visual cards)
- **Paste event URL** → Validates and imports
- **Review imported data** → Confirms import
- **Use imported data** → Pre-fills creation form

---

### 7. 🎯 Import Demo Page (`/import-demo`)

**User Story**: *"As a user, I want to see how event import works so I can understand the feature."*

**What happens**:
- **Feature showcase** with platform logos
- **Benefits explanation** (time-saving, accuracy)
- **Supported platforms** grid
- **"Try it out"** button → Goes to event creation

---

### 8. 🔧 Technical Features

#### A. Responsive Design
- **Mobile-optimized** layouts for all pages
- **Touch-friendly** buttons and interactions
- **Adaptive navigation** for different screen sizes
- **Calendar view** adjusts for mobile/desktop

#### B. UF Integration
- **Official UF events** with special badges
- **External registration links** to UF systems
- **UF branding** and color schemes
- **Campus-specific** event data

#### C. User Experience
- **Loading states** for all actions
- **Error handling** with user-friendly messages
- **Success feedback** for completed actions
- **Smooth transitions** between pages

---

### 9. 📊 Data Flow

#### Event Data Structure:
```typescript
{
  id: number,
  title: string,
  organizer: string,
  date: string,
  time: string,
  location: string,
  category: string,
  price: number,
  rating: number,
  image: string,
  description: string,
  tags: string[],
  registrationUrl: string,  // External UF link
  isUFEvent: boolean       // UF badge flag
}
```

#### UF Events Integration:
- **Real UF events** from our script
- **Official registration URLs** 
- **Campus locations** and venues
- **UF department** organizers

---

### 10. 🎨 Design System

#### Color Palette:
- **Primary**: Indigo to Purple gradients
- **UF Colors**: Orange to Blue for UF events
- **Categories**: Unique gradients per category
- **Status**: Green (success), Red (error), Yellow (warning)

#### Typography:
- **Headings**: Bold, gradient text
- **Body**: Clean, readable fonts
- **UI Elements**: Consistent sizing

#### Components:
- **Cards**: Glassmorphism with backdrop blur
- **Buttons**: Gradient backgrounds with hover effects
- **Badges**: Color-coded by category
- **Forms**: Clean inputs with validation

---

### 11. 🚀 Complete User Scenarios

#### Scenario A: New Student Discovers Events
1. **Landing page** → Clicks "Get Started"
2. **Signs up** with .edu email → Verifies OTP
3. **Dashboard** → Clicks "View Calendar"
4. **Calendar** → Browses October events
5. **Event detail** → Reads about Homecoming Kickoff
6. **Registration** → Clicks "Register on UF Site"
7. **External site** → Completes UF registration

#### Scenario B: Organizer Creates Event
1. **Dashboard** → Clicks "Create Event"
2. **Import option** → Clicks "Import Event"
3. **Import modal** → Pastes Luma event URL
4. **Auto-fill** → Reviews imported data
5. **Form completion** → Fills remaining details
6. **Publish** → Event goes live on platform

#### Scenario C: Event Discovery
1. **Events page** → Searches "football"
2. **Filter** → Selects "Sports" category
3. **Calendar view** → Clicks November 1st
4. **Event details** → Views Gator Football game
5. **Registration** → Goes to UF Athletics site

---

### 12. 🎯 Key Success Metrics

#### User Engagement:
- **Event discovery** through multiple views
- **Registration completion** via external links
- **Calendar usage** for planning
- **Import feature** adoption

#### Platform Value:
- **Centralized discovery** of UF events
- **Seamless registration** flow
- **Visual calendar** planning
- **Easy event creation** and import

---

## 📋 UF Gainesville Events Included

### 🏆 Sports Events (3)
- **Gator Football vs Georgia Bulldogs** (Nov 1) - $45-$150
- **UF Basketball Season Opener** (Nov 12) - $20-$75  
- **Gator Volleyball vs LSU** (Nov 22) - $8-$25

### 🎓 Academic Events (3)
- **UF Career Fair Fall 2025** (Oct 29) - Free
- **UF Research Symposium** (Nov 5) - Free
- **UF Engineering Expo 2025** (Nov 20) - Free

### 🎉 Social Events (2)
- **UF Homecoming Week Kickoff** (Oct 27) - Free
- **GatorNights: Halloween Spooktacular** (Oct 31) - Free

### 🌍 Cultural Events (1)
- **UF International Education Week** (Nov 15) - Free

### 🍕 Food Events (1)
- **Gainesville Food Truck Rally** (Nov 8) - $5-$15

---

## 🔗 External Integration Points

### UF Registration Systems:
- **UF Calendar**: `https://calendar.ufl.edu/event/...`
- **UF Athletics**: `https://floridagators.com/sports/...`
- **UF Student Activities**: `https://www.ufsa.ufl.edu/events/...`
- **UF Departments**: Various official UF event pages

### Third-Party Import Support:
- **Luma**: Event import from Luma platform
- **Eventbrite**: Event import from Eventbrite
- **Partiful**: Event import from Partiful
- **Meetup**: Event import from Meetup
- **Facebook Events**: Event import from Facebook

---

## 🎉 Conclusion

This complete flow creates a comprehensive event management platform that serves both UF students discovering events and organizers creating/managing events, with seamless integration to UF's official systems!

The platform successfully bridges the gap between event discovery and official registration, providing a beautiful, intuitive interface while maintaining the authenticity and official nature of UF's event management processes.
