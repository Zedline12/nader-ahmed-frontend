import { fetchWithToken } from "@/lib/fetcher";
import { CategoriesTable } from "@/features/categories/components/CategoriesTable";
import { CategoryDialog } from "@/features/categories/components/CategoryDialog";
import { Category } from "@/features/categories/types/category";

export default async function Categories() {
  const response = await fetchWithToken("/categories");

  let categories: Category[] = [];

  if (response.ok) {
    const json = await response.json();
    categories = json.data || [];
  }

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground">
            Categories
          </h2>
          <p className="text-secondary-foreground">
            Manage your product categories.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <CategoryDialog />
        </div>
      </div>
      <CategoriesTable categories={categories} />
    </div>
  );
}
