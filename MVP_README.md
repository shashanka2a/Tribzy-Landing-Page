# Tribzy - Campus Events Platform MVP

A complete frontend MVP for Tribzy, a campus events platform similar to Luma and Eventbrite, built specifically for students with .edu email verification.

## 🚀 Features

### Authentication Flow
- **Sign Up/Sign In** with .edu email validation
- **OTP Verification** for email confirmation
- **Student-only access** with educational email verification

### Event Management
- **Organizer Dashboard** with analytics and event management
- **Event Creation** with multi-step form (Basic Info, Date & Location, Settings)
- **Event Import** from third-party platforms (Luma, Eventbrite, Partiful, Meetup, Facebook Events)
- **Event Discovery** with search, filtering, and categorization
- **Event Details** with registration and organizer information

### User Experience
- **Responsive Design** optimized for mobile and desktop
- **Modern UI** with Luma-inspired aesthetic
- **Real-time Search** and filtering capabilities
- **Event Categories** (Academic, Music, Technology, Sports, Community, Arts, etc.)

## 🛠 Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI components
- **Lucide React** - Icon library
- **Radix UI** - Accessible component primitives

## 📁 Project Structure

```
pages/
├── index.tsx                 # Landing page
├── auth/
│   ├── signup.tsx           # User registration
│   ├── signin.tsx           # User login
│   └── verify-otp.tsx       # Email verification
├── dashboard.tsx            # Organizer dashboard
├── events/
│   ├── index.tsx           # Event marketplace
│   ├── create.tsx          # Event creation form with import feature
│   └── [id].tsx            # Event detail page
├── import-demo.tsx         # Import feature demonstration
└── _app.tsx                # App wrapper

src/
├── components/
│   ├── Layout.tsx          # Layout component
│   ├── figma/
│   │   └── ImageWithFallback.tsx
│   └── ui/                 # shadcn/ui components
└── styles/
    └── globals.css         # Global styles
```

## 🎯 User Flow

### For Students (Event Attendees)
1. **Landing Page** → Browse featured events
2. **Sign Up** → Create account with .edu email
3. **Email Verification** → Verify with OTP
4. **Event Discovery** → Search and filter events
5. **Event Details** → View details and register
6. **Registration** → Confirm attendance

### For Organizers
1. **Sign Up/Login** → Access organizer features
2. **Dashboard** → View analytics and manage events
3. **Create Event** → Multi-step event creation
4. **Event Management** → Edit, publish, manage attendees
5. **Analytics** → Track event performance

## 🎨 Design System

### Color Palette
- **Primary**: Indigo to Purple gradients
- **Secondary**: Pink, Violet, Blue accents
- **Background**: Slate with subtle gradients
- **Text**: Gray scale with proper contrast

### Components
- **Cards**: Glass-morphism effect with backdrop blur
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Clean inputs with validation states
- **Navigation**: Sticky header with backdrop blur

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to `http://localhost:3000`

## 📱 Responsive Design

- **Mobile First** approach
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch-friendly** interface elements
- **Optimized** for campus mobile usage

## 🔐 Security Features

- **Email Validation** - Only .edu domains accepted
- **OTP Verification** - Secure email confirmation
- **Student Verification** - Educational institution validation
- **Form Validation** - Client-side validation with error handling

## 🎯 Key Pages

### Landing Page (`/`)
- Hero section with value proposition
- Featured events showcase
- Key features explanation
- Call-to-action for signup

### Authentication (`/auth/*`)
- Clean signup/signin forms
- .edu email validation
- OTP verification flow
- Error handling and validation

### Event Marketplace (`/events`)
- Search and filter functionality
- Grid/list view toggle
- Category-based filtering
- Event cards with key information

### Event Creation (`/events/create`)
- Multi-step form wizard
- Real-time validation
- Image upload capability
- Event settings and pricing
- **Third-party import** from Luma, Eventbrite, Partiful, Meetup, Facebook Events

### Dashboard (`/dashboard`)
- Event analytics overview
- Quick actions
- Event management
- Performance metrics

### Event Details (`/events/[id]`)
- Comprehensive event information
- Registration functionality
- Organizer contact details
- Social sharing options

### Import Demo (`/import-demo`)
- Feature demonstration page
- Supported platforms showcase
- Usage examples and benefits

## 🎨 UI/UX Highlights

- **Glass-morphism** design with backdrop blur effects
- **Gradient backgrounds** for visual appeal
- **Smooth animations** and transitions
- **Consistent spacing** and typography
- **Accessible** color contrast ratios
- **Loading states** and error handling
- **Empty states** with helpful messaging

## 🔄 State Management

- **React Hooks** for local state
- **Form validation** with error states
- **Loading states** for async operations
- **Mock data** for demonstration

## 📊 Mock Data

The MVP includes realistic mock data for:
- Event listings with various categories
- User profiles and organizer information
- Analytics and statistics
- Event registration data

## 🚀 Future Enhancements

- **Backend Integration** with real APIs
- **Payment Processing** for paid events
- **Real-time Notifications** for event updates
- **Calendar Integration** for event scheduling
- **Social Features** like event sharing and reviews
- **Advanced Analytics** for organizers
- **Mobile App** development
- **Enhanced Import** with real API integrations for supported platforms
- **Bulk Import** for multiple events at once
- **Import History** to track previously imported events

## 📝 Notes

This is a frontend-only MVP demonstrating the complete user experience and interface design. All data is mocked for demonstration purposes. The actual implementation would require backend services for authentication, event management, and data persistence.

The design follows modern web standards with accessibility in mind and provides a solid foundation for a production-ready campus events platform.
