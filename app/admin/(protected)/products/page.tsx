import { ProductsService } from "@/lib/api/services/products.service";
import { ProductGrid } from "@/features/admin/products/components/ProductGrid";
import Link from "next/link";

export default async function AdminProductsPage() {
  const products = await ProductsService.getAdminProducts();
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary-foreground">
            Products
          </h1>
          <p className="text-gray-500 mt-2">
            Manage your product catalog, prices, and variants.
          </p>
        </div>
        <Link
          href="/admin/products/create"
          className="inline-flex items-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all"
        >
          <span>+ Create Product</span>
        </Link>
      </div>

      <ProductGrid products={products} />
    </div>
  );
}
