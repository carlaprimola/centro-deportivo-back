import { Router } from "express";
import productController from "../controllers/product.controller.js";
import { createProductSchema } from "../schemas/product.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

const v1ProductRouter = Router();
//v1ProductRouter.use(isAdmin); // Aplicar el middleware isAdmin a todas las rutas de roles

v1ProductRouter
    .get('/', productController.getAllProducts)
    .get('/product/:id', productController.getProduct)
    .post('/add-product',productController.createNewProduct)
    .put('/product/:id', productController.updateOneProduct)
    .delete('/product/:id', productController.deleteOneProduct)
    /* .put('/products/:id/stock', productController.updateOneProduct) */

export default v1ProductRouter ;