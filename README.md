# Tribzy Landing Page

A modern, production-ready Next.js 14 landing page for Tribzy - a campus events platform for college students.

## Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Radix UI** components for accessibility
- **Lucide React** for icons
- **Static Export** ready for deployment
- **Responsive Design** for all devices
- **SEO Optimized** with proper meta tags

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

1. Build the application:
```bash
npm run build
```

2. Export static files:
```bash
npm run export
```

The static files will be generated in the `out` directory.

## Project Structure

```
├── pages/
│   ├── _app.tsx          # App wrapper
│   ├── _document.tsx     # Document structure
│   └── index.tsx         # Home page
├── src/
│   ├── components/
│   │   ├── ui/           # Reusable UI components
│   │   └── figma/        # Custom components
│   └── index.css         # Global styles
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind configuration
└── tsconfig.json         # TypeScript configuration
```

## Deployment

This project is configured for static export and can be deployed to:

- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- **Any static hosting service**

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **Class Variance Authority** - Component variants
- **Tailwind Merge** - Class merging utility

## License

This project is private and proprietary.