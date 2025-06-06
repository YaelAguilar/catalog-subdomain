import { Category } from "../aggregates/category.aggregate";

export interface ICategoryRepository {
  save(category: Category): Promise<void>;
  findById(id: string): Promise<Category | null>;
  findAll(): Promise<Category[]>;
  delete(id: string): Promise<void>;
}