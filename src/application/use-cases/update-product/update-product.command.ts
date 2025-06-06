export interface UpdateProductCommand {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  currency?: string;
  categoryId?: string;
}