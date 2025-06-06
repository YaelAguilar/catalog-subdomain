import { ICategoryRepository } from "../../../domain/repositories/category.repository";
import { DeleteCategoryCommand } from "./delete-category.command";

export class DeleteCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(command: DeleteCategoryCommand): Promise<void> {
    const categoryExists = await this.categoryRepository.findById(command.id);
    if (!categoryExists) {
      throw new Error("Category not found.");
    }
    await this.categoryRepository.delete(command.id);
  }
}