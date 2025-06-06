import { Request, Response } from "express";
import { CreateCategoryUseCase } from "../../application/use-cases/create-category/create-category.usecase.js";
import { GetAllCategoriesUseCase } from "../../application/use-cases/get-all-categories/get-all-categories.usecase.js";
import { UpdateCategoryUseCase } from "../../application/use-cases/update-category/update-category.usecase.js";
import { DeleteCategoryUseCase } from "../../application/use-cases/delete-category/delete-category.usecase.js";
import { CategoryPresentationMapper } from "../mappers/category.mapper.presentation.js";

export class CategoryController {
    constructor(
        private readonly createCategoryUseCase: CreateCategoryUseCase,
        private readonly getAllCategoriesUseCase: GetAllCategoriesUseCase,
        private readonly updateCategoryUseCase: UpdateCategoryUseCase,
        private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
    ) {}

    async create(req: Request, res: Response): Promise<void> {
        try {
            const category = await this.createCategoryUseCase.execute(req.body);
            const categoryDto = CategoryPresentationMapper.toDto(category);
            res.status(201).json(categoryDto);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const categories = await this.getAllCategoriesUseCase.execute();
            const categoriesDto = categories.map(CategoryPresentationMapper.toDto);
            res.status(200).json(categoriesDto);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await this.updateCategoryUseCase.execute({ id, ...req.body });
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await this.deleteCategoryUseCase.execute({ id });
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}