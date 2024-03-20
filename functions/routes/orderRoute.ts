import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/admin";

import { createOrder, getAllUserOrders, deleteOrder } from "../functions/controller/order";

const orderRouter:Router = Router();

orderRouter.post("/", [authMiddleware], createOrder);
orderRouter.get("/", [authMiddleware], getAllUserOrders);
orderRouter.delete("/:id", [authMiddleware, adminMiddleware], deleteOrder);

export default orderRouter;