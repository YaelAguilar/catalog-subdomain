export interface CreateProductCommand {
  name: string;
  description: string;
  price: number;
  currency: string;
  sku: string;
  categoryId: string;
}