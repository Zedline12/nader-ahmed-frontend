import { CreateProductForm } from "@/features/admin/components/CreateProductForm";
import { Category } from "@/features/categories/types/category";
import { fetchWithToken } from "@/lib/fetcher";



export default async function CreateProductPage() {
  const response = await fetchWithToken("/categories");
  const data = await response.json();
  const categories: Category[] = data.data || [];

  return (
    <div className="max-w-7xl mx-auto bg-background-light p-5">
      <h1 className="text-2xl font-bold mb-5 text-primary-foreground">Create Product</h1>
      <CreateProductForm categories={categories} />
    </div>
  );
}
