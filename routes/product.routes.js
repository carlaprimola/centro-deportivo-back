import { Router } from "express";
import ProductController from "../controllers/product.controller.js";
import { createProductSchema } from "../schemas/product.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

const ProductRouter = Router();
//ProductRouter.use(isAdmin); // Aplicar el middleware isAdmin a todas las rutas de roles

<<<<<<< HEAD
v1ProductRouter
=======
ProductRouter
>>>>>>> 7a7e0ca8364cac0f68108a6052f53cd905b18105
    .get('/', ProductController.getAllProducts)
    .get('/product/:id', ProductController.getProduct)
    .post('/add-product',validateSchema (createProductSchema),ProductController.createNewProduct)
    .put('/product/:id', ProductController.updateOneProduct)
    .delete('/product/:id', ProductController.deleteOneProduct)
    /* .put('/products/:id/stock', productController.updateOneProduct) */

export default ProductRouter ;