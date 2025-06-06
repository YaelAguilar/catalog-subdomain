export interface ProductDto {
  id: string;
  name: string;
  description: string;
  sku: string;
  price: {
    amount: number;
    currency: string;
  };
  categoryId: string;
}