# Tribzy Landing Page

## Overview
Tribzy is a campus events platform landing page built with Next.js, React, and Tailwind CSS. The application features a modern, responsive design for discovering and hosting campus events with student-only access verification.

## Project Architecture
- **Frontend**: Next.js 14.2.32 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI component library
- **Build System**: Next.js with PostCSS and Autoprefixer

## Key Features
- Modern, responsive landing page design
- Campus-themed color palette (teal, coral, lime)
- Student-focused event discovery platform
- .edu email verification system
- Component-based architecture with Radix UI

## Development Setup
The project has been configured for the Replit environment:

1. **Dependencies**: All npm packages installed
2. **Configuration**: 
   - Next.js config modified for Replit (removed static export, added host configuration)
   - Tailwind CSS properly configured with required directives
   - TypeScript paths configured for @/ imports
3. **Workflow**: Development server running on port 5000
4. **Deployment**: Configured for autoscale deployment

## Recent Changes (September 13, 2025)
- Fixed CSS import path in _app.tsx
- Added required @tailwind directives to globals.css
- Modified next.config.js for Replit environment
- Set up development workflow on port 5000
- Configured deployment settings for production

## Current State
The application is fully functional and running successfully in the Replit environment. The development server is accessible on port 5000 with proper host configuration for the Replit preview system.

## Project Structure
```
├── pages/              # Next.js pages
├── src/
│   ├── components/     # React components
│   │   ├── ui/        # Radix UI components
│   │   └── figma/     # Custom components
│   └── styles/        # Global CSS and styling
├── next.config.js     # Next.js configuration
├── tailwind.config.js # Tailwind configuration
└── package.json       # Dependencies and scripts
```