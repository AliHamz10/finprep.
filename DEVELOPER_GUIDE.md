# Developer Guide

## Getting Started

This guide provides comprehensive information for developers working with or extending the finance platform.

## Architecture Overview

### Technology Stack

- **Frontend**: Next.js 15 with App Router, React 19 RC
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI with custom wrapper components
- **Authentication**: Clerk for user management
- **Database**: PostgreSQL with Prisma ORM
- **Security**: ArcJet for rate limiting and protection
- **AI**: Google Gemini for receipt scanning
- **Email**: Resend for transactional emails
- **Background Jobs**: Inngest for async processing

### Project Structure

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
├── components/                   # Reusable components
│   └── ui/                       # Base UI components
├── lib/                          # Core utilities and configurations
├── hooks/                        # Custom React hooks
├── data/                         # Static data and configurations
├── emails/                       # Email templates
└── prisma/                       # Database schema and migrations
```

## Development Workflow

### Setting Up the Development Environment

1. **Clone and Install Dependencies**
```bash
git clone <repository-url>
cd finance-platform
npm install
```

2. **Environment Configuration**
```bash
# Copy environment template
cp .env.example .env.local

# Required environment variables
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
DATABASE_URL=your_postgresql_url
GEMINI_API_KEY=your_gemini_api_key
ARCJET_KEY=your_arcjet_key
RESEND_API_KEY=your_resend_api_key (optional)
```

3. **Database Setup**
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# (Optional) Seed the database
npm run seed
```

4. **Start Development Server**
```bash
npm run dev
```

### Code Style and Conventions

#### File Naming
- **Components**: PascalCase (e.g., `AccountCard.jsx`)
- **Pages**: kebab-case (e.g., `account-details.jsx`)
- **Utilities**: camelCase (e.g., `formatCurrency.js`)
- **Server Actions**: camelCase with descriptive names (e.g., `createTransaction.js`)

#### Component Organization
```jsx
// components/ui/button.jsx
"use client"; // Only if client-side functionality needed

import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// 1. Type definitions (if TypeScript)
// 2. Styled variants
// 3. Component implementation
// 4. Export

const buttonVariants = cva(/* variants */);

const Button = forwardRef(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };
```

#### Server Actions Structure
```javascript
// actions/example.js
"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// 1. Authentication check
// 2. Input validation
// 3. Database operations
// 4. Error handling
// 5. Path revalidation
// 6. Return serialized data

export async function exampleAction(data) {
  try {
    // Always check authentication first
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    // Get user from database
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    // Perform operation
    const result = await db.model.create({
      data: { ...data, userId: user.id }
    });

    // Revalidate affected paths
    revalidatePath("/dashboard");

    // Return serialized data
    return { success: true, data: serializeData(result) };
  } catch (error) {
    throw new Error(error.message);
  }
}
```

## API Development

### Creating New Server Actions

#### Step 1: Define the Action
```javascript
// actions/new-feature.js
"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import aj from "@/lib/arcjet";
import { request } from "@arcjet/next";

// Add rate limiting for protected operations
export async function createSomething(data) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    // Apply rate limiting for create operations
    const req = await request();
    const decision = await aj.protect(req, { userId, requested: 1 });
    
    if (decision.isDenied()) {
      throw new Error("Rate limit exceeded");
    }

    // Implementation...
  } catch (error) {
    throw new Error(error.message);
  }
}
```

#### Step 2: Add Validation Schema
```javascript
// app/lib/schema.js
import { z } from "zod";

export const newFeatureSchema = z.object({
  name: z.string().min(1, "Name is required"),
  amount: z.string().min(1, "Amount is required"),
  // Add other validations
});
```

#### Step 3: Create Form Component
```jsx
// components/new-feature-form.jsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useFetch from "@/hooks/use-fetch";
import { createSomething } from "@/actions/new-feature";
import { newFeatureSchema } from "@/app/lib/schema";

export function NewFeatureForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(newFeatureSchema)
  });

  const {
    loading,
    fn: createFn,
    error,
    data
  } = useFetch(createSomething);

  const onSubmit = async (formData) => {
    await createFn(formData);
  };

  // Handle success/error effects
  useEffect(() => {
    if (data?.success) {
      toast.success("Created successfully");
    }
  }, [data]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
}
```

### Database Operations

#### Prisma Best Practices

1. **Always Use Transactions for Related Operations**
```javascript
await db.$transaction(async (tx) => {
  const account = await tx.account.update({
    where: { id: accountId },
    data: { balance: { increment: amount } }
  });

  const transaction = await tx.transaction.create({
    data: { accountId, amount, userId }
  });

  return { account, transaction };
});
```

