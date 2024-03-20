"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getACartItem = exports.getUserCart = exports.changeQuantity = exports.deleteItemFromCart = exports.addItemToCart = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const addItemToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        return res.json({ message: 'You are not logged in' }).status(404);
    }
    const { productId, quantity } = req.body;
    if (!productId || !quantity || !userId) {
        return res.json({ message: 'Invalid request' });
    }
    const product = yield prisma.products.findFirst({
        where: {
            id: productId
        }
    });
    if (!product) {
        return res.json({ message: 'Product not found' });
    }
    const user = yield prisma.user.findFirst({
        where: {
            id: userId
        }
    });
    if (!user) {
        return res.json({ message: 'User not found' }).status(404);
    }
    try {
        const newCart = yield prisma.cartItems.create({
            data: {
                quantity: quantity,
                userId: userId,
                productId: productId
            }
        });
        return res.json(newCart);
    }
    catch (error) {
    }
});
exports.addItemToCart = addItemToCart;
const deleteItemFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        return res.json({ message: 'User not found' }).status(404);
    }
    const item = yield prisma.cartItems.findFirst({
        where: {
            AND: [
                { id: req.params.id },
                { userId: user.id }
            ]
        }
    });
    yield prisma.cartItems.delete({
        where: {
            id: req.params.id
        }
    });
    return res.json({ message: 'Item deleted' }).status(200);
});
exports.deleteItemFromCart = deleteItemFromCart;
const changeQuantity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { quantity } = req.body;
    if (!quantity) {
        return res.json({ message: 'Invalid request' }).status(400);
    }
    yield prisma.cartItems.update({
        where: {
            id: req.params.id,
            userId: user === null || user === void 0 ? void 0 : user.id
        },
        data: {
            quantity: quantity
        }
    });
    return res.json({ message: 'Quantity updated' }).status(200);
});
exports.changeQuantity = changeQuantity;
const getUserCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        return res.json({ message: 'You are not logged in' }).status(404);
    }
    const checkUser = yield prisma.user.findFirst({
        where: {
            id: user.id
        },
    });
    if (!checkUser) {
        return res.json({ message: 'User not found' }).status(404);
    }
    const cart = yield prisma.cartItems.findMany({
        where: {
            userId: user.id
        },
        include: {
            product: true
        }
    });
    if (!cart) {
        return res.json({ message: 'Cart is empty' }).status(200);
    }
    return res.json(cart).status(200);
});
exports.getUserCart = getUserCart;
const getACartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        return res.json({ message: 'You are not logged in' }).status(404);
    }
    const checkUser = yield prisma.user.findFirstOrThrow({
        where: {
            id: user.id
        },
    });
    if (!checkUser) {
        return res.json({ message: 'User not found' }).status(404);
    }
    const cart = yield prisma.cartItems.findFirst({
        where: {
            id: req.params.id
        },
        include: {
            product: true
        }
    });
    if (!cart) {
        return res.json({ message: 'No such cart Item' }).status(200);
    }
    return res.json(cart).status(200);
});
exports.getACartItem = getACartItem;
