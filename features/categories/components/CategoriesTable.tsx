"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Category } from "../types/category";
import { CategoryDialog } from "./CategoryDialog";
import { DeleteCategoryDialog } from "./DeleteCategoryDialog";

interface CategoriesTableProps {
  categories: Category[];
}

export function CategoriesTable({ categories }: CategoriesTableProps) {
  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(dateString));
  };

  return (
    <div className="rounded-md border bg-background-light">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-secondary-foreground hover:text-primary-foreground">
              Name
            </TableHead>
            <TableHead className="text-secondary-foreground hover:text-primary-foreground">
              Created At
            </TableHead>
            <TableHead className="text-secondary-foreground hover:text-primary-foreground">
              Updated At
            </TableHead>
            <TableHead className="text-right text-secondary-foreground hover:text-primary-foreground">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium text-secondary-foreground hover:text-primary-foreground">
                {category.title}
              </TableCell>
              <TableCell className="text-secondary-foreground hover:text-primary-foreground">
                {formatDate(category.createdAt)}
              </TableCell>
              <TableCell className="text-secondary-foreground hover:text-primary-foreground">
                {formatDate(category.updatedAt)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <CategoryDialog category={category} />
                  <DeleteCategoryDialog
                    id={category.id}
                    name={category.title}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
          {categories.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="h-24 text-center text-muted-foreground"
              >
                No categories found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
