import { Router } from "express";
import productController from "../controllers/product.controller.js";


const v1ProductRouter = Router();
//v1ProductRouter.use(isAdmin); // Aplicar el middleware isAdmin a todas las rutas de roles

v1ProductRouter
    .get('/products', productController.getALLProducts)
    .get('/products/:id', productController.getProduct)
    .post('/add-product', productController.createNewProduct)
    .put('/products/:id', productController.updateOneProduct)
    .delete('/products/:id', productController.deleteOneProduct)
    .put('/products/:id/stock', productController.updateOneProduct)

export default v1ProductRouter ;