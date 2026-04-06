# C++ STL Learning Platform

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.1.0-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC.svg)](https://tailwindcss.com/)

An interactive, visual learning platform for mastering C++ Standard Template Library (STL). Designed specifically for 1st and 2nd year computer science students with beginner-friendly explanations, real-time visualizations, and hands-on practice exercises.

## ✨ Features

- 🎯 **Visual Learning**: Watch data structures animate in real-time as you interact with them
- ⚡ **Instant Practice**: Interactive "Try-It" sections for every STL container and algorithm
- 🏆 **Progressive Learning**: 3-level system (Learn → Try → Practice) for structured mastery
- 💡 **Real-World Context**: Understand where each STL component is used in industry
- 📚 **Comprehensive Coverage**: All major STL containers, algorithms, and utilities
- 🎨 **Modern UI**: Beautiful, responsive design with smooth animations
- 📱 **Mobile Friendly**: Works seamlessly on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/cpp-stl-platform.git
cd cpp-stl-platform
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## 📖 What You'll Learn

### STL Containers

- **Vector**: Dynamic arrays with automatic resizing
- **Deque**: Double-ended queue for efficient front/back operations
- **List**: Doubly-linked list for frequent insertions/deletions
- **Set & Multiset**: Ordered containers with unique/sorted elements
- **Map & Multimap**: Key-value pairs with ordered access
- **Stack & Queue**: LIFO and FIFO data structures
- **Priority Queue**: Max-heap based container

### STL Algorithms

- Sorting, searching, and transformation algorithms
- Numeric operations and mathematical computations
- Set operations and utility functions

### Modern C++ Features

- Smart pointers and RAII
- Lambda expressions and functional programming
- Move semantics and perfect forwarding

## 🏗️ Tech Stack

- **Frontend**: React 18 with Hooks
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS for utility-first styling
- **Icons**: Lucide React for consistent iconography
- **Animations**: Framer Motion for smooth transitions
- **Code Highlighting**: React Syntax Highlighter
- **Routing**: React Router DOM for SPA navigation

## 📁 Project Structure

```
cpp-stl-platform/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Main application pages
│   ├── visualizers/   # Interactive STL visualizations
│   ├── data/          # STL topics and content data
│   ├── utils/         # Helper functions and utilities
│   ├── App.jsx        # Main application component
│   └── main.jsx       # Application entry point
├── index.html         # HTML template
├── package.json       # Dependencies and scripts
├── vite.config.js     # Vite configuration
├── tailwind.config.js # Tailwind CSS configuration
└── postcss.config.js  # PostCSS configuration
```

## 🎯 Learning Approach

1. **Learn**: Read beginner-friendly explanations with real-world analogies
2. **Try**: Experiment with interactive code examples and visualizations
3. **Practice**: Solve coding challenges and quizzes to reinforce concepts

### Development Guidelines

1. Follow the existing code style and structure
2. Add comprehensive comments for complex logic
3. Test your changes thoroughly
4. Update documentation as needed

=

## 🙏 Acknowledgments

- Built for computer science students learning C++ STL
- Inspired by the need for more interactive programming education
- Special thanks to the React and Vite communities
