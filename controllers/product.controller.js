import  ProductModel  from "../models/product.model.js";

    // GET ALL PRODUCTS

const ProductController = {
    getAllProducts: async (_req, res) => {
    try {
        const products = await ProductModel.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error to obtain the products", error });
    }
},
    // GET ONE PRODUCT
    getProduct: async (req, res) => {
        try {
            const product = await ProductModel.findById(req.params.id);
            if (!product) return res.status(404).json({ message: "Product not found" });
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: "Error to obtain the product", error });
    }
    },

    // CREATE PRODUCT
    createNewProduct: async (req, res) => {
        try {
            const product = new ProductModel(req.body);
            const savedProduct = await product.save();
            res.json({ message: "Product created successfully", product: savedProduct });
        } catch (error) {
            res.status(500).json({ message: "Error to create the product", error });
        }
    },

    // UPDATE PRODUCT
    updateOneProduct: async (req, res) => {
        try {
            const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!product) return res.status(404).json({ message: "Product not found" });
            res.json({ message: "Product updated successfully", product });
        } catch (error) {
            res.status(500).json({ message: "Error to update the product", error });
        }
    },

    // DELETE PRODUCT
    deleteOneProduct: async (req, res) => {
        try {
            const product = await ProductModel.findByIdAndDelete(req.params.id);
            if (!product) return res.status(404).json({ message: "Product not found" });
            res.json({ message: "Product deleted successfully", product });
        } catch (error) {
            res.status(500).json({ message: "Error to delete the product", error });
      }

    },

    // UPDATE STOCK
    updateStock: async (req, res) => {
        try {
            const product = await ProductModel.findByIdAndUpdate(req.params.productId, req.body, { new: true });
            if (!product) return res.status(404).json({ message: "Product not found" });
            res.json({ message: "Product updated successfully", product });
        } catch (error) {
            res.status(500).json({ message: "Error to update the product", error });
        }
    },
};

export default ProductController;



