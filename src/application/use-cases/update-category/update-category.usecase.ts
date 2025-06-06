import { ICategoryRepository } from "../../../domain/repositories/category.repository";
import { CategoryName } from "../../../domain/value-objects/category-name.vo";
import { UpdateCategoryCommand } from "./update-category.command";

export class UpdateCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(command: UpdateCategoryCommand): Promise<void> {
    const category = await this.categoryRepository.findById(command.id);
    if (!category) {
      throw new Error("Category not found.");
    }

    if (command.name) {
      category.changeName(new CategoryName(command.name));
    }
    if (command.parentId !== undefined) {
      if (command.parentId) {
        const parent = await this.categoryRepository.findById(command.parentId);
        if (!parent) throw new Error("Parent category not found.");
      }
      category.setParent(command.parentId);
    }

    await this.categoryRepository.save(category);
  }
}