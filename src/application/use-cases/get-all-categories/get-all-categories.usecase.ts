import { ICategoryRepository } from "../../../domain/repositories/category.repository";
import { Category } from "../../../domain/aggregates/category.aggregate";

export class GetAllCategoriesUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }
}