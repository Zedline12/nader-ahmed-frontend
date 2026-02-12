"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  DollarSign,
  Users,
  BookOpen,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
} from "lucide-react";

// Mock Data
const revenueData = [
  { month: "Jan", revenue: 2400 },
  { month: "Feb", revenue: 1398 },
  { month: "Mar", revenue: 9800 },
  { month: "Apr", revenue: 3908 },
  { month: "May", revenue: 4800 },
  { month: "Jun", revenue: 3800 },
  { month: "Jul", revenue: 4300 },
];

const activityData = [
  { day: "Mon", active: 240 },
  { day: "Tue", active: 139 },
  { day: "Wed", active: 980 },
  { day: "Thu", active: 390 },
  { day: "Fri", active: 480 },
  { day: "Sat", active: 380 },
  { day: "Sun", active: 430 },
];

const recentSales = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+$1,999.00",
    course: "UX/UI Design Masterclass",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "+$39.00",
    course: "React for Beginners",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "+$299.00",
    course: "Advanced Backend Development",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    amount: "+$99.00",
    course: "Figma Fundamentals",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "+$39.00",
    course: "React for Beginners",
  },
];

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-primary">
          Dashboard
        </h2>
        <div className="flex items-center space-x-2">
          {/* Date Range Picker Could Go Here */}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-background-light border-background-lighter">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary-foreground">
              $45,231.89
            </div>
            <p className="text-xs text-muted-foreground flex items-center pt-1">
              <span className="text-emerald-500 flex items-center mr-1">
                +20.1% <ArrowUpRight className="h-3 w-3 ml-0.5" />
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-background-light border-background-lighter">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Subscriptions
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary-foreground">
              +2350
            </div>
            <p className="text-xs text-muted-foreground flex items-center pt-1">
              <span className="text-emerald-500 flex items-center mr-1">
                +180.1% <ArrowUpRight className="h-3 w-3 ml-0.5" />
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-background-light border-background-lighter">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Sales
            </CardTitle>
            <CreditCard className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary-foreground">
              +12,234
            </div>
            <p className="text-xs text-muted-foreground flex items-center pt-1">
              <span className="text-emerald-500 flex items-center mr-1">
                +19% <ArrowUpRight className="h-3 w-3 ml-0.5" />
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-background-light border-background-lighter">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Now
            </CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary-foreground">
              +573
            </div>
            <p className="text-xs text-muted-foreground flex items-center pt-1">
              <span className="text-rose-500 flex items-center mr-1">
                -4% <ArrowDownRight className="h-3 w-3 ml-0.5" />
              </span>
              since last hour
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Main Chart */}
        <Card className="col-span-4 bg-background-light border-background-lighter">
          <CardHeader>
            <CardTitle className="text-primary-foreground">
              Revenue Growth
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Monthly revenue overview for the current year.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2"></CardContent>
        </Card>

        {/* Recent Sales / Activity */}
        <Card className="col-span-3 bg-background-light border-background-lighter">
          <CardHeader>
            <CardTitle className="text-primary-foreground">
              Recent Sales
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              You made 265 sales this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {recentSales.map((sale, idx) => (
                <div className="flex items-center" key={idx}>
                  <div className="h-9 w-9 rounded-full bg-background-lighter flex items-center justify-center border border-background-lightest">
                    <span className="font-bold text-xs text-primary">
                      {sale.name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none text-primary-foreground">
                      {sale.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {sale.email}
                    </p>
                  </div>
                  <div className="ml-auto font-medium text-primary-foreground">
                    {sale.amount}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Chart Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card className="bg-background-light border-background-lighter">
          <CardHeader>
            <CardTitle className="text-primary-foreground">
              Weekly Student Activity
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Active students per day over the last week.
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </div>
  );
}
