import { IProductRepository } from "../../../domain/repositories/product.repository.js";
import { Product } from "../../../domain/aggregates/product.aggregate.js";
import { SKU } from "../../../domain/value-objects/product-sku.vo.js";
import { DataSource, Repository } from "typeorm";
import { ProductSchema } from "../orm/typeorm/product.schema.js";
import { ProductMapper } from "../mappers/product.mapper.js";

export class ProductRepositoryImpl implements IProductRepository {
  private ormRepository: Repository<any>;

  constructor(dataSource: DataSource) {
    this.ormRepository = dataSource.getRepository(ProductSchema);
  }

  async save(product: Product): Promise<void> {
    const persistenceModel = ProductMapper.toPersistence(product);
    await this.ormRepository.save(persistenceModel);
  }

  async findById(id: string): Promise<Product | null> {
    const productRow = await this.ormRepository.findOneBy({ id });
    return productRow ? ProductMapper.toDomain(productRow) : null;
  }

  async findAll(): Promise<Product[]> {
    const productRows = await this.ormRepository.find();
    return productRows.map((row) => ProductMapper.toDomain(row));
  }

  async findBySku(sku: SKU): Promise<Product | null> {
    const productRow = await this.ormRepository.findOneBy({ sku: sku.value });
    return productRow ? ProductMapper.toDomain(productRow) : null;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}