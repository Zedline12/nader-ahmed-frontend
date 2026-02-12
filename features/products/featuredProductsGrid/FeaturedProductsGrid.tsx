
import { ProductsService } from "@/lib/api/services/products.service";
import ProductCard from "@/components/ProductCard";
import { fetchWithToken } from "@/lib/fetcher";
export default async function FeaturedProductsGrid() {
  const productsRes = await fetchWithToken("/products/featured")
   const products=await productsRes.json().then(d=>d.data)
  return (
    <section id="featured-products" className="py-16 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 z-10 relative">
      

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products && products.length > 0 ? (
            products.map((product:any) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No featured products available.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
