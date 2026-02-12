
import AdminNavbar from "@/features/admin/components/Navbar";
import AdminSidebar from "@/features/admin/components/Sidebar";
import { fetchWithToken } from "@/lib/fetcher";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
   const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    console.log("no token");
    redirect("/admin/login");
  }

  const res = await fetchWithToken("/admin/auth/me");
  if (!res.ok) {
    const json = await res.json();
    console.log(json)
    redirect("/admin/login");
  }
  return (
         <div className="bg-background h-screen grid grid-rows-[auto_1fr] grid-cols-1 sm:grid-cols-[70px_1fr] xl:grid-cols-[230px_1fr]">
             {/* NAVBAR */}
             <header className="col-span-full z-50  ">
              <AdminNavbar />
             </header>
       
             {/* SIDEBAR (desktop) */}
             <div className="hidden z-50  sm:block row-start-2 col-start-1 h-full">
               <AdminSidebar />
             </div>
             <main className="row-start-2 p-5 h-full col-start-1 sm:col-start-2  ">
               {children}
             </main>
           </div>
  );
}
