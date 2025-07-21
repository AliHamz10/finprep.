# Component Reference Guide

## UI Component Library

This reference provides detailed documentation for all reusable UI components in the finance platform.

## Base Components

### Button

A versatile button component built on Radix UI with multiple variants and sizes.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "destructive" \| "outline" \| "secondary" \| "ghost" \| "link"` | `"default"` | Visual style variant |
| `size` | `"default" \| "sm" \| "lg" \| "icon"` | `"default"` | Size preset |
| `asChild` | `boolean` | `false` | Render as child element (polymorphic) |
| `className` | `string` | - | Additional CSS classes |
| `disabled` | `boolean` | `false` | Disable button interactions |

#### Usage Examples

```jsx
// Basic buttons
<Button>Primary Action</Button>
<Button variant="outline">Secondary Action</Button>
<Button variant="destructive">Delete</Button>
<Button variant="ghost">Subtle Action</Button>
<Button variant="link">Link Style</Button>

// Sizes
<Button size="sm">Small Button</Button>
<Button size="lg">Large Button</Button>
<Button size="icon"><Plus size={16} /></Button>

// Loading state
<Button disabled={loading}>
  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
  {loading ? "Loading..." : "Submit"}
</Button>

// As link (Next.js)
<Button asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>
```

#### Styling

The button uses class-variance-authority (CVA) for systematic styling:

```javascript
const buttonVariants = cva(
  // Base styles
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    }
  }
);
```

### Input

Styled input component with consistent theming.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `"text"` | HTML input type |
| `placeholder` | `string` | - | Placeholder text |
| `className` | `string` | - | Additional CSS classes |
| `disabled` | `boolean` | `false` | Disable input |

#### Usage Examples

```jsx
// Text input
<Input 
  type="text" 
  placeholder="Enter account name"
  {...register("name")}
/>

// Number input
<Input 
  type="number" 
  step="0.01" 
  placeholder="0.00"
  {...register("amount")}
/>

// With error state
<Input 
  type="email" 
  placeholder="Email address"
  className={errors.email ? "border-red-500" : ""}
  {...register("email")}
/>
```

### Card Components

Flexible card layout components for content organization.

#### Card

Base card container.

```jsx
<Card className="w-full max-w-md">
  {/* Card content */}
</Card>
```

#### CardHeader

Card header section with optional title.

```jsx
<CardHeader>
  <CardTitle>Account Balance</CardTitle>
  <CardDescription>Current month overview</CardDescription>
</CardHeader>
```

#### CardContent

Main content area of the card.

```jsx
<CardContent>
  <div className="text-2xl font-bold">$1,234.56</div>
  <p className="text-muted-foreground">+2.5% from last month</p>
</CardContent>
```

#### CardFooter

Footer section for actions or additional info.

```jsx
<CardFooter>
  <Button className="w-full">View Details</Button>
</CardFooter>
```

#### Complete Example

```jsx
<Card>
  <CardHeader>
    <CardTitle>Checking Account</CardTitle>
    <CardDescription>Main account • ****1234</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold">$2,847.92</div>
    <div className="flex items-center text-sm text-muted-foreground">
      <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
      +$147.92 this week
    </div>
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="outline" size="sm">Transfer</Button>
    <Button size="sm">View Transactions</Button>
  </CardFooter>
</Card>
```

### Select Components

Dropdown selection component built on Radix UI.

#### Basic Usage

```jsx
<Select onValueChange={(value) => setValue("category", value)}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Select a category" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="food">Food & Dining</SelectItem>
    <SelectItem value="transport">Transportation</SelectItem>
    <SelectItem value="shopping">Shopping</SelectItem>
  </SelectContent>
