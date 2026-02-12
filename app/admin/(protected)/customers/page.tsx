"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MoreHorizontal,
  Mail,
  Calendar,
  MapPin,
  DollarSign,
} from "lucide-react";

// Realistic Mock Customers Data
const CUSTOMERS = [
  {
    id: "CUST-001",
    name: "Ahmed Hassan",
    email: "ahmed.hassan@example.com",
    avatar: "",
    joinDate: "2023-11-15",
    totalSpent: 450.0,
    coursesEnrolled: 3,
    location: "Cairo, Egypt",
    status: "Active",
  },
  {
    id: "CUST-002",
    name: "Sara Ali",
    email: "sara.ali@example.com",
    avatar: "/assets/img/avatars/2.png",
    joinDate: "2024-01-20",
    totalSpent: 89.99,
    coursesEnrolled: 1,
    location: "Giza, Egypt",
    status: "Active",
  },
  {
    id: "CUST-003",
    name: "Omar Khaled",
    email: "omar.k@example.com",
    avatar: "",
    joinDate: "2023-12-05",
    totalSpent: 1250.5,
    coursesEnrolled: 8,
    location: "Alexandria, Egypt",
    status: "Inactive",
  },
  {
    id: "CUST-004",
    name: "Nour El-Din",
    email: "nour.el@example.com",
    avatar: "/assets/img/avatars/4.png",
    joinDate: "2024-02-14",
    totalSpent: 299.0,
    coursesEnrolled: 2,
    location: "Cairo, Egypt",
    status: "Active",
  },
  {
    id: "CUST-005",
    name: "Layla Mahfouz",
    email: "layla.m@example.com",
    avatar: "",
    joinDate: "2024-03-01",
    totalSpent: 49.99,
    coursesEnrolled: 1,
    location: "Mansoura, Egypt",
    status: "Active",
  },
  {
    id: "CUST-006",
    name: "Karim Youssef",
    email: "karim.y@example.com",
    avatar: "",
    joinDate: "2023-10-30",
    totalSpent: 0.0,
    coursesEnrolled: 0,
    location: "Cairo, Egypt",
    status: "Inactive",
  },
];

export default function CustomersPage() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
          <p className="text-muted-foreground">
            View and manage your student base.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Export List</Button>
          <Button>Add Customer</Button>
        </div>
      </div>

      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Customer</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Courses</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {CUSTOMERS.map((customer) => (
              <TableRow key={customer.id} className="hover:bg-slate-50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={customer.avatar} />
                      <AvatarFallback className="bg-slate-100 text-slate-600 font-medium">
                        {customer.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm text-slate-900">
                        {customer.name}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Mail size={10} /> {customer.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-slate-600 text-sm">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-slate-400" />
                    {customer.location}
                  </div>
                </TableCell>
                <TableCell className="text-slate-500 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-slate-400" />
                    {customer.joinDate}
                  </div>
                </TableCell>
                <TableCell className="text-center font-medium text-slate-700">
                  {customer.coursesEnrolled}
                </TableCell>
                <TableCell className="font-semibold text-slate-900">
                  <div className="flex items-center gap-0.5">
                    <DollarSign size={14} className="text-slate-400" />
                    {customer.totalSpent.toFixed(2)}
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
                        ${
                          customer.status === "Active"
                            ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20"
                            : "bg-slate-50 text-slate-600 ring-1 ring-inset ring-slate-500/10"
                        }`}
                  >
                    {customer.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white" align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Enroll in Course</DropdownMenuItem>
                      <DropdownMenuItem>Email Customer</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        Ban Customer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
