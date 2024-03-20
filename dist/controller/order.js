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
exports.deleteOrder = exports.getAllUserOrders = exports.createOrder = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { address } = req.body;
    if (!user) {
        return res.json({ message: 'You need to be logged in to make an order' }).status(404);
    }
    const userWithCartItems = yield prisma.user.findUnique({
        where: {
            id: user.id
        },
        include: {
            cartItems: {
                include: {
                    product: true
                }
            }
        }
    });
    if (!userWithCartItems) {
        return res.json({ message: 'User not found' }).status(404);
    }
    const totalPrice = userWithCartItems.cartItems.reduce((acc, cartItem) => {
        // Multiply the product price by the cart item quantity and add to accumulator
        return acc + (cartItem.product.price * cartItem.quantity);
    }, 0);
    try {
        const newOrder = yield prisma.order.create({
            data: {
                address,
                userId: user.id,
                totalAmount: totalPrice
            }
        });
        return res.json(newOrder).status(201);
    }
    catch (error) {
        console.log(error);
        return res.json({ message: 'Error creating order' }).status(500);
    }
});
exports.createOrder = createOrder;
const getAllUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        return res.json({ message: 'You need to be logged in to view your orders' }).status(404);
    }
    try {
        const userOrders = yield prisma.order.findMany({
            where: {
                userId: user.id
            }, include: {
                user: {
                    include: {
                        cartItems: {
                            include: {
                                product: true
                            }
                        }
                    }
                }
            }
        });
        return res.json({ userOrders }).status(200);
    }
    catch (error) {
        console.log(error);
        return res.json({ message: 'Error fetching orders' }).status(500);
    }
});
exports.getAllUserOrders = getAllUserOrders;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        return res.json({ message: 'You need to be logged in to delete an order' }).status(404);
    }
    const orderId = req.params.id;
    if (!orderId) {
        return res.json({ message: 'Order Id is required' }).status(404);
    }
    const item = yield prisma.order.findFirst({
        where: {
            AND: [
                { id: req.params.id },
                { userId: user.id }
            ]
        }
    });
    if (!item) {
        return res.json({ message: 'Order not found' }).status(404);
    }
    try {
        yield prisma.order.delete({
            where: {
                id: orderId
            }
        });
        return res.json({ message: 'Order deleted' }).status(200);
    }
    catch (error) {
        console.log(error);
        return res.json({ message: 'Error deleting order' }).status(500);
    }
});
exports.deleteOrder = deleteOrder;
