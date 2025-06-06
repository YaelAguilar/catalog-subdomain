import { ICategoryRepository } from "../../../domain/repositories/category.repository.js";
import { Category } from "../../../domain/aggregates/category.aggregate.js";
import { DataSource, Repository } from "typeorm";
import { CategorySchema } from "../orm/typeorm/category.schema.js";
import { CategoryMapper } from "../mappers/category.mapper.js";

export class CategoryRepositoryImpl implements ICategoryRepository {
  private ormRepository: Repository<any>;

  constructor(dataSource: DataSource) {
    this.ormRepository = dataSource.getRepository(CategorySchema);
  }

  async save(category: Category): Promise<void> {
    const persistenceModel = CategoryMapper.toPersistence(category);
    await this.ormRepository.save(persistenceModel);
  }

  async findById(id: string): Promise<Category | null> {
    const categoryRow = await this.ormRepository.findOneBy({ id });
    return categoryRow ? CategoryMapper.toDomain(categoryRow) : null;
  }

  async findAll(): Promise<Category[]> {
    const categoryRows = await this.ormRepository.find();
    return categoryRows.map((row) => CategoryMapper.toDomain(row));
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}