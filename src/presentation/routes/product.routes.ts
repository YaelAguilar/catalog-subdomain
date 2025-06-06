import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";

export const createProductRoutes = (productController: ProductController): Router => {
  const router = Router();

  router.post("/", (req, res) => productController.create(req, res));
  router.get("/:id", (req, res) => productController.findById(req, res));
  router.get("/", (req, res) => productController.findAll(req, res));
  router.put("/:id", (req, res) => productController.update(req, res));
  router.delete("/:id", (req, res) => productController.delete(req, res));
  
  return router;
};