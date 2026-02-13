"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, Fragment } from "react";
import {
  ChevronDown,
  ChevronRight,
  Package,
  LayoutDashboard,
  Settings,
  ShoppingBag,
  Users,
  LucideIcon,
  BookOpen,
} from "lucide-react";

interface SidebarSubItem {
  label: string;
  href: string;
}

interface SidebarItem {
  label: string;
  icon: LucideIcon;
  href: string;
  type: "link" | "dropdown";
  children?: SidebarSubItem[];
}

const sidebarItems: SidebarItem[] = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    href: "/dashboard",
    type: "link",
  },
  {
    label: "Categories",
    icon: Package,
    href: "/admin/categories",
    type: "link",
  },
  {
    label: "Admins",
    icon: Users,
    href: "/admin/admins",
    type: "link",
  },
  {
    label: "Products",
    icon: Package,
    href: "/admin/products",
    type: "dropdown",
    children: [
      { label: "All Products", href: "/admin/products" },
      { label: "Add New Product", href: "/admin/products/create" },
    ],
  },
  {
    label: "Courses",
    icon: Package, // Using Package icon to match original design
    href: "/admin/courses",
    type: "dropdown",
    children: [
      { label: "All Courses", href: "/admin/courses" },
      { label: "Add New Course", href: "/admin/courses/create" },
    ],
  },
  {
    label: "Orders",
    icon: ShoppingBag,
    href: "/admin/orders",
    type: "link",
  },
  {
    label: "Customers",
    icon: Users,
    href: "/admin/customers",
    type: "link",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    Products: true,
  });

  useEffect(() => {
    sidebarItems.forEach((item) => {
      if (item.type === "dropdown" && pathname.includes(item.href)) {
        setOpenSections((prev) => ({ ...prev, [item.label]: true }));
      }
    });
  }, [pathname]);

  const toggleSection = (label: string) => {
    setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isActive = (path: string) => pathname === path;
  const isChildActive = (path: string) => pathname.startsWith(path);

  return (
    <div className="w-64 h-full bg-background-light border-r border-background-lighter flex flex-col font-sans">
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto scrollbar-hide">
        {sidebarItems.map((item, index) => {
          const isDropdown = item.type === "dropdown";
          const isCurrentActive = isDropdown
            ? isChildActive(item.href)
            : isActive(item.href);

          const content = isDropdown ? (
            <>
              <button
                onClick={() => toggleSection(item.label)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  isCurrentActive
                    ? "bg-background-lighter text-primary"
                    : "text-muted-foreground hover:bg-background-lighter hover:text-primary-foreground"
                }`}
              >
                <div className="flex items-center">
                  <item.icon
                    size={20}
                    className={`mr-3 ${
                      isCurrentActive
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-primary-foreground"
                    }`}
                  />
                  {item.label}
                </div>
                {openSections[item.label] ? (
                  <ChevronDown
                    size={16}
                    className={`${
                      isCurrentActive
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-primary-foreground"
                    }`}
                  />
                ) : (
                  <ChevronRight
                    size={16}
                    className={`${
                      isCurrentActive
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-primary-foreground"
                    }`}
                  />
                )}
              </button>

              <div
                className={`mt-1 ml-4 pl-4 border-l border-background-lighter space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                  openSections[item.label]
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                {item.children?.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive(child.href)
                        ? "text-primary-foreground bg-primary font-medium"
                        : "text-muted-foreground hover:text-primary-foreground hover:bg-background-lighter"
                    }`}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <Link
              href={item.href}
              className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                isCurrentActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-background-lighter hover:text-primary-foreground"
              }`}
            >
              <item.icon
                size={20}
                className={`mr-3 ${
                  isCurrentActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground group-hover:text-primary-foreground"
                }`}
              />
              {item.label}
            </Link>
          );

          return index === 0 ? (
            <Fragment key={item.label}>{content}</Fragment>
          ) : (
            <div key={item.label} className="pt-2">
              {content}
            </div>
          );
        })}
      </nav>

      <div className="p-4 border-t border-background-lighter">
        <button className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-muted-foreground rounded-lg hover:bg-background-lighter hover:text-primary-foreground transition-colors group">
          <Settings
            size={20}
            className="mr-3 text-muted-foreground group-hover:text-primary-foreground"
          />
          Settings
        </button>
      </div>
    </div>
  );
}
