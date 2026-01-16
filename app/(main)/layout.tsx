import NavBar from "@/components/NavBar";
import { CartProvider } from "@/lib/context/CartContext";
import CartSidebar from "@/features/cart/components/CartSidebar";
import { Toaster } from "sonner";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <NavBar></NavBar>
      <CartSidebar />
      <div className="mt-20">{children}</div>
      <Toaster richColors position="bottom-right" />
    </CartProvider>
  );
}
