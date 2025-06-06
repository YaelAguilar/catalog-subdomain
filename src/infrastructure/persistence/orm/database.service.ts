import { DataSource } from "typeorm";
import { ProductSchema } from "./typeorm/product.schema.js";
import { CategorySchema } from "./typeorm/category.schema.js";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "catalog.sqlite",
  synchronize: true,
  logging: false,
  entities: [ProductSchema, CategorySchema],
  subscribers: [],
  migrations: [],
});

export const initializeDatabase = async () => {
  try {
    if (AppDataSource.isInitialized) {
        console.log("Data Source is already initialized.");
        return;
    }
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
  } catch (err) {
    console.error("Error during Data Source initialization:", err);
  }
};