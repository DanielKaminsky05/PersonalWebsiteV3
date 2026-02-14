# Daniel Kaminsky - Personal Portfolio

A modern, interactive portfolio website featuring a unique dual-mode experience: a professional showcase and an immersive 3D journey map.

## Features

### 🎭 Dual-Mode Experience
- **Professional Mode**: Traditional portfolio layout with projects, experience, and technical skills
- **Personal Mode**: Interactive 3D journey map where visitors navigate a boat between islands to discover personal stories
- Smooth transitions with custom boat loader animation

### 🚢 Interactive 3D Journey Map
- Navigate a boat along a curved path between themed islands
- Click locations to dock and explore content overlays
- Responsive camera system adapting to mobile and desktop viewports
- Built with Three.js and React Three Fiber

### 📝 Content Management
- MDX-powered blog with syntax highlighting
- Dynamic project showcase with video/image support
- Experience timeline with detailed role descriptions
- JSON-driven data architecture for easy updates

### 🎨 Modern Design
- Glassmorphism UI elements
- Smooth animations with Framer Motion
- Custom typing effect in hero section
- Responsive design optimized for all devices

## 🛠️ Tech Stack

### Core
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4

### 3D & Animation
- **3D Rendering**: [Three.js](https://threejs.org/) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- **3D Helpers**: [@react-three/drei](https://github.com/pmndrs/drei)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) + [GSAP](https://greensock.com/gsap/)

### Content & Data
- **MDX**: [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)
- **Syntax Highlighting**: [rehype-pretty-code](https://rehype-pretty-code.netlify.app/) + [Shiki](https://shiki.matsu.io/)
- **Charts**: [Recharts](https://recharts.org/)

### Additional
- **Analytics**: Vercel Analytics
- **Icons**: Lucide React + React Icons
- **UI Components**: Custom components with Radix UI primitives

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/DanielKaminsky05/PersonalWebsiteV3.git
cd PersonalWebsiteV3

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/                      # Next.js app router pages
│   ├── blog/                # Blog post pages
│   ├── experience/          # Experience detail pages
│   └── api/                 # API routes
├── components/
│   ├── home/                # Professional mode components
│   ├── personal/            # 3D journey map components
│   │   ├── locations/       # Island content overlays
│   │   ├── Boat.tsx         # Animated boat navigation
│   │   ├── JourneyMap.tsx   # Main 3D scene orchestrator
│   │   └── Scene.tsx        # Three.js scene setup
│   ├── stats/               # GitHub/LeetCode stats
│   └── ui/                  # Reusable UI components
├── content/
│   ├── blog/                # MDX blog posts
│   └── experience/          # MDX experience entries
├── data/                    # JSON data files
├── public/
│   ├── models/              # 3D GLB models
│   └── projects/            # Project media assets
└── lib/                     # Utility functions
```

## 🎨 Customization

### Adding Projects
Edit `data/projects.json`:
```json
{
  "id": "unique-id",
  "title": "Project Name",
  "description": ["Paragraph 1", "Paragraph 2"],
  "author": "Your Name",
  "media": "/projects/demo.mp4",
  "tags": ["React", "TypeScript"],
  "github": "https://github.com/..."
}
```

### Adding Blog Posts
Create a new `.mdx` file in `content/blog/`:
```mdx
---
title: "Post Title"
date: "2026-01-15"
description: "Brief description"
---

Your content here...
```

### Modifying 3D Map
- **Island Positions**: Edit `DESKTOP_LAYOUT` and `MOBILE_LAYOUT` in `components/personal/JourneyMap.tsx`
- **Boat Path**: Adjust `pathPoints` array to change navigation route
- **3D Models**: Replace GLB files in `public/models/`

## 🌟 Key Components

### JourneyMap
The main orchestrator for the 3D experience. Manages:
- Responsive camera positioning
- Boat navigation state
- Location overlay rendering
- Mobile/desktop layout switching

### Boat
Implements smooth navigation along a Catmull-Rom curve with:
- Dynamic speed adjustment (slows when approaching destination)
- Arrival detection and callback system
- Forward-only movement logic

### LocationOverlay
Reusable modal component for displaying island content with:
- Smooth enter/exit animations
- Backdrop blur effects
- Responsive positioning

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Bundle Optimization**: Code splitting, lazy loading, and tree shaking
- **Image Optimization**: Next.js Image component with automatic WebP conversion
- **3D Model Loading**: Preloaded GLB models with suspense boundaries

## 🔧 Development

```bash
# Run linter
npm run lint

# Type checking
npx tsc --noEmit
```



