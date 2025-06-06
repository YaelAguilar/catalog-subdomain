import { IProductRepository } from "../../../domain/repositories/product.repository";
import { Product } from "../../../domain/aggregates/product.aggregate";

export class SearchProductsUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
}