2. **Serialize Decimal Values**
```javascript
const serializeDecimal = (obj) => ({
  ...obj,
  amount: obj.amount?.toNumber(),
  balance: obj.balance?.toNumber()
});
```

3. **Include Related Data Efficiently**
```javascript
const account = await db.account.findUnique({
  where: { id: accountId },
  include: {
    transactions: {
      orderBy: { date: "desc" },
      take: 50 // Limit for performance
    },
    _count: {
      select: { transactions: true }
    }
  }
});
```

### Error Handling

#### Consistent Error Patterns
```javascript
// In Server Actions
export async function riskyOperation(data) {
  try {
    // Operation logic
    return { success: true, data: result };
  } catch (error) {
    // Log error for debugging
    console.error("Operation failed:", error);
    
    // Throw user-friendly error
    throw new Error("Failed to complete operation");
  }
}

// In Components
const { error } = useFetch(riskyOperation);

useEffect(() => {
  if (error) {
    toast.error(error.message);
  }
}, [error]);
```

#### API Route Error Handling
```javascript
// app/api/example/route.js
export async function POST(request) {
  try {
    const data = await request.json();
    const result = await processData(data);
    return Response.json({ success: true, data: result });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

## Component Development

### Creating Reusable Components

#### Base UI Component Pattern
```jsx
// components/ui/new-component.jsx
import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Define variants
const newComponentVariants = cva(
  "base classes here",
  {
    variants: {
      variant: {
        default: "default styles",
        secondary: "secondary styles"
      },
      size: {
        default: "default size",
        sm: "small size",
        lg: "large size"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

// Component interface
interface NewComponentProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof newComponentVariants> {
  // Additional props
}

// Component implementation
const NewComponent = forwardRef<HTMLDivElement, NewComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(newComponentVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

NewComponent.displayName = "NewComponent";

export { NewComponent, newComponentVariants };
```

#### Application Component Pattern
```jsx
// components/feature-component.jsx
"use client";

import { useState, useEffect } from "react";
import useFetch from "@/hooks/use-fetch";
import { Button } from "@/components/ui/button";
import { someAction } from "@/actions/some-action";

interface FeatureComponentProps {
  // Define props
  data: SomeType;
  onUpdate?: (data: SomeType) => void;
}

export function FeatureComponent({ data, onUpdate }: FeatureComponentProps) {
  // State management
  const [localState, setLocalState] = useState();

  // API integration
  const { loading, fn, error, data: result } = useFetch(someAction);

  // Effects
  useEffect(() => {
    if (result?.success) {
      onUpdate?.(result.data);
      toast.success("Operation completed");
    }
  }, [result, onUpdate]);

  // Event handlers
  const handleAction = async () => {
    await fn(data.id);
  };

  // Render
  return (
    <div className="space-y-4">
      {/* Component content */}
      <Button onClick={handleAction} disabled={loading}>
        {loading ? "Processing..." : "Action"}
      </Button>
    </div>
  );
}
```

### Custom Hooks

#### Creating Domain-Specific Hooks
```javascript
// hooks/use-accounts.js
import { useState, useEffect } from "react";
import useFetch from "./use-fetch";
import { getUserAccounts } from "@/actions/dashboard";

export function useAccounts() {
  const {
    data: accounts,
    loading,
    error,
    fn: fetchAccounts
  } = useFetch(getUserAccounts);

  // Derived state
  const defaultAccount = accounts?.find(acc => acc.isDefault);
  const totalBalance = accounts?.reduce((sum, acc) => sum + acc.balance, 0);

  // Methods
  const refreshAccounts = () => fetchAccounts();

  // Initial load
  useEffect(() => {
    fetchAccounts();
  }, []);

  return {
    accounts: accounts || [],
    defaultAccount,
    totalBalance,
    loading,
    error,
    refreshAccounts
  };
}
```

## Testing

### Unit Testing Components
```javascript
// __tests__/components/Button.test.jsx
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders with default variant", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-primary");
  });

  it("applies variant classes correctly", () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-destructive");
  });
});
```

### Testing Server Actions
```javascript
// __tests__/actions/transaction.test.js
import { createTransaction } from "@/actions/transaction";
import { db } from "@/lib/prisma";

// Mock dependencies
jest.mock("@clerk/nextjs/server");
jest.mock("@/lib/prisma");

