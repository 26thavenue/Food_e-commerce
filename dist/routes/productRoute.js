"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("../controller/product");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const admin_1 = require("../middlewares/admin");
const productRouter = (0, express_1.Router)();
productRouter.get('/', [authMiddleware_1.authMiddleware], product_1.getProducts);
productRouter.get('/:id', [authMiddleware_1.authMiddleware], product_1.getProduct);
productRouter.post('/', [authMiddleware_1.authMiddleware, admin_1.adminMiddleware], product_1.createProduct);
productRouter.put('/:id', [authMiddleware_1.authMiddleware, admin_1.adminMiddleware], product_1.updateProduct);
productRouter.delete('/:id', [authMiddleware_1.authMiddleware, admin_1.adminMiddleware], product_1.deleteProduct);
exports.default = productRouter;
