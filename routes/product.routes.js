import { Router } from "express";
import ProductController from "../controllers/product.controller.js";
import { createProductSchema } from "../schemas/product.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

const ProductRouter = Router();
//ProductRouter.use(isAdmin); // Aplicar el middleware isAdmin a todas las rutas de roles

ProductRouter
    .get('/', ProductController.getAllProducts)
    .get('/product/:id', ProductController.getProduct)
    .post('/add-product', validateSchema(createProductSchema), ProductController.createNewProduct)
    .put('/product/:id', ProductController.updateOneProduct)
    .delete('/product/:id', ProductController.deleteOneProduct)
/* .put('/products/:id/stock', productController.updateOneProduct) */

export default ProductRouter;