</Select>
```

#### With Categories (Finance App Context)

```jsx
<Select onValueChange={(value) => setValue("category", value)}>
  <SelectTrigger>
    <SelectValue placeholder="Transaction category" />
  </SelectTrigger>
  <SelectContent>
    {defaultCategories
      .filter(cat => cat.type === transactionType)
      .map(category => (
        <SelectItem key={category.id} value={category.id}>
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: category.color }}
            />
            {category.name}
          </div>
        </SelectItem>
      ))
    }
  </SelectContent>
</Select>
```

### Switch

Toggle switch component for boolean settings.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | - | Controlled checked state |
| `onCheckedChange` | `(checked: boolean) => void` | - | Change handler |
| `disabled` | `boolean` | `false` | Disable interactions |

#### Usage Examples

```jsx
// Basic toggle
<Switch 
  checked={isRecurring}
  onCheckedChange={setIsRecurring}
/>

// With label layout
<div className="flex items-center justify-between">
  <div>
    <label className="text-sm font-medium">Set as Default Account</label>
    <p className="text-sm text-muted-foreground">
      This account will be used for new transactions
    </p>
  </div>
  <Switch 
    checked={isDefault}
    onCheckedChange={(checked) => setValue("isDefault", checked)}
  />
</div>
```

### Calendar & Date Components

Date selection components for forms.

#### Calendar

```jsx
import { Calendar } from "@/components/ui/calendar";

<Calendar
  mode="single"
  selected={selectedDate}
  onSelect={setSelectedDate}
  disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
  initialFocus
/>
```

#### Popover Date Picker

```jsx
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline" className={cn(
      "w-full justify-start text-left font-normal",
      !date && "text-muted-foreground"
    )}>
      <CalendarIcon className="mr-2 h-4 w-4" />
      {date ? format(date, "PPP") : "Pick a date"}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0">
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      initialFocus
    />
  </PopoverContent>
</Popover>
```

### Badge

Small status indicators and labels.

#### Usage Examples

```jsx
// Status badges
<Badge variant="default">Active</Badge>
<Badge variant="secondary">Pending</Badge>
<Badge variant="destructive">Overdue</Badge>
<Badge variant="outline">Draft</Badge>

// Account type badge
<Badge variant={account.type === "SAVINGS" ? "secondary" : "default"}>
  {account.type}
</Badge>

// Transaction type with color
<Badge variant={transaction.type === "INCOME" ? "default" : "destructive"}>
  {transaction.type}
</Badge>
```

### Progress

Progress indicators for budgets and goals.

#### Basic Usage

```jsx
<Progress value={progressPercentage} className="w-full" />
```

#### Budget Progress Example

```jsx
const progressPercentage = (currentExpenses / budget.amount) * 100;
const isOverBudget = progressPercentage > 100;

<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span>Budget Progress</span>
    <span className={isOverBudget ? "text-red-500" : "text-muted-foreground"}>
      {progressPercentage.toFixed(1)}%
    </span>
  </div>
  <Progress 
    value={Math.min(progressPercentage, 100)} 
    className={cn(
      "w-full h-2",
      isOverBudget && "bg-red-100"
    )}
  />
  <div className="flex justify-between text-xs text-muted-foreground">
    <span>${currentExpenses.toFixed(2)} spent</span>
    <span>${budget.amount.toFixed(2)} budget</span>
  </div>
