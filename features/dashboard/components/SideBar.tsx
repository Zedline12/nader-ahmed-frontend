"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  Package,
  LayoutDashboard,
  Settings,
  ShoppingBag,
  Users,
} from "lucide-react";

export const SideBar = () => {
  const pathname = usePathname();
  const [isProductsOpen, setIsProductsOpen] = useState(true);

  useEffect(() => {
    if (pathname.includes("/dashboard/products")) {
      setIsProductsOpen(true);
    }
  }, [pathname]);

  const isActive = (path: string) => pathname === path;
  const isChildActive = (path: string) => pathname.startsWith(path);

  return (
    <div className="w-64 h-full bg-white border-r border-gray-100 flex flex-col font-sans">
      <div className="h-16 flex items-center px-6 border-b border-gray-50">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-gray-900">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            N
          </div>
          <span>NaderStore</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto scrollbar-hide">
        <Link
          href="/dashboard"
          className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
            isActive("/dashboard")
              ? "bg-blue-50 text-blue-700"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <LayoutDashboard
            size={20}
            className={`mr-3 ${
              isActive("/dashboard")
                ? "text-blue-600"
                : "text-gray-400 group-hover:text-gray-600"
            }`}
          />
          Overview
        </Link>

        {/* Products Section */}
        <div className="pt-2">
          <button
            onClick={() => setIsProductsOpen(!isProductsOpen)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
              isChildActive("/dashboard/products")
                ? "bg-blue-50/50 text-blue-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <div className="flex items-center">
              <Package
                size={20}
                className={`mr-3 ${
                  isChildActive("/dashboard/products")
                    ? "text-blue-600"
                    : "text-gray-400 group-hover:text-gray-600"
                }`}
              />
              Products
            </div>
            {isProductsOpen ? (
              <ChevronDown size={16} className="text-gray-400" />
            ) : (
              <ChevronRight size={16} className="text-gray-400" />
            )}
          </button>

          <div
            className={`mt-1 ml-4 pl-4 border-l border-gray-100 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
              isProductsOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <Link
              href="/dashboard/products"
              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive("/dashboard/products")
                  ? "text-blue-600 bg-blue-50 font-medium"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              All Products
            </Link>
            <Link
              href="/dashboard/products/create"
              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive("/dashboard/products/create")
                  ? "text-blue-600 bg-blue-50 font-medium"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              Add New Product
            </Link>
          </div>
        </div>
          <div className="pt-2">
          <button
            onClick={() => setIsProductsOpen(!isProductsOpen)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
              isChildActive("/dashboard/courses")
                ? "bg-blue-50/50 text-blue-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <div className="flex items-center">
              <Package
                size={20}
                className={`mr-3 ${
                  isChildActive("/dashboard/courses")
                    ? "text-blue-600"
                    : "text-gray-400 group-hover:text-gray-600"
                }`}
              />
              Courses
            </div>
            {isProductsOpen ? (
              <ChevronDown size={16} className="text-gray-400" />
            ) : (
              <ChevronRight size={16} className="text-gray-400" />
            )}
          </button>

          <div
            className={`mt-1 ml-4 pl-4 border-l border-gray-100 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
              isProductsOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <Link
              href="/dashboard/courses"
              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive("/dashboard/courses")
                  ? "text-blue-600 bg-blue-50 font-medium"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              All Courses
            </Link>
            <Link
              href="/dashboard/courses/create"
              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive("/dashboard/courses/create")
                  ? "text-blue-600 bg-blue-50 font-medium"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              Add New Course
            </Link>
          </div>
        </div>
        <div className="pt-2">
          <Link
            href="/dashboard/orders"
            className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group"
          >
            <ShoppingBag
              size={20}
              className="mr-3 text-gray-400 group-hover:text-gray-600"
            />
            Orders
          </Link>
        </div>

        <div className="pt-2">
          <Link
            href="/dashboard/customers"
            className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group"
          >
            <Users
              size={20}
              className="mr-3 text-gray-400 group-hover:text-gray-600"
            />
            Customers
          </Link>
        </div>
      </nav>

      <div className="p-4 border-t border-gray-50">
        <button className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors group">
          <Settings
            size={20}
            className="mr-3 text-gray-400 group-hover:text-gray-600"
          />
          Settings
        </button>
      </div>
    </div>
  );
};
