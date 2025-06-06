import { Request, Response } from "express";
import { CreateProductUseCase } from "../../application/use-cases/create-product/create-product.usecase.js";
import { GetProductByIdUseCase } from "../../application/use-cases/get-product-by-id/get-product-by-id.usecase.js";
import { SearchProductsUseCase } from "../../application/use-cases/search-products/search-products.usecase.js";
import { UpdateProductUseCase } from "../../application/use-cases/update-product/update-product.usecase.js";
import { DeleteProductUseCase } from "../../application/use-cases/delete-product/delete-product.usecase.js";
import { ProductPresentationMapper } from "../mappers/product.mapper.presentation.js";

export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductByIdUseCase: GetProductByIdUseCase,
    private readonly searchProductsUseCase: SearchProductsUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const product = await this.createProductUseCase.execute(req.body);
      const productDto = ProductPresentationMapper.toDto(product);
      res.status(201).json(productDto);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const product = await this.getProductByIdUseCase.execute({ id });
      if (product) {
        const productDto = ProductPresentationMapper.toDto(product);
        res.status(200).json(productDto);
      } else {
        res.status(404).json({ message: "Product not found." });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.searchProductsUseCase.execute();
      const productsDto = products.map(ProductPresentationMapper.toDto);
      res.status(200).json(productsDto);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.updateProductUseCase.execute({ id, ...req.body });
      res.status(204).send(); // 204 No Content
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.deleteProductUseCase.execute({ id });
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}