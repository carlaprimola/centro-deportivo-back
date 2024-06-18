import { Router } from "express";
import ProductController from "../controllers/product.controller.js";
import { createProductSchema } from "../schemas/product.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

const ProductRouter = Router();

ProductRouter
    .get('/', ProductController.getAllProducts)
    .get('/product/:id', ProductController.getProduct)
    .post('/add-product', validateSchema(createProductSchema), ProductController.createNewProduct)
    .put('/product/:id', ProductController.updateOneProduct)
    .delete('/product/:id', ProductController.deleteOneProduct)


export default ProductRouter;