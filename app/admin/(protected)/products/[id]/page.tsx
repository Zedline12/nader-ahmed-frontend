"use client";

import { useEffect, useState, use } from "react";
// import { useParams } from "next/navigation"; // useParams in client component
import { ProductsService } from "@/lib/api/services/products.service";
import { Product, ProductVariant } from "@/lib/types/product.type";
import { EditProductForm } from "@/features/admin/products/components/EditProductForm";
import { VariantsList } from "@/features/admin/products/components/VariantsList";
import { Modal } from "@/features/admin/components/ui/Modal";
import { VariantForm } from "@/features/admin/products/components/VariantForm";
import { toast } from "sonner";

// Page component
export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Unwrap params using React.use()
  const { id } = use(params);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedVariant, setSelectedVariant] = useState<
    ProductVariant | undefined
  >(undefined);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await ProductsService.findOne(id);
      setProduct(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddVariant = () => {
    setModalMode("create");
    setSelectedVariant(undefined);
    setIsModalOpen(true);
  };

  const handleEditVariant = (variant: ProductVariant) => {
    setModalMode("edit");
    setSelectedVariant(variant);
    setIsModalOpen(true);
  };

  const handleDeleteVariant = async (variantId: string) => {
    if (!confirm("Are you sure you want to delete this variant?")) return;
    try {
      await ProductsService.deleteVariant(id, variantId);
      toast.success("Variant deleted");
      fetchProduct(); // Refresh
    } catch (error) {
      toast.error("Failed to delete variant");
    }
  };

  const handleModalSuccess = () => {
    setIsModalOpen(false);
    fetchProduct(); // Refresh list
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!product) return <div className="p-8">Product not found</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
        <p className="text-gray-500">Manage product details and variants</p>
      </div>

      <EditProductForm product={product} />

      <VariantsList
        variants={product.variantsList || []}
        onAdd={handleAddVariant}
        onEdit={handleEditVariant}
        onDelete={handleDeleteVariant}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === "create" ? "Add New Variant" : "Edit Variant"}
      >
        <VariantForm
          productId={id}
          mode={modalMode}
          initialData={selectedVariant}
          onSuccess={handleModalSuccess}
        />
      </Modal>
    </div>
  );
}
