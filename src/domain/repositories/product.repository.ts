import { Product } from "../aggregates/product.aggregate";

export interface IProductRepository {
    save(product: Product): Promise<void>;
    findById(id: string): Promise<Product | null>;
    findAll(): Promise<Product[]>;
    findBySku(skuvValue: string): Promise<Product | null>;
}