# Online Blogging Application

A modern, full-stack blogging platform inspired by Medium, built with TypeScript and deployed on edge networks for optimal performance.

🌐 **Live Demo**: [https://online-blogging-application.vercel.app](https://online-blogging-application.vercel.app)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [API Routes](#api-routes)
- [Deployment](#deployment)
- [Scripts](#scripts)

## ✨ Features

### User Authentication
- **Email OTP Verification**: Secure signup with 6-digit OTP sent via Resend API
- **JWT Authentication**: Token-based authentication for secure API access
- **Rate Limiting**: Maximum 3 OTP attempts with 24-hour cooldown
- **Auto OTP Cleanup**: Expired OTPs automatically cleaned from database

### Blog Management
- **Create & Publish Posts**: Rich text blogging with title and content
- **Edit Posts**: Update existing blog posts
- **Delete Posts**: Remove individual posts or all user posts at once
- **View All Blogs**: Browse all published blogs from the community
- **Personal Dashboard**: View and manage your own posts
- **Individual Blog Pages**: Dedicated pages for each blog post

### UI/UX
- **Responsive Design**: Built with Tailwind CSS for mobile-first design
- **Modern Components**: Reusable React components with TypeScript
- **Toast Notifications**: Real-time feedback with react-hot-toast
- **User Avatars**: React Avatar for user profile pictures
- **Loading States**: Smooth loading indicators for better UX

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Redux Toolkit** - State management
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **React Icons** - Icon library

### Backend
- **Hono** - Lightweight web framework for Cloudflare Workers
- **Prisma** - ORM with connection pooling via Accelerate
- **PostgreSQL** - Primary database (hosted on Neon)
- **JWT** - Authentication tokens
- **Resend** - Email service for OTP delivery
- **Zod** - Runtime type validation (via common package)

### Shared/Common
- **@manojcodes77/medium-common** - Shared types and Zod schemas
  - Input validation schemas
  - TypeScript types for signup, signin, create post, update post

### Infrastructure
- **Cloudflare Workers** - Edge serverless backend deployment
- **Vercel** - Frontend hosting with automatic deployments
- **Neon Database** - Serverless PostgreSQL with branching
- **Prisma Accelerate** - Connection pooling and caching

## 📁 Project Structure

```
03-medium/
├── backend/                 # Cloudflare Workers API
│   ├── src/
│   │   ├── index.ts        # Main Hono app with CORS
│   │   ├── controllers/    # Business logic
│   │   │   ├── userControllers.ts  # Auth & OTP
│   │   │   └── postControllers.ts  # Blog CRUD
│   │   ├── routes/         # API route definitions
│   │   │   ├── userRoutes.ts
│   │   │   └── postRoutes.ts
│   │   └── lib/
│   │       └── prisma.ts   # Prisma client setup
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   ├── seed.ts         # Database seeding
│   │   └── migrations/     # Migration history
│   ├── wrangler.toml       # Cloudflare Workers config
│   └── package.json
│
├── client/                  # React frontend
│   ├── src/
│   │   ├── App.tsx         # Main app with routes
│   │   ├── main.tsx        # Entry point
│   │   ├── pages/          # Page components
│   │   │   ├── Signup.tsx
│   │   │   ├── Signin.tsx
│   │   │   ├── BlogsPage.tsx
│   │   │   ├── Blog.tsx
│   │   │   └── Publish.tsx
│   │   ├── components/     # Reusable components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── BlogCard.tsx
│   │   │   ├── SendOTP.tsx
│   │   │   └── ...
│   │   ├── store/          # Redux store
│   │   │   ├── index.ts
│   │   │   ├── authSlice.ts
│   │   │   └── postsSlice.ts
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Utility functions
│   ├── tailwind.config.js
│   ├── vercel.json         # Vercel deployment config
│   └── package.json
│
└── common/                  # Shared validation & types
    ├── src/
    │   └── index.ts        # Zod schemas & TypeScript types
    └── package.json        # Published as npm package
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database (Neon account or local)
- Cloudflare Workers account
- Resend API key

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd 03-medium
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Install frontend dependencies**
```bash
cd ../client
npm install
```

4. **Install common package dependencies** (if developing locally)
```bash
cd ../common
npm install
```

### Setup Backend

1. **Configure environment variables**
   - Create `.env` file in `backend/` directory (see [Environment Variables](#environment-variables))
   - Update `wrangler.toml` with your environment variables

2. **Setup database**
```bash
cd backend
# Run migrations
npx prisma migrate dev

# Generate Prisma Client
npx prisma generate

# (Optional) Seed database
npm run seed
```

3. **Start development server**
```bash
npm run dev
```
Backend will run on `http://localhost:8787` (or configured port)

### Setup Frontend

1. **Configure API endpoint**
   - Update API base URL in your axios configuration to point to your backend

2. **Start development server**
```bash
cd client
npm run dev
```
Frontend will run on `http://localhost:5173`

## 🔐 Environment Variables

### Backend (`backend/.env` and `backend/wrangler.toml`)

```bash
# Database
DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=YOUR_ACCELERATE_KEY"

# Authentication
JWT_SECRET="your-secret-key-here"

# Email Service (Resend)
RESEND_API_KEY="re_xxxxxxxxxxxxx"
RESEND_EMAIL_ADDRESS="onboarding@resend.dev"
```

**Note**: The `schema.prisma` reads from `.env` for local development, while `index.ts` uses `wrangler.toml` for production deployment.

### Frontend

No environment variables required for basic setup. API URL is configured in the application code.

## 📊 Database Schema

### User Model
```prisma
model User {
  id       String   @id @default(uuid())
  email    String   @unique
  name     String?
  password String
  posts    Post[]
}
```

### Post Model
```prisma
model Post {
  id        String   @id @default(uuid())
  title     String
  content   String
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
  authorId  String
}
```

### OTP Model
```prisma
model Otp {
  id        String   @id @default(uuid())
  email     String   @unique
  otp       String
  createdAt DateTime @default(now())
  attempts  Int      @default(3)
}
```

## 🌐 API Routes

### User Routes (`/api/v1/user`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/cleanUpOtps` | Clean expired OTPs | No |
| POST | `/send-otp` | Send OTP to email | No |
| POST | `/signup` | Register new user | No |
| POST | `/signin` | Login user | No |

### Post Routes (`/api/v1/post`)

All post routes require JWT authentication.

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/` | Create new post |
| PUT | `/` | Update existing post |
| GET | `/AllPosts` | Get all posts |
| GET | `/bulk` | Get all posts (bulk) |
| GET | `/:id` | Get single post by ID |
| DELETE | `/` | Delete all user posts |
| DELETE | `/delete/:id` | Delete specific post |

## 📦 Deployment

### Backend (Cloudflare Workers)

```bash
cd backend
npm run deploy
```

This will:
- Build and minify your application
- Deploy to Cloudflare Workers
- Make your API available globally on edge network

### Frontend (Vercel)

```bash
cd client
npm run build
```

Then push to GitHub - Vercel will automatically deploy on push.

Or deploy manually:
```bash
vercel deploy --prod
```

### Common Package (npm)

If you update the common package:
```bash
cd common
npm version patch  # or minor/major
npm publish
```

Then update the version in `backend/package.json` and `client/package.json`.

## 📝 Scripts

### Backend Scripts
```bash
npm run dev          # Start development server
npm run deploy       # Deploy to Cloudflare Workers
npm run seed         # Seed database
```

### Frontend Scripts
```bash
npm run dev          # Start development server (Vite)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Database Scripts
```bash
npx prisma migrate dev            # Create and apply migration
npx prisma migrate dev --name <name>  # Named migration
npx prisma generate                   # Generate Prisma Client
npx prisma studio                     # Open Prisma Studio
npx prisma db seed                    # Run seed script
```

## 👨‍💻 Development Notes

1. **Database Configuration**: 
   - Local development: Uses `DATABASE_URL` from `.env`
   - Production: Uses `DATABASE_URL` from `wrangler.toml`
   - Prisma Accelerate is used for connection pooling

2. **CORS Configuration**: 
   - Allows `https://online-blogging-application.vercel.app` and `http://localhost:5173`

3. **OTP System**:
   - 6-digit OTP valid for 10 minutes
   - Maximum 3 attempts per email
   - 24-hour cooldown after exhausting attempts
   - Auto-cleanup of expired OTPs

4. **Type Safety**:
   - Shared Zod schemas ensure consistent validation
   - TypeScript types shared between frontend and backend
   - Published as `@manojcodes77/medium-common` npm package

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
