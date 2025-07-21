# Finance Platform

A comprehensive, modern finance management application built with Next.js 15, featuring AI-powered receipt scanning, real-time analytics, and secure transaction management.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19_RC-blue)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC)](https://tailwindcss.com/)

## 🚀 Features

### 💰 Financial Management
- **Multi-Account Support**: Manage multiple checking and savings accounts
- **Transaction Tracking**: Comprehensive transaction history and categorization
- **Budget Management**: Set and track budgets with visual progress indicators
- **Real-time Analytics**: Interactive charts and financial insights

### 🤖 AI-Powered Tools
- **Receipt Scanning**: AI-powered receipt analysis using Google Gemini
- **Smart Categorization**: Automatic transaction categorization
- **Financial Insights**: AI-generated spending analysis and recommendations

### 🔐 Security & Authentication
- **Secure Authentication**: Powered by Clerk with multi-factor support
- **Rate Limiting**: ArcJet protection against abuse and attacks
- **Data Protection**: Encrypted data storage and secure API endpoints

### 📱 User Experience
- **Responsive Design**: Mobile-first design that works on all devices
- **Dark/Light Mode**: Theme switching with system preference detection
- **Real-time Updates**: Live data synchronization across sessions
- **Accessibility**: WCAG compliant UI components

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19 RC
- **Styling**: Tailwind CSS with custom design system
- **Components**: Radix UI primitives with custom components
- **Charts**: Recharts for data visualization
- **State Management**: React Server Components + Client Components

### Backend
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **AI Integration**: Google Gemini API
- **Email**: Resend for transactional emails
- **Background Jobs**: Inngest for async processing
- **Security**: ArcJet for rate limiting and protection

### Development & Deployment
- **Build Tool**: Next.js with Turbopack
- **Styling**: PostCSS with Tailwind CSS
- **Type Safety**: Zod for schema validation
- **Code Quality**: ESLint with Next.js configuration

## 📋 Prerequisites

- Node.js 18.17+ 
- PostgreSQL database
- npm or yarn package manager

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/finance-platform.git
cd finance-platform
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/finance_platform"

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# AI Integration (Google Gemini)
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key

# Email Service (Resend)
RESEND_API_KEY=your_resend_api_key

# Background Jobs (Inngest)
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key

# Security (ArcJet)
ARCJET_KEY=your_arcjet_key
```

### 4. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# (Optional) Seed the database
npm run seed
```

### 5. Start Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
finance-platform/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages
│   ├── (main)/                   # Protected application pages
│   │   ├── dashboard/            # Dashboard components and pages
│   │   ├── account/              # Account management
│   │   └── transaction/          # Transaction management
│   ├── api/                      # API routes
│   └── lib/                      # App-specific utilities
├── actions/                      # Server Actions (APIs)
├── components/                   # Reusable UI components
│   └── ui/                       # Base UI components (Radix-based)
├── lib/                          # Core utilities and configurations
├── hooks/                        # Custom React hooks
├── data/                         # Static data and configurations
├── emails/                       # Email templates (React Email)
├── prisma/                       # Database schema and migrations
└── public/                       # Static assets
```

## 📖 Usage

### Creating an Account
1. Sign up using the authentication system
2. Complete your profile setup
3. Create your first financial account (checking/savings)

### Managing Transactions
1. Navigate to the Transaction page
2. Add transactions manually or use receipt scanning
3. Categorize transactions for better tracking
4. View transaction history and analytics

### Budget Tracking
1. Set up budgets for different categories
2. Track spending against budgets in real-time
3. Receive notifications when approaching limits

### AI Receipt Scanning
1. Take a photo of your receipt
2. Let AI extract transaction details automatically
3. Review and confirm the extracted information
4. Save to your transaction history

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npx prisma studio    # Open Prisma Studio
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema to database

# Email Development
npm run email        # Start email development server

# Analysis
npm run analyze      # Analyze bundle size
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`npm run lint`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📚 Documentation

- [API Documentation](API_DOCUMENTATION.md) - Comprehensive API reference
- [Developer Guide](DEVELOPER_GUIDE.md) - Development setup and guidelines
- [Component Reference](COMPONENT_REFERENCE.md) - UI component documentation
- [Performance Guide](PERFORMANCE_OPTIMIZATIONS.md) - Performance optimization tips

## 🔒 Security

This application implements multiple security layers:
- **Authentication**: Secure user authentication with Clerk
- **Rate Limiting**: ArcJet protection against abuse
- **Data Validation**: Zod schemas for input validation
- **Database Security**: Parameterized queries with Prisma
- **HTTPS**: Enforced in production environments

## 📈 Performance

The application is optimized for performance:
- **Server Components**: Reduced client-side JavaScript
- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Next.js automatic image optimization
- **Caching**: Strategic caching with Next.js
- **Bundle Analysis**: Regular bundle size monitoring

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Clerk](https://clerk.com/) for authentication services
- [Prisma](https://prisma.io/) for database management
- [Radix UI](https://radix-ui.com/) for accessible UI primitives
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [Vercel](https://vercel.com/) for deployment platform

---

<div align="center">
  Made with ❤️ for better financial management
</div>
