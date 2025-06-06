import { IProductRepository } from "../../../domain/repositories/product.repository";
import { Product } from "../../../domain/aggregates/product.aggregate";
import { GetProductByIdQuery } from "./get-product-by-id.query";

export class GetProductByIdUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(query: GetProductByIdQuery): Promise<Product | null> {
    return this.productRepository.findById(query.id);
  }
}