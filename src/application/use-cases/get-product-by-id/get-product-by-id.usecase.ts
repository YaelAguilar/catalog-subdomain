import { IProductRepository } from "../../../domain/repositories/product.repository.js";
import { Product } from "../../../domain/aggregates/product.aggregate.js";
import { GetProductByIdQuery } from "./get-product-by-id.query.js";

export class GetProductByIdUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(query: GetProductByIdQuery): Promise<Product | null> {
    return this.productRepository.findById(query.id);
  }
}