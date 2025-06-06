import { Router } from "express";
import { CategoryController } from "../controllers/category.controller.js";

export const createCategoryRoutes = (categoryController: CategoryController): Router => {
    const router = Router();

    router.post("/", (req, res) => categoryController.create(req, res));
    router.get("/", (req, res) => categoryController.findAll(req, res));
    router.put("/:id", (req, res) => categoryController.update(req, res));
    router.delete("/:id", (req, res) => categoryController.delete(req, res));
    
    return router;
}