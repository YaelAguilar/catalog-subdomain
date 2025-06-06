import { Product } from "../../../domain/aggregates/product.aggregate.js";
import { Money } from "../../../domain/value-objects/money.vo.js";
import { ProductDescription } from "../../../domain/value-objects/product-description.vo.js";
import { SKU } from "../../../domain/value-objects/product-sku.vo.js";

type ProductRow = {
  id: string;
  name: string;
  description: string;
  sku: string;
  priceAmount: number;
  priceCurrency: string;
  categoryId: string;
};

export class ProductMapper {
  public static toDomain(raw: ProductRow): Product {
    const price = new Money(raw.priceAmount, raw.priceCurrency);
    const sku = new SKU(raw.sku);
    const description = new ProductDescription(raw.description);

    const product = Product.create(raw.name, description, price, sku, raw.categoryId);
    
    Object.assign(product, { id: raw.id });

    return product;
  }

  public static toPersistence(product: Product) {
    return {
      id: product.id,
      name: product.name,
      description: product.description.value,
      sku: product.sku.value,
      priceAmount: product.price.amount,
      priceCurrency: product.price.currency,
      categoryId: product.categoryId,
    };
  }
}