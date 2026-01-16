export enum VariationType {
  NONE = "NONE",
  ONLYSIZE = "OnlySize",
  ONLYCOLOR = "OnlyColor",
  SIZEANDCOLOR = "SizeAndColor",
}
export interface ProductVariant {
  id: string;
  color: string;
  size: string;
  imagesUrls: string[];
  price?: number;
  discount?: number;
  stock?: number;
}

export interface Product {
  id: string;
  slug: string;
  price: number;
  title: string;
  isFeatured: boolean;
  thumbnailUrl: string;
  variationType: VariationType;
  description: string;
  variantsList?: ProductVariant[];
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  about: string[]; // User specified about: {}[] which is array of objects, keeping as any[] or Record<string, any>[] for now unless more specific type known
}
