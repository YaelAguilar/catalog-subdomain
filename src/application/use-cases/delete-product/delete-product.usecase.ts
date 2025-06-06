import { IProductRepository } from "../../../domain/repositories/product.repository.js";
import { DeleteProductCommand } from "./delete-product.command.js";

export class DeleteProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(command: DeleteProductCommand): Promise<void> {
    const productExists = await this.productRepository.findById(command.id);
    if (!productExists) {
      throw new Error("Product not found.");
    }
    await this.productRepository.delete(command.id);
  }
}