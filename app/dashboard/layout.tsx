import { NavBar } from "@/features/dashboard/components/NavBar";
import { SideBar } from "@/features/dashboard/components/SideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 flex-shrink-0 hidden md:block">
          <SideBar />
        </aside>
        <main className="flex-1 overflow-y-auto bg-gray-50/50">{children}</main>
      </div>
    </div>
  );
}
