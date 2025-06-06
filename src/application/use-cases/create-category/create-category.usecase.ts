import { ICategoryRepository } from "../../../domain/repositories/category.repository.js";
import { Category } from "../../../domain/aggregates/category.aggregate.js";
import { CategoryName } from "../../../domain/value-objects/category-name.vo.js";
import { CreateCategoryCommand } from "./create-category.command.js";
import { IIdGenerator } from "../../contracts/id-generator.interface.js";

export class CreateCategoryUseCase {
  constructor(
    private readonly categoryRepository: ICategoryRepository,
    private readonly idGenerator: IIdGenerator
  ) {}

  async execute(command: CreateCategoryCommand): Promise<Category> {
    if (command.parentId) {
      const parentCategory = await this.categoryRepository.findById(command.parentId);
      if (!parentCategory) {
        throw new Error("Parent category not found.");
      }
    }
    
    const categoryName = new CategoryName(command.name);
    
    const id = this.idGenerator.generate(); 

    const category = Category.create(
      id,
      categoryName, 
      command.parentId || null
    );

    await this.categoryRepository.save(category);
    return category;
  }
}