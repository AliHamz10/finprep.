# Finance Platform API Documentation

## Table of Contents

1. [Overview](#overview)
2. [Server Actions (APIs)](#server-actions-apis)
3. [React Components](#react-components)
4. [Custom Hooks](#custom-hooks)
5. [Utility Functions](#utility-functions)
6. [Data Models & Schemas](#data-models--schemas)
7. [API Routes](#api-routes)
8. [Configuration](#configuration)

## Overview

This is a comprehensive Next.js finance platform application built with:
- **Framework**: Next.js 15 with App Router
- **Authentication**: Clerk
- **Database**: Prisma with PostgreSQL
- **UI**: Tailwind CSS with Radix UI components
- **Security**: ArcJet for rate limiting
- **AI**: Google Gemini for receipt scanning

## Server Actions (APIs)

### Account Management

#### `getUserAccounts()`
Retrieves all user accounts with transaction counts.

```javascript
import { getUserAccounts } from "@/actions/dashboard";

// Usage
const accounts = await getUserAccounts();
// Returns: Array of account objects with serialized balances
```

#### `createAccount(data)`
Creates a new account for the authenticated user.

```javascript
import { createAccount } from "@/actions/dashboard";

// Usage
const accountData = {
  name: "Main Checking",
  type: "CURRENT", // or "SAVINGS"
  balance: "1000.50",
  isDefault: true
};

const result = await createAccount(accountData);
// Returns: { success: true, data: Account } | throws error
```

#### `getAccountWithTransactions(accountId)`
Gets account details with all associated transactions.

```javascript
import { getAccountWithTransactions } from "@/actions/account";

// Usage
const account = await getAccountWithTransactions("account-id");
// Returns: Account object with transactions array
```

#### `updateDefaultAccount(accountId)`
Sets an account as the default account.

```javascript
import { updateDefaultAccount } from "@/actions/account";

// Usage
const result = await updateDefaultAccount("account-id");
// Returns: { success: true, data: Account } | { success: false, error: string }
```

#### `bulkDeleteTransactions(transactionIds)`
Deletes multiple transactions and updates account balances.

```javascript
import { bulkDeleteTransactions } from "@/actions/account";

// Usage
const result = await bulkDeleteTransactions(["tx1", "tx2", "tx3"]);
// Returns: { success: true } | { success: false, error: string }
```

### Transaction Management

#### `createTransaction(data)`
Creates a new transaction with rate limiting protection.

```javascript
import { createTransaction } from "@/actions/transaction";

// Usage
const transactionData = {
  type: "EXPENSE", // or "INCOME"
  amount: 25.99,
  description: "Coffee shop",
  date: new Date(),
  accountId: "account-id",
  category: "food",
  isRecurring: false,
  recurringInterval: null // "DAILY", "WEEKLY", "MONTHLY", "YEARLY" if recurring
};

const result = await createTransaction(transactionData);
// Returns: { success: true, data: Transaction } | throws error
```

#### `getTransaction(id)`
Retrieves a specific transaction by ID.

```javascript
import { getTransaction } from "@/actions/transaction";

// Usage
const transaction = await getTransaction("transaction-id");
// Returns: Transaction object with serialized amount
```

#### `updateTransaction(id, data)`
Updates an existing transaction and recalculates account balances.

```javascript
import { updateTransaction } from "@/actions/transaction";

// Usage
const result = await updateTransaction("transaction-id", transactionData);
// Returns: { success: true, data: Transaction } | throws error
```

#### `getUserTransactions(query)`
Retrieves user transactions with optional filtering.

```javascript
import { getUserTransactions } from "@/actions/transaction";

// Usage
const result = await getUserTransactions({
  type: "EXPENSE",
  category: "food"
});
// Returns: { success: true, data: Transaction[] } | throws error
```

#### `scanReceipt(file)`
Uses Google Gemini AI to extract transaction data from receipt images.

```javascript
import { scanReceipt } from "@/actions/transaction";

// Usage (in a form handler)
const handleReceiptScan = async (file) => {
  try {
    const extractedData = await scanReceipt(file);
    // Returns: {
    //   amount: number,
    //   date: Date,
    //   description: string,
    //   category: string,
    //   merchantName: string
    // }
  } catch (error) {
    console.error("Receipt scan failed:", error.message);
  }
};
```

### Budget Management

#### `getCurrentBudget(accountId)`
Gets current budget and monthly expenses for an account.

```javascript
import { getCurrentBudget } from "@/actions/budget";

// Usage
const budgetData = await getCurrentBudget("account-id");
// Returns: {
//   budget: { amount: number } | null,
//   currentExpenses: number
// }
```

#### `updateBudget(amount)`
Creates or updates the user's budget.

```javascript
import { updateBudget } from "@/actions/budget";

// Usage
const result = await updateBudget(1500.00);
// Returns: { success: true, data: Budget } | { success: false, error: string }
```

### Dashboard Data

#### `getDashboardData()`
Retrieves all user transactions for dashboard display.

```javascript
import { getDashboardData } from "@/actions/dashboard";

// Usage
const transactions = await getDashboardData();
// Returns: Array of serialized transactions
```

## React Components

### UI Components

#### `<Button />`
Versatile button component with multiple variants and sizes.

```jsx
import { Button } from "@/components/ui/button";

// Basic usage
<Button>Default Button</Button>

// With variants
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Subtle</Button>

// With sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>

// As child component
<Button asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>
```

**Props:**
- `variant`: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
- `size`: "default" | "sm" | "lg" | "icon"
- `asChild`: boolean - renders as child component

#### `<Card />` Components
Card layout components for content organization.

```jsx
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Account Balance</CardTitle>
  </CardHeader>
  <CardContent>
    <p>$1,234.56</p>
  </CardContent>
  <CardFooter>
    <Button>View Details</Button>
  </CardFooter>
</Card>
```

#### `<Select />` Components
Dropdown selection component.

```jsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

<Select onValueChange={(value) => setValue("category", value)}>
  <SelectTrigger>
    <SelectValue placeholder="Select category" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="food">Food</SelectItem>
    <SelectItem value="transport">Transport</SelectItem>
  </SelectContent>
</Select>
```

#### `<Input />`
Styled input component.

```jsx
import { Input } from "@/components/ui/input";

<Input
  type="text"
  placeholder="Account name"
  {...register("name")}
/>

<Input
  type="number"
  step="0.01"
  placeholder="0.00"
  {...register("amount")}
/>
```

#### `<Switch />`
Toggle switch component.

```jsx
import { Switch } from "@/components/ui/switch";

<Switch
  checked={isDefault}
  onCheckedChange={(checked) => setValue("isDefault", checked)}
/>
```

### Application Components

#### `<Header />`
Main navigation header with authentication.

```jsx
import Header from "@/components/header";

// Usage (automatically handles auth state)
<Header />
```

**Features:**
- Clerk authentication integration
- Responsive navigation
- Dashboard and transaction links
- User profile dropdown

#### `<CreateAccountDrawer />`
Drawer component for creating new accounts.

```jsx
import { CreateAccountDrawer } from "@/components/create-account-drawer";

<CreateAccountDrawer>
  <Button>Create Account</Button>
</CreateAccountDrawer>
```

**Features:**
- Form validation with Zod schema
- Account type selection (CURRENT/SAVINGS)
- Default account toggle
- Automatic success handling

#### `<AccountCard />`
Dashboard component for displaying account information.

```jsx
import { AccountCard } from "@/app/(main)/dashboard/_components/account-card";

<AccountCard account={accountData} />
```

**Props:**
- `account`: Account object with balance, name, type, isDefault

**Features:**
- Balance display with formatting
- Default account toggle
- Navigation to account details
- Real-time updates

#### `<AddTransactionForm />`
Comprehensive form for creating/editing transactions.

```jsx
import { AddTransactionForm } from "@/app/(main)/transaction/_components/transaction-form";

<AddTransactionForm
  accounts={userAccounts}
  categories={categories}
  editMode={false}
  initialData={null}
/>
```

**Props:**
- `accounts`: Array of user accounts
- `categories`: Array of transaction categories
- `editMode`: boolean for edit vs create mode
- `initialData`: Transaction data for editing

**Features:**
- Receipt scanning with AI
- Recurring transaction support
- Category selection
- Account selection
- Date picker
- Form validation

#### `<ReceiptScanner />`
AI-powered receipt scanning component.

```jsx
import { ReceiptScanner } from "@/app/(main)/transaction/_components/recipt-scanner";

<ReceiptScanner onScan={(data) => populateForm(data)} />
```

**Props:**
- `onScan`: Callback function receiving extracted transaction data

## Custom Hooks

#### `useFetch(callback)`
Custom hook for handling async operations with loading states.

```javascript
import useFetch from "@/hooks/use-fetch";
import { createAccount } from "@/actions/dashboard";

const MyComponent = () => {
  const {
    data,        // Response data
    loading,     // Loading state
    error,       // Error state
    fn,          // Function to call
    setData      // Direct data setter
  } = useFetch(createAccount);

  const handleSubmit = async (formData) => {
    await fn(formData);
  };

  useEffect(() => {
    if (data) {
      toast.success("Success!");
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <Button onClick={handleSubmit} disabled={loading}>
      {loading ? "Creating..." : "Create"}
    </Button>
  );
};
```

## Utility Functions

#### `cn(...inputs)`
Utility for merging Tailwind classes with conflict resolution.

```javascript
import { cn } from "@/lib/utils";

// Usage
const buttonClass = cn(
  "px-4 py-2",
  variant === "primary" && "bg-blue-500",
  variant === "secondary" && "bg-gray-500",
  className
);
```

#### `checkUser()`
Authentication utility that creates or retrieves user from database.

```javascript
import { checkUser } from "@/lib/checkUser";

// Usage in server components
const user = await checkUser();
// Returns: User object | null

// Automatically:
// - Gets current Clerk user
// - Creates DB user if doesn't exist
// - Returns existing DB user if found
```

#### Database Connection
Prisma client with development optimization.

```javascript
import { db } from "@/lib/prisma";

// Usage
const accounts = await db.account.findMany({
  where: { userId: user.id }
});
```

## Data Models & Schemas

### Validation Schemas

#### Account Schema
```javascript
import { accountSchema } from "@/app/lib/schema";

// Validates:
{
  name: string (required),
  type: "CURRENT" | "SAVINGS",
  balance: string (required),
  isDefault: boolean (default: false)
}
```

#### Transaction Schema
```javascript
import { transactionSchema } from "@/app/lib/schema";

// Validates:
{
  type: "INCOME" | "EXPENSE",
  amount: string (required),
  description?: string,
  date: Date (required),
  accountId: string (required),
  category: string (required),
  isRecurring: boolean (default: false),
  recurringInterval?: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY"
}

// Custom validation: recurring transactions must have interval
```

### Categories Data

#### Default Categories
```javascript
import { defaultCategories, categoryColors } from "@/data/categories";

// Income categories: salary, freelance, investments, business, rental, other-income
// Expense categories: housing, transportation, groceries, utilities, entertainment, food, shopping, healthcare, education, personal, travel, insurance, gifts, bills, other-expense

// Each category includes:
{
  id: string,
  name: string,
  type: "INCOME" | "EXPENSE",
  color: string, // hex color
  icon: string,  // Lucide icon name
  subcategories?: string[] // optional subcategories
}
```

## API Routes

#### `/api/seed` - GET
Seeds the database with sample transactions.

```javascript
// Usage
const response = await fetch('/api/seed');
const result = await response.json();
```

#### `/api/inngest` - POST
Webhook endpoint for Inngest background jobs.

## Configuration

### Rate Limiting (ArcJet)
Configured with token bucket algorithm:

```javascript
// lib/arcjet.js
- Mode: LIVE
- Refill Rate: 10 tokens per hour
- Capacity: 10 tokens maximum
- Tracking: By Clerk userId
```

Applied to:
- Account creation
- Transaction creation

### Environment Variables Required

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Database
DATABASE_URL=

# AI Features
GEMINI_API_KEY=

# Security
ARCJET_KEY=

# Email (if used)
RESEND_API_KEY=
```

### Next.js Configuration

```javascript
// next.config.mjs
- Turbopack enabled for development
- Bundle analyzer support
- Optimized for production builds
```

## Usage Examples

### Complete Transaction Flow

```javascript
// 1. Get user accounts
const accounts = await getUserAccounts();

// 2. Create transaction
const transactionData = {
  type: "EXPENSE",
  amount: "45.99",
  description: "Grocery shopping",
  date: new Date(),
  accountId: accounts[0].id,
  category: "groceries"
};

const result = await createTransaction(transactionData);

// 3. Verify account balance updated
const updatedAccount = await getAccountWithTransactions(accounts[0].id);
console.log("New balance:", updatedAccount.balance);
```

### Receipt Scanning Workflow

```javascript
// 1. Scan receipt
const file = event.target.files[0];
const extractedData = await scanReceipt(file);

// 2. Create transaction with extracted data
const transactionData = {
  ...extractedData,
  type: "EXPENSE",
  accountId: selectedAccountId
};

const result = await createTransaction(transactionData);
```

### Budget Monitoring

```javascript
// 1. Set budget
await updateBudget(1500.00);

// 2. Check current spending
const { budget, currentExpenses } = await getCurrentBudget(accountId);

// 3. Calculate remaining budget
const remaining = budget.amount - currentExpenses;
const percentage = (currentExpenses / budget.amount) * 100;
```

This documentation provides complete coverage of all public APIs, components, and utilities in the finance platform. Each section includes practical examples and usage instructions for developers integrating with or extending the application.