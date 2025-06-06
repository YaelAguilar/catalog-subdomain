import { ICategoryRepository } from "../../../domain/repositories/category.repository.js";
import { Category } from "../../../domain/aggregates/category.aggregate.js";

export class GetAllCategoriesUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }
}