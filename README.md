# CA Monk Blog - Professional Finance & Accounting Blog Platform

A full-stack blog application built with Next.js 16, React 19, TanStack Query, and Tailwind CSS. This project demonstrates a complete implementation of a REST API-based blog system with a modern, responsive user interface.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Setup & Running](#setup--running)
- [API Documentation](#api-documentation)
- [Testing with Postman](#testing-with-postman)

---

## Overview

CA Monk Blog is a professional blog platform designed for financial professionals to share insights on finance, accounting, and career growth. The application implements three core REST APIs for blog management and provides a clean, modern UI for browsing, reading, and creating blog articles.

**Live Features:**
- View all blog articles with rich filtering options
- Read individual blog articles with full content and author information
- Create new blog articles with real-time updates
- Professional navigation with branding and user profile
- Responsive design for desktop and mobile devices

---

## Features

### Core Features Implemented

✅ **Get All Blogs** - Fetch all blog articles with pagination and filtering  
✅ **Get Blog by ID** - Retrieve detailed view of a specific blog article  
✅ **Create New Blog** - Submit new articles with full validation  
✅ **Author Information** - Display author name and role on each article  
✅ **Navbar Navigation** - Professional header with CA MONK branding  
✅ **Responsive Design** - Works seamlessly on mobile, tablet, and desktop  
✅ **Real-time Updates** - Newly created blogs appear instantly in the list  
✅ **Error Handling** - Graceful fallback to local data if API is unavailable  

### Technical Features

✅ **TypeScript** - Full type safety across the entire codebase  
✅ **TanStack React Query** - Advanced data fetching, caching, and synchronization  
✅ **Server Components** - Optimized performance with Next.js Server Components  
✅ **Form Validation** - React Hook Form with Zod schema validation  
✅ **Tailwind CSS** - Modern utility-first styling  
✅ **shadcn/ui** - Pre-built, accessible UI components  
✅ **RESTful API** - Clean API design following REST conventions  

---

## Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19.2** - Latest React with concurrent rendering
- **TypeScript 5** - Type-safe JavaScript
- **TanStack Query 5** - Server state management
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - Accessible component library
- **React Hook Form 7** - Performant form handling
- **Zod 3** - TypeScript-first schema validation

### Backend
- **JSON Server** - Mock REST API with real JSON database
- **Node.js** - JavaScript runtime

### Development Tools
- **ESLint** - Code quality and style checking
- **PostCSS 8** - CSS transformation tool

---

## Project Structure

```
ca-monk-blog/
├── app/
│   ├── blog/
│   │   └── page.tsx                 # Main blog page with navbar
│   ├── layout.tsx                   # Root layout with QueryProvider
│   ├── globals.css                  # Global Tailwind styles
│   └── favicon.ico
│
├── components/
│   ├── navbar.tsx                   # Navigation header
│   ├── blog-list.tsx                # Blog list sidebar
│   ├── blog-card.tsx                # Individual blog card component
│   ├── blog-detail.tsx              # Full blog article view
│   ├── create-blog-modal.tsx        # Create article form modal
│   ├── query-provider.tsx           # TanStack Query wrapper
│   └── ui/                          # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       └── ...other UI components
│
├── public/
│   ├── db.json                      # JSON Server database file
│   ├── blog-article.jpg             # Blog article placeholder image
│   └── favicon.ico
│
├── package.json                     # Project dependencies
├── tsconfig.json                    # TypeScript configuration
├── next.config.mjs                  # Next.js configuration
├── tailwind.config.ts               # Tailwind CSS configuration
├── postcss.config.js                # PostCSS configuration
└── README.md                        # This file

```

---

## Installation

### Prerequisites

- **Node.js** 18.17 or higher
- **npm** 9 or higher (or yarn/pnpm)
- **Git** for version control

### Step 1: Clone the Repository

```bash
git clone https://github.com/Awesomeasma/CA-Monk-BlogApp.git
cd CA-Monk-BlogApp
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs all required packages including:
- Next.js and React
- TanStack Query
- Tailwind CSS
- shadcn/ui components
- Form validation libraries
- JSON Server for the backend

### Step 3: Verify Installation

```bash
npm run
```

You should see these available scripts:
- `dev` - Start development server
- `server` - Start JSON Server (backend)

---

## Setup & Running

### Running Both Frontend & Backend

You need to run TWO separate processes. Open two terminal windows:

#### Terminal 1: Start JSON Server (Backend - Port 3001)

```bash
npm run server
```

Expected output:
```
⚡ JSON Server is running
Listening on http://localhost:3001
Watching file... public/db.json
```

**Important:** Keep this terminal window open. Do NOT close it while using the app.

#### Terminal 2: Start Next.js Dev Server (Frontend - Port 3000)

```bash
npm run dev
```

Expected output:
```
▲ Next.js 16.0.10
✓ Ready in 2.3s
➜ Local: http://localhost:3000
➜ Pressing 'o' will open the browser
```

### Accessing the Application

1. Open your browser
2. Navigate to `http://localhost:3000/`
3. You should see:
   - Professional navbar with CA MONK logo
   - Blog list on the left sidebar
   - Welcome message on the right side
   - "New Article" button in the top right

### Stopping the Servers

- Press `Ctrl + C` in either terminal to stop that server
- You must stop both to fully stop the application

---

## API Documentation

### Base URL

```
http://localhost:3001
```

### 1. Get All Blogs

**Endpoint:** `GET /blogs`

**Description:** Retrieve all blog articles from the database

**Request:**
```http
GET http://localhost:3001/blogs HTTP/1.1
Content-Type: application/json
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Future of Fintech",
    "category": "FINANCE",
    "description": "Exploring how AI and blockchain are reshaping financial services...",
    "content": "# The Future of Fintech\n\nLong form content here...",
    "date": "Jan 15, 2026",
    "readTime": "5 min read",
    "author": "Arjun Mehta",
    "authorRole": "Senior Financial Analyst",
    "image": "/blog-article.jpg"
  },
  ...more blogs
]
```

**Usage in Code:**
```typescript
const { data: blogs } = useQuery({
  queryKey: ['blogs'],
  queryFn: async () => {
    const response = await fetch('http://localhost:3001/blogs');
    return response.json();
  }
});
```

---

### 2. Get Blog by ID

**Endpoint:** `GET /blogs/:id`

**Description:** Retrieve a single blog article by its ID

**Request:**
```http
GET http://localhost:3001/blogs/1 HTTP/1.1
Content-Type: application/json
```

**URL Parameters:**
- `id` (required) - The blog article ID (integer)

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Future of Fintech",
  "category": "FINANCE",
  "description": "Exploring how AI and blockchain are reshaping financial services...",
  "content": "# The Future of Fintech\n\n## The Rise of Automated Accounting\n\nAutomation is no longer a buzzword...",
  "date": "Jan 15, 2026",
  "readTime": "5 min read",
  "author": "Arjun Mehta",
  "authorRole": "Senior Financial Analyst",
  "image": "/blog-article.jpg"
}
```

**Response (404 Not Found):**
```json
{}
```

**Usage in Code:**
```typescript
const { data: blog } = useQuery({
  queryKey: ['blog', blogId],
  queryFn: async () => {
    const response = await fetch(`http://localhost:3001/blogs/${blogId}`);
    return response.json();
  }
});
```

---

### 3. Create New Blog

**Endpoint:** `POST /blogs`

**Description:** Create a new blog article and add it to the database

**Request:**
```http
POST http://localhost:3001/blogs HTTP/1.1
Content-Type: application/json

{
  "id": 6,
  "title": "Your Article Title",
  "category": "FINANCE",
  "description": "A brief summary of your article",
  "content": "# Full Article Content\n\nYou can use markdown here for formatting.\n\n## Section Heading\n\nContent with **bold** and *italic* text.",
  "date": "Jan 16, 2026",
  "readTime": "8 min read",
  "author": "Your Name",
  "authorRole": "Your Job Title",
  "image": "/blog-article.jpg"
}
```

**Request Body Parameters:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | number | Yes | Unique identifier (should be next available ID) |
| title | string | Yes | Article title (max 100 characters) |
| category | string | Yes | Category: FINANCE, CAREER, REGULATIONS, SKILLS, TECHNOLOGY |
| description | string | Yes | Brief summary (max 200 characters) |
| content | string | Yes | Full article content (supports markdown) |
| date | string | Yes | Publication date (format: "MMM DD, YYYY") |
| readTime | string | Yes | Estimated read time (format: "X min read") |
| author | string | Yes | Author name |
| authorRole | string | Yes | Author's job title/role |
| image | string | Yes | Path to article image |

**Response (201 Created):**
```json
{
  "id": 6,
  "title": "Your Article Title",
  "category": "FINANCE",
  "description": "A brief summary of your article",
  "content": "# Full Article Content\n\nYou can use markdown here for formatting...",
  "date": "Jan 16, 2026",
  "readTime": "8 min read",
  "author": "Your Name",
  "authorRole": "Your Job Title",
  "image": "/blog-article.jpg"
}
```

**Usage in Code:**
```typescript
const createBlog = async (blogData) => {
  const response = await fetch('http://localhost:3001/blogs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(blogData),
  });
  return response.json();
};
```

---

## Testing with Postman

1. Make sure JSON Server is running on port 3001

### Test 1: Get All Blogs

1. **Create Request**
   - Method: `GET`
   - URL: `http://localhost:3001/blogs`
   - Click "Send"

2. **Expected Result**
   - Status: `200 OK`
   - Response shows array of 5 blogs

### Test 2: Get Blog by ID

1. **Create Request**
   - Method: `GET`
   - URL: `http://localhost:3001/blogs/1`
   - Click "Send"

2. **Expected Result**
   - Status: `200 OK`
   - Response shows single blog with id=1

3. **Try Other IDs**
   - Replace `1` with `2`, `3`, `4`, or `5` to test other blogs
   - Try `999` to test a non-existent blog (should return empty object)

### Test 3: Create New Blog

1. **Create Request**
   - Method: `POST`
   - URL: `http://localhost:3001/blogs`

2. **Set Headers**
   - Go to "Headers" tab
   - Add: `Content-Type: application/json`

3. **Set Body**
   - Click "Body" tab
   - Select "raw" and choose "JSON"
   - Copy and paste this:
   ```json
   {
     "id": 6,
     "title": "AI and Machine Learning in Accounting",
     "category": "TECHNOLOGY",
     "description": "How artificial intelligence is transforming accounting processes",
     "content": "# AI and Machine Learning in Accounting\n\n## Introduction\n\nArtificial intelligence and machine learning are revolutionizing the accounting industry. From automated data entry to predictive analytics, these technologies are enabling accountants to focus on more strategic tasks.\n\n## Key Benefits\n\n1. **Increased Accuracy** - AI reduces human error in data processing\n2. **Time Savings** - Automation speeds up routine tasks by 70%\n3. **Better Insights** - Machine learning identifies patterns and anomalies\n\n## Conclusion\n\nThe future of accounting is intelligent, automated, and more strategic.",
     "date": "Jan 16, 2026",
     "readTime": "6 min read",
     "author": "Sarah Johnson",
     "authorRole": "Financial Technology Consultant",
     "image": "/blog-article.jpg"
   }
   ```

4. **Click "Send"**

5. **Expected Result**
   - Status: `201 Created`
   - Response returns the created blog object
   - New blog ID is 6

### Verify Creation

1. Run "Get All Blogs" again (Test 1)
2. You should now see 6 blogs in the response
3. The new blog should be at the bottom

---

## Project Requirements - Checklist

### APIs
- [x] GET /blogs - Retrieve all blog articles
- [x] GET /blogs/:id - Retrieve single blog by ID
- [x] POST /blogs - Create new blog article

### Features
- [x] Professional navbar with CA MONK branding
- [x] Blog list view with cards
- [x] Blog detail view with full content
- [x] Create article modal with form validation
- [x] Author information display (name and role)
- [x] Real-time updates when creating articles
- [x] Responsive design (mobile, tablet, desktop)

### Technical
- [x] TypeScript for type safety
- [x] TanStack Query for data management
- [x] React Hook Form with Zod validation
- [x] Tailwind CSS styling
- [x] shadcn/ui components
- [x] Next.js 16 App Router
- [x] JSON Server backend
- [x] Error handling and fallbacks

---

## Database Schema

### blogs (JSON Server)

```json
{
  "blogs": [
    {
      "id": 1,
      "title": "string",
      "category": "FINANCE | CAREER | REGULATIONS | SKILLS | TECHNOLOGY",
      "description": "string (max 200 chars)",
      "content": "string (supports markdown)",
      "date": "string (MMM DD, YYYY)",
      "readTime": "string (e.g., '5 min read')",
      "author": "string",
      "authorRole": "string",
      "image": "string (file path)"
    }
  ]
}
```

---





