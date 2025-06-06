import { EntitySchema } from "typeorm";

export const CategorySchema = new EntitySchema({
  name: "CategoryPersistence",
  tableName: "categories",
  columns: {
    id: {
      type: "varchar",
      primary: true,
    },
    name: {
      type: "varchar",
    },
    parentId: {
      type: "varchar",
      nullable: true,
    },
  },
});