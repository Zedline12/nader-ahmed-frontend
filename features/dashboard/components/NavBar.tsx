"use client";

import { Bell, Search, Settings, Menu, User } from "lucide-react";

export const NavBar = () => {
  // Mock user for display
  const user = {
    name: "Nader Ahmed",
    role: "Admin",
    // avatarUrl: "..."
  };

  return (
    <div className="h-16  bg-white/80 backdrop-blur-md sticky top-0 z-30 flex items-center px-4 sm:px-6 justify-between transition-all">
      {/* Left Section: Logo/Title & Mobile Menu Trigger (if needed later) */}
      <div className="flex items-center gap-4">
        {/* <button className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
          <Menu size={20} />
        </button> */}
        <div className="font-bold text-xl tracking-tight text-gray-900">
          Admin Dashboard
        </div>
      </div>

      {/* Middle Section: Search Bar (Hidden on small mobile) */}
      <div className="hidden md:flex items-center max-w-md w-full mx-4">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Search..."
          />
        </div>
      </div>

      {/* Right Section: Actions & Profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors relative group">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            <span className="sr-only">Notifications</span>
          </button>

          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors group">
            <Settings size={20} />
            <span className="sr-only">Settings</span>
          </button>
        </div>

        <div className="h-6 w-px bg-gray-200 mx-1 hidden sm:block"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-1 cursor-pointer hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center border border-blue-200">
            <User size={16} />
            {/* {user.avatarUrl ? <img src={user.avatarUrl} alt="User" /> : <User size={16} />} */}
          </div>
          <div className="hidden sm:flex flex-col text-sm">
            <span className="font-semibold text-gray-900 leading-none">
              {user.name}
            </span>
            <span className="text-xs text-gray-500 mt-0.5">{user.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
