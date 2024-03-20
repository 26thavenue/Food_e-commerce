import { Router } from "express";
import { getProduct, getProducts, deleteProduct, createProduct, updateProduct } from "../functions/controller/product";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/admin";
const productRouter:Router = Router ();

productRouter.get('/', [authMiddleware],getProducts);
productRouter.get('/:id', [authMiddleware],getProduct);
productRouter.post('/', [authMiddleware,adminMiddleware],createProduct);
productRouter.put('/:id', [authMiddleware,adminMiddleware],updateProduct);
productRouter.delete('/:id', [authMiddleware,adminMiddleware],deleteProduct);

export default productRouter