</div>
```

### Table Components

Data table components for displaying transaction lists.

#### Basic Table Structure

```jsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Date</TableHead>
      <TableHead>Description</TableHead>
      <TableHead>Category</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {transactions.map((transaction) => (
      <TableRow key={transaction.id}>
        <TableCell>{format(transaction.date, "MMM dd")}</TableCell>
        <TableCell>{transaction.description}</TableCell>
        <TableCell>
          <Badge variant="outline">{transaction.category}</Badge>
        </TableCell>
        <TableCell className="text-right">
          <span className={cn(
            "font-medium",
            transaction.type === "INCOME" ? "text-green-600" : "text-red-600"
          )}>
            {transaction.type === "INCOME" ? "+" : "-"}
            ${transaction.amount.toFixed(2)}
          </span>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

### Drawer

Mobile-optimized drawer component using Vaul.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | - | Open state change handler |
| `children` | `ReactNode` | - | Drawer content |

#### Complete Example

```jsx
<Drawer open={isOpen} onOpenChange={setIsOpen}>
  <DrawerTrigger asChild>
    <Button>Create Account</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Create New Account</DrawerTitle>
      <DrawerDescription>
        Add a new account to track your finances
      </DrawerDescription>
    </DrawerHeader>
    <div className="px-4 pb-4">
      {/* Form content */}
    </div>
    <DrawerFooter>
      <Button type="submit">Create Account</Button>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

## Application-Specific Components

### AccountCard

Displays account information with balance and quick actions.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `account` | `Account` | Account object with id, name, type, balance, isDefault |

#### Features

- Balance display with color coding
- Default account toggle
- Account type badge
- Click to navigate to account details
- Loading states for updates

#### Usage

```jsx
<AccountCard 
  account={{
    id: "acc_123",
    name: "Main Checking",
    type: "CURRENT",
    balance: 2847.92,
    isDefault: true,
    _count: { transactions: 24 }
  }}
/>
```

### CreateAccountDrawer

Form drawer for creating new accounts.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | Trigger element (usually a button) |

#### Features

- Zod schema validation
- Account type selection
- Default account toggle
- Balance input with validation
- Success/error handling
- Form reset on success

#### Usage

```jsx
<CreateAccountDrawer>
  <Button>
    <Plus className="mr-2 h-4 w-4" />
    Add Account
  </Button>
</CreateAccountDrawer>
```

### AddTransactionForm

Comprehensive form for creating and editing transactions.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `accounts` | `Account[]` | Available user accounts |
| `categories` | `Category[]` | Transaction categories |
| `editMode` | `boolean` | Whether in edit mode |
| `initialData` | `Transaction \| null` | Initial data for editing |

#### Features

- Receipt scanning with AI
- Account selection
- Category selection with colors
- Date picker
- Recurring transaction settings
- Form validation
- Success/error handling

#### Usage

```jsx
<AddTransactionForm
  accounts={userAccounts}
  categories={defaultCategories}
  editMode={false}
  initialData={null}
/>
```

### ReceiptScanner

AI-powered receipt scanning component.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `onScan` | `(data: ScanResult) => void` | Callback with extracted data |

#### Features

- File upload handling
- Image preview
- AI processing with loading states
- Error handling
- Data extraction and formatting

#### Usage

```jsx
<ReceiptScanner 
  onScan={(data) => {
    setValue("amount", data.amount.toString());
    setValue("description", data.description);
    setValue("category", data.category);
    setValue("date", data.date);
  }}
/>
```

## Styling Guidelines

### Design Tokens

The application uses CSS custom properties for consistent theming:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96%;
  --accent-foreground: 222.2 84% 4.9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 221.2 83.2% 53.3%;
  --radius: 0.5rem;
}
```

### Component Patterns

#### Form Layout

```jsx
<form className="space-y-4">
  <div className="space-y-2">
    <label className="text-sm font-medium">Field Label</label>
    <Input {...register("field")} />
    {errors.field && (
      <p className="text-sm text-red-500">{errors.field.message}</p>
    )}
  </div>
</form>
```

#### Loading States

```jsx
<Button disabled={loading}>
  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
  {loading ? "Processing..." : "Submit"}
</Button>
```

#### Responsive Design

```jsx
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  {/* Responsive grid items */}
</div>
```

#### Color Coding

```jsx
// Transaction amounts
<span className={cn(
  "font-medium",
  type === "INCOME" ? "text-green-600" : "text-red-600"
)}>
  {type === "INCOME" ? "+" : "-"}${amount}
</span>

// Status indicators
<Badge variant={status === "active" ? "default" : "secondary"}>
  {status}
</Badge>
```

This component reference provides comprehensive documentation for building consistent, accessible, and well-styled interfaces in the finance platform.