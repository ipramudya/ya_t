# YouApp - Frontend Assessment Project

## Technical Stack

### Frontend Framework & Libraries

-   **React 18** - UI library
-   **Next.js 15** - React framework for the frontend application
-   **TypeScript** - Programming language
-   **Tailwind CSS** - Styling framework
-   **Jotai** - State management
-   **React Hook Form** - Form handling
-   **Zod** - Schema validation
-   **Sonner** - Toast notifications

### Backend & Database

-   **NeonDB (PostgreSQL)** - Cloud Database
-   **Drizzle ORM** - Database toolkit
-   **Cloudinary** - Image storage service

### Authentication & Security

-   **JWT (JSON Web Tokens)** - Authentication mechanism
-   **Bcrypt** - Password hashing
-   **HTTP-only cookies** - Token storage

## Getting Started

### Prerequisites

-   Node.js 18.x or higher
-   npm/yarn installed

### Installation

1. Clone the repository

```bash
git clone https://github.com/ipramudya/ya_t.git
cd youapp
```

2. Install dependencies

```bash
npm install

# or (prefered using yarn)
yarn install
```

4. Run the development server

```bash
npm run dev

# or (prefered using yarn)
yarn dev
```

5. Build for production

```bash
npm run build
npm start

# or (prefered using yarn)
yarn build
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Architecture

### Directory Structure

-   `/api` - API service layers and configurations
-   `/app` - Next.js pages and routes
-   `/app/api` - API routes
-   `/app/(auth)` - Authentication routes
-   `/app/(private)` - Protected routes
-   `/components` - Reusable UI components
-   `/hooks` - Custom React hooks
-   `/lib` - Utility functions and configurations
-   `/types` - TypeScript type definitions

### API Handling

-   Uses a service-based architecture with dedicated services for auth and profile
-   Implements a base API class for consistent request handling
-   Centralized error handling and response formatting

### Authentication Flow

1. User registers/logs in through auth endpoints
2. JWT token is generated and stored in HTTP-only cookie
3. Protected routes verify token through middleware
4. User context maintains authentication state

### Features

-   User registration and login
-   Profile management with image upload
-   Interest management
-   Zodiac and horoscope calculations
-   Responsive design
-   Form validation
-   Toast notifications for user feedback

## Best Practices

-   Component composition and reusability
-   Type safety with TypeScript
-   Progressive enhancement
-   Responsive design principles
-   Modern authentication patterns
-   Clean and maintainable code structure
