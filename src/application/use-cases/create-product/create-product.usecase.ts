import { IProductRepository } from "../../../domain/repositories/product.repository.js";
import { Product } from "../../../domain/aggregates/product.aggregate.js";
import { Money } from "../../../domain/value-objects/money.vo.js";
import { SKU } from "../../../domain/value-objects/product-sku.vo.js";
import { ProductDescription } from "../../../domain/value-objects/product-description.vo.js";
import { ICategoryRepository } from "../../../domain/repositories/category.repository.js";
import { CreateProductCommand } from "./create-product.command.js";
import { IIdGenerator } from "application/contracts/id-generator.interface.js";

export class CreateProductUseCase {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly categoryRepository: ICategoryRepository,
    private readonly idGenerator: IIdGenerator
  ) {}

  async execute(command: CreateProductCommand): Promise<Product> {
    const sku = new SKU(command.sku);
    const existingProduct = await this.productRepository.findBySku(sku);
    if (existingProduct) {
      throw new Error("A product with this SKU already exists.");
    }

    const category = await this.categoryRepository.findById(command.categoryId);
    if (!category) {
      throw new Error("Category not found.");
    }
    
    const price = new Money(command.price, command.currency);
    const description = new ProductDescription(command.description);
    
    const id = this.idGenerator.generate(); 

    const product = Product.create(
      id,
      command.name,
      description,
      price,
      sku,
      category.id
    );

    await this.productRepository.save(product);
    return product;
  }
}