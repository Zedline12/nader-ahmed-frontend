import { ProductsService } from "@/lib/api/services/products.service";
import ProductDetails from "@/components/ProductDetails";
import { notFound } from "next/navigation";
import FeaturedProductsGrid from "@/features/products/featuredProductsGrid/FeaturedProductsGrid";

// Force dynamic behavior because we are fetching data that might change
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  if (!id) return notFound();

  try {
    const product = await ProductsService.findOne(id);

    if (!product) {
      return notFound();
    }

    return (
      <main className="min-h-screen bg-white">
        <ProductDetails product={product} />
        <FeaturedProductsGrid />
      </main>
    );
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return notFound();
  }
}