describe("createTransaction", () => {
  beforeEach(() => {
    // Setup mocks
    require("@clerk/nextjs/server").auth.mockResolvedValue({
      userId: "user_123"
    });
  });

  it("creates transaction successfully", async () => {
    const transactionData = {
      type: "EXPENSE",
      amount: "25.99",
      description: "Coffee",
      accountId: "acc_123",
      category: "food",
      date: new Date()
    };

    db.user.findUnique.mockResolvedValue({ id: "user_123" });
    db.account.findUnique.mockResolvedValue({ 
      id: "acc_123", 
      balance: 1000 
    });

    const result = await createTransaction(transactionData);
    expect(result.success).toBe(true);
  });
});
```

## Performance Optimization

### Component Optimization

1. **Use React.memo for Expensive Components**
```jsx
import { memo } from "react";

const ExpensiveComponent = memo(({ data }) => {
  // Heavy computation or rendering
  return <div>{/* component content */}</div>;
});
```

2. **Optimize Re-renders with useCallback**
```jsx
const handleSubmit = useCallback(async (data) => {
  await submitFn(data);
}, [submitFn]);
```

3. **Lazy Load Heavy Components**
```jsx
import { lazy, Suspense } from "react";

const HeavyChart = lazy(() => import("./HeavyChart"));

function Dashboard() {
  return (
    <Suspense fallback={<div>Loading chart...</div>}>
      <HeavyChart />
    </Suspense>
  );
}
```

### Database Optimization

1. **Use Efficient Queries**
```javascript
// Good: Specific fields and limits
const transactions = await db.transaction.findMany({
  select: {
    id: true,
    amount: true,
    description: true,
    date: true,
    category: true
  },
  take: 50,
  orderBy: { date: "desc" }
});

// Avoid: Fetching all fields without limits
const transactions = await db.transaction.findMany();
```

2. **Implement Pagination**
```javascript
export async function getTransactions(page = 1, limit = 20) {
  const skip = (page - 1) * limit;
  
  const [transactions, total] = await Promise.all([
    db.transaction.findMany({
      skip,
      take: limit,
      orderBy: { date: "desc" }
    }),
    db.transaction.count()
  ]);

  return {
    transactions,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  };
}
```

## Security Best Practices

### Authentication & Authorization

1. **Always Verify User Identity**
```javascript
export async function protectedAction(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Verify user owns the resource
  const resource = await db.resource.findFirst({
    where: { id: data.resourceId, userId }
  });

  if (!resource) throw new Error("Resource not found");
}
```

2. **Use Rate Limiting**
```javascript
// For create/update operations
const decision = await aj.protect(req, { userId, requested: 1 });
if (decision.isDenied()) {
  throw new Error("Rate limit exceeded");
}
```

### Input Validation

1. **Server-Side Validation**
```javascript
import { z } from "zod";

const schema = z.object({
  amount: z.number().positive().max(1000000),
  description: z.string().max(500).optional()
});

export async function createTransaction(data) {
  // Validate input
  const validatedData = schema.parse(data);
  // Process...
}
```

2. **Sanitize User Input**
```javascript
import DOMPurify from "dompurify";

const sanitizedDescription = DOMPurify.sanitize(description);
```

## Deployment

### Environment Configuration

```bash
# Production environment variables
NODE_ENV=production
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
DATABASE_URL=postgresql://prod_db_url
GEMINI_API_KEY=prod_gemini_key
ARCJET_KEY=prod_arcjet_key
```

### Build Optimization

```javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features
  experimental: {
    optimizePackageImports: ['lucide-react']
  },
  
  // Bundle analyzer
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config) => {
      config.plugins.push(new BundleAnalyzerPlugin());
      return config;
    }
  })
};
```

### Database Migrations

```bash
# Generate migration
npx prisma migrate dev --name add_new_feature

# Deploy to production
npx prisma migrate deploy

# Generate client
npx prisma generate
```

## Common Patterns

### Form Handling Pattern
```jsx
export function GenericForm({ onSubmit, schema, children }) {
  const form = useForm({
    resolver: zodResolver(schema)
  });

  const { loading, fn, error } = useFetch(onSubmit);

  const handleSubmit = async (data) => {
    await fn(data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        {children}
        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </FormProvider>
  );
}
```

### Data Fetching Pattern
```jsx
export function DataProvider({ children, fetchFn }) {
  const { data, loading, error, fn } = useFetch(fetchFn);

  useEffect(() => {
    fn();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return children({ data, refetch: fn });
}
```

### Modal Pattern
```jsx
export function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return { isOpen, open, close };
}
```

This developer guide provides the foundation for building, extending, and maintaining the finance platform. Follow these patterns and practices to ensure consistency, security, and performance.