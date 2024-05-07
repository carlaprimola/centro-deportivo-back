import productController from "../../controllers/productController.js";


const v1ProductRouter = Router();
//v1ProductRouter.use(isAdmin); // Aplicar el middleware isAdmin a todas las rutas de roles

v1ProductRouter
    .get("/", productController.getAllProducts)
    .get("/:product_Id", productController.getProduct)
    .post("/", productController.createNewProduct)
    .patch("/:product_Id", productController.updateOneProduct)
    .delete("/:product_Id", productController.deleteOneProduct)
    .patch("/:productId/update-stock", productController.updateStock)

export { v1ProductRouter };