import { CategoryName } from "../value-objects/category-name.vo.js";

export class Category {
  readonly id: string;
  public name: CategoryName;
  public parentId: string | null;

  private constructor(id: string, name: CategoryName, parentId: string | null) {
    this.id = id;
    this.name = name;
    this.parentId = parentId;
  }

  public static create(id: string, name: CategoryName, parentId: string | null = null): Category {
    return new Category(id, name, parentId);
  }

  public changeName(newName: CategoryName): void {
    this.name = newName;
  }

  public setParent(newParentId: string | null): void {
    if (this.id === newParentId) {
      throw new Error("A category cannot be its own parent.");
    }
    this.parentId = newParentId;
  }
}