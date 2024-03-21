import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/admin";

import { addItemToCart,getACartItem,getUserCart, deleteItemFromCart, changeQuantity } from "../controller/cart";

const cartRouter:Router = Router();

cartRouter.post("/", [authMiddleware], addItemToCart);
cartRouter.get("/", [authMiddleware], getUserCart);
cartRouter.get("/:id", [authMiddleware], getUserCart);
cartRouter.delete("/:id", [authMiddleware], deleteItemFromCart);
cartRouter.put("/:id", [authMiddleware], changeQuantity);

export default cartRouter;