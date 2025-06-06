import { ICategoryRepository } from "../../../domain/repositories/category.repository";
import { Category } from "../../../domain/aggregates/category.aggregate";
import { CategoryName } from "../../../domain/value-objects/category-name.vo";
import { CreateCategoryCommand } from "./create-category.command";

export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(command: CreateCategoryCommand): Promise<Category> {
    if (command.parentId) {
      const parentCategory = await this.categoryRepository.findById(command.parentId);
      if (!parentCategory) {
        throw new Error("Parent category not found.");
      }
    }
    
    const categoryName = new CategoryName(command.name);
    const category = Category.create(categoryName, command.parentId || null);
    await this.categoryRepository.save(category);
    return category;
  }
}