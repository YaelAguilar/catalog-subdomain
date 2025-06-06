import { IProductRepository } from "../../../domain/repositories/product.repository.js";
import { Product } from "../../../domain/aggregates/product.aggregate.js";

export class SearchProductsUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
}