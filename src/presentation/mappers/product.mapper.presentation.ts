import { Product } from "../../domain/aggregates/product.aggregate.js";
import { ProductDto } from "../../application/dtos/product.dto.js";

export class ProductPresentationMapper {
  public static toDto(product: Product): ProductDto {
    return {
      id: product.id,
      name: product.name,
      description: product.description.value,
      sku: product.sku.value,
      price: {
        amount: product.price.amount,
        currency: product.price.currency,
      },
      categoryId: product.categoryId,
    };
  }
}