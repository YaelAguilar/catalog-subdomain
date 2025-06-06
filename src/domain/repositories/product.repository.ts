import { Product } from "../aggregates/product.aggregate.js";
import { SKU } from "../value-objects/product-sku.vo.js";

export interface IProductRepository {
  save(product: Product): Promise<void>;
  findById(id: string): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  findBySku(sku: SKU): Promise<Product | null>;
  delete(id: string): Promise<void>;
}