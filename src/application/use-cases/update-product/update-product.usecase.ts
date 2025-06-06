import { IProductRepository } from "../../../domain/repositories/product.repository.js";
import { Money } from "../../../domain/value-objects/money.vo.js";
import { ProductDescription } from "../../../domain/value-objects/product-description.vo.js";
import { UpdateProductCommand } from "./update-product.command.js";
import { ICategoryRepository } from "../../../domain/repositories/category.repository.js";

export class UpdateProductUseCase {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly categoryRepository: ICategoryRepository
  ) {}

  async execute(command: UpdateProductCommand): Promise<void> {
    const product = await this.productRepository.findById(command.id);
    if (!product) {
      throw new Error("Product not found.");
    }

    if (command.name) {
      product.name = command.name;
    }
    if (command.description !== undefined) {
      product.changeDescription(new ProductDescription(command.description));
    }
    if (command.price !== undefined && command.currency) {
      product.updatePrice(new Money(command.price, command.currency));
    }
    if (command.categoryId) {
      const category = await this.categoryRepository.findById(command.categoryId);
      if (!category) {
        throw new Error("Category not found.");
      }
      product.categoryId = command.categoryId;
    }

    await this.productRepository.save(product);
  }
}