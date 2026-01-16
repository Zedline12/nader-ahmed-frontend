"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingCart, Heart, User, Search } from "lucide-react";
import { useCart } from "@/lib/context/CartContext";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { toggleSidebar, cart } = useCart();

  const itemCount =
    cart?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <nav className="fixed w-full z-50 top-0 start-0 border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="flex items-center space-x-2 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-extrabold whitespace-nowrap text-gray-900 tracking-tight">
            Nader Ahmed
          </span>
        </Link>

        {/* Desktop Actions (Cart, Wishlist, Auth) */}
        <div className="flex md:order-2 items-center gap-2 md:gap-4">
          {/* Search - Visible on Desktop */}
          <div className="hidden md:flex relative mr-2">
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none w-48 lg:w-64 transition-all"
            />
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
          </div>

          <button className="relative p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-full transition-colors">
            <Heart size={22} />
            {/* <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full">0</span> */}
          </button>

          <button
            onClick={toggleSidebar}
            className="relative p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-full transition-colors"
          >
            <ShoppingCart size={22} />
            {itemCount > 0 && (
              <span className="absolute top-1 right-0.5 inline-flex items-center justify-center w-4 h-4 text-xs font-bold leading-none text-white bg-indigo-600 rounded-full border-2 border-white">
                {itemCount}
              </span>
            )}
          </button>

          <div className="hidden md:flex items-center gap-2 pl-2 border-l border-gray-200">
            <button className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors px-3 py-2">
              Log in
            </button>
            <button className="text-sm bg-secondary font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow-md">
              Sign up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
            <li>
              <Link
                href="/"
                className="block py-2 px-3 text-black bg-transparent md:p-0"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/shop"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-indigo-600 md:p-0 transition-colors"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                href="/categories"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-indigo-600 md:p-0 transition-colors"
              >
                Categories
              </Link>
            </li>
            <li className="md:hidden pt-4 mt-4 border-t border-gray-200">
              <div className="flex flex-col gap-3">
                <button className="w-full text-center text-gray-700 font-medium py-2 bg-gray-100 rounded-lg">
                  Log in
                </button>
                <button className="w-full text-center text-white font-medium py-2 bg-indigo-600 rounded-lg">
                  Sign up
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
