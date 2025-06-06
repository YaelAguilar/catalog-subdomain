import { EntitySchema } from "typeorm";

export const ProductSchema = new EntitySchema({
  name: "ProductPersistence",
  tableName: "products",
  columns: {
    id: {
      type: "varchar",
      primary: true,
    },
    name: {
      type: "varchar",
    },
    description: {
      type: "varchar",
    },
    sku: {
      type: "varchar",
      unique: true,
    },
    priceAmount: {
      type: "decimal",
      name: "price_amount",
    },
    priceCurrency: {
      type: "varchar",
      length: 3,
      name: "price_currency",
    },
    categoryId: {
      type: "varchar",
      name: "category_id",
    },
  },
});