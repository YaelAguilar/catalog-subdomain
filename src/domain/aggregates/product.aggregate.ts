import { Money } from "../value-objects/money.vo.js";
import { SKU } from "../value-objects/product-sku.vo.js";
import { ProductDescription } from "../value-objects/product-description.vo.js";

export class Product {
  readonly id: string;
  public name: string;
  public description: ProductDescription;
  public price: Money;
  public sku: SKU;
  public categoryId: string;

  private constructor(id: string, name: string, description: ProductDescription, price: Money, sku: SKU, categoryId: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.sku = sku;
    this.categoryId = categoryId;
  }

  public static create(id: string, name: string, description: ProductDescription, price: Money, sku: SKU, categoryId: string): Product {
    if (!name || name.length < 3) {
      throw new Error("Product name must be at least 3 characters long.");
    }
    return new Product(id, name, description, price, sku, categoryId);
  }

  public updatePrice(newPrice: Money): void {
    this.price = newPrice;
  }

  public changeDescription(newDescription: ProductDescription): void {
    this.description = newDescription;
  }
}