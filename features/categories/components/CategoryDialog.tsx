"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CategoryForm } from "./CategoryForm";
import { Category } from "../types/category";
import { Plus, Pencil } from "lucide-react";

interface CategoryDialogProps {
  category?: Category;
}

export function CategoryDialog({ category }: CategoryDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {category ? (
          <Button variant="ghost" size="icon">
            <Pencil className="h-4 w-4 text-primary-foreground" />
            <span className="sr-only">Edit</span>
          </Button>
        ) : (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create New Category
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-background-light">
        <DialogHeader>
          <DialogTitle className="text-primary-foreground">
            {category ? "Edit Category" : "Create New Category"}
          </DialogTitle>
          <DialogDescription className="text-secondary-foreground">
            {category
              ? "Update the category details below."
              : "Enter the details for the new category."}
          </DialogDescription>
        </DialogHeader>
        <CategoryForm category={category} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
