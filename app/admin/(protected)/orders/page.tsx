"use client";

import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import {
  MoreHorizontal,
  ShoppingCart,
  CreditCard,
  Truck,
  Calendar,
} from "lucide-react";

// Realistic Mock Data
const ORDERS = [
  {
    id: "ORD-001",
    customer: {
      name: "Ahmed Hassan",
      email: "ahmed.hassan@example.com",
      avatar: "",
    },
    product: "Full Stack Web Development Bootcamp",
    date: "2024-03-10",
    amount: 149.99,
    paymentMethod: "Visa",
    paymentStatus: "Paid",
    fulfillmentStatus: "Delivered",
  },
  {
    id: "ORD-002",
    customer: {
      name: "Sara Ali",
      email: "sara.ali@example.com",
      avatar: "/assets/img/avatars/2.png",
    },
    product: "UI/UX Design Masterclass",
    amount: 89.99,
    date: "2024-03-09",
    paymentMethod: "Cash",
    paymentStatus: "Pending",
    fulfillmentStatus: "Processing",
  },
  {
    id: "ORD-003",
    customer: {
      name: "Omar Khaled",
      email: "omar.k@example.com",
      avatar: "",
    },
    product: "Advanced React Patterns",
    amount: 129.5,
    date: "2024-03-08",
    paymentMethod: "Visa",
    paymentStatus: "Paid",
    fulfillmentStatus: "Delivered",
  },
  {
    id: "ORD-004",
    customer: {
      name: "Nour El-Din",
      email: "nour.el@example.com",
      avatar: "/assets/img/avatars/4.png",
    },
    product: "Python for Data Science",
    amount: 199.0,
    date: "2024-03-08",
    paymentMethod: "Visa",
    paymentStatus: "Failed",
    fulfillmentStatus: "Cancelled",
  },
  {
    id: "ORD-005",
    customer: {
      name: "Layla Mahfouz",
      email: "layla.m@example.com",
      avatar: "",
    },
    product: "Digital Marketing 101",
    amount: 49.99,
    date: "2024-03-07",
    paymentMethod: "Cash",
    paymentStatus: "Paid",
    fulfillmentStatus: "Shipped",
  },
];

export default function OrdersPage() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
          <p className="text-muted-foreground">
            Manage your store orders and monitor shipment status.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Export</Button>
        </div>
      </div>

      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ORDERS.map((order) => (
              <TableRow
                key={order.id}
                className="cursor-pointer hover:bg-slate-50"
              >
                <TableCell className="font-medium text-slate-900">
                  {order.id}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={order.customer.avatar} />
                      <AvatarFallback className="bg-slate-100 text-slate-600">
                        {order.customer.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm text-slate-900">
                        {order.customer.name}
                      </span>
                      <span className="text-xs text-slate-500">
                        {order.customer.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="max-w-[200px] truncate text-slate-600">
                  {order.product}
                </TableCell>
                <TableCell className="text-slate-500">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    {order.date}
                  </div>
                </TableCell>
                <TableCell className="font-bold text-slate-900">
                  ${order.amount.toFixed(2)}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-1">
                      <CreditCard size={12} />
                      {order.paymentMethod}
                    </div>
                    <Badge
                      variant="outline"
                      className={`w-fit text-[10px] px-1.5 py-0.5 border-0 ${
                        order.paymentStatus === "Paid"
                          ? "bg-emerald-100 text-emerald-700"
                          : order.paymentStatus === "Pending"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.paymentStatus}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={`
                            ${
                              order.fulfillmentStatus === "Delivered"
                                ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                                : order.fulfillmentStatus === "Shipped"
                                  ? "bg-purple-100 text-purple-700 hover:bg-purple-100"
                                  : order.fulfillmentStatus === "Processing"
                                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-100"
                            }
                        `}
                  >
                    {order.fulfillmentStatus}
                  </Badge>
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
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Update Status</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Cancel Order
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
