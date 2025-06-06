import "reflect-metadata";
import express from "express";
import { AppDataSource, initializeDatabase } from "../infrastructure/persistence/orm/database.service.js";
import { ProductRepositoryImpl } from "../infrastructure/persistence/repositories/product.repository.impl.js";
import { CategoryRepositoryImpl } from "../infrastructure/persistence/repositories/category.repository.impl.js";
import { UuidGenerator } from "../infrastructure/services/uuid-generator.service.js";
import { CreateProductUseCase } from "../application/use-cases/create-product/create-product.usecase.js";
import { CreateCategoryUseCase } from "../application/use-cases/create-category/create-category.usecase.js";
import { ProductController } from "./controllers/product.controller.js";
import { CategoryController } from "./controllers/category.controller.js";
import { createProductRoutes } from "./routes/product.routes.js";
import { createCategoryRoutes } from "./routes/category.routes.js";
import { GetProductByIdUseCase } from "../application/use-cases/get-product-by-id/get-product-by-id.usecase.js";
import { SearchProductsUseCase } from "../application/use-cases/search-products/search-products.usecase.js";
import { UpdateProductUseCase } from "../application/use-cases/update-product/update-product.usecase.js";
import { DeleteProductUseCase } from "../application/use-cases/delete-product/delete-product.usecase.js";
import { GetAllCategoriesUseCase } from "../application/use-cases/get-all-categories/get-all-categories.usecase.js";
import { UpdateCategoryUseCase } from "../application/use-cases/update-category/update-category.usecase.js";
import { DeleteCategoryUseCase } from "../application/use-cases/delete-category/delete-category.usecase.js";

async function main() {
  const app = express();
  app.use(express.json());

  await initializeDatabase();

  const idGenerator = new UuidGenerator();

  const productRepository = new ProductRepositoryImpl(AppDataSource);
  const categoryRepository = new CategoryRepositoryImpl(AppDataSource);

  const createProductUseCase = new CreateProductUseCase(productRepository, categoryRepository, idGenerator);
  const getProductByIdUseCase = new GetProductByIdUseCase(productRepository);
  const searchProductsUseCase = new SearchProductsUseCase(productRepository);
  const updateProductUseCase = new UpdateProductUseCase(productRepository, categoryRepository);
  const deleteProductUseCase = new DeleteProductUseCase(productRepository);

  const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository, idGenerator);
  const getAllCategoriesUseCase = new GetAllCategoriesUseCase(categoryRepository);
  const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository);
  const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository);

  const productController = new ProductController(
    createProductUseCase,
    getProductByIdUseCase,
    searchProductsUseCase,
    updateProductUseCase,
    deleteProductUseCase
  );
  const categoryController = new CategoryController(
    createCategoryUseCase,
    getAllCategoriesUseCase,
    updateCategoryUseCase,
    deleteCategoryUseCase
  );
  
  const productRoutes = createProductRoutes(productController);
  const categoryRoutes = createCategoryRoutes(categoryController);
  
  app.use("/api/products", productRoutes);
  app.use("/api/categories", categoryRoutes);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

main().catch(error => {
  console.error("Error starting server:", error);
});