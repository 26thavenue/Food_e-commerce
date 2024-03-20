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
exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.getProducts = exports.createProduct = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, description, imageUrl } = req.body;
        if (!name || !price || !description || !imageUrl)
            return res.status(400).json({ message: 'Please fill all the required fields' });
        const product = yield prisma.products.create({
            data: {
                name,
                price,
                description,
                imageUrl
            },
        });
        return res.json(product);
    }
    catch (error) {
        console.log(error);
    }
});
exports.createProduct = createProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield prisma.products.findMany();
        if (products.length === 0)
            return res.status(404).json({ message: 'No products found, please add some products first!' });
        return res.json(products);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getProducts = getProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({ message: 'Please fill all the required fields' });
        const product = yield prisma.products.findUnique({
            where: {
                id: id,
            },
        });
        if (!product)
            return res.status(404).json({ message: 'Product not found' });
        return res.json(product);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getProduct = getProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({ message: 'Please fill all the required fields' });
        const { name, price, description, imageUrl } = req.body;
        if (!name || !price || !description || !imageUrl)
            return res.status(400).json({ message: 'Please fill all the required fields' });
        const product = yield prisma.products.update({
            where: {
                id: id,
            },
            data: {
                name,
                price,
                description,
                imageUrl,
            },
        });
        return res.json(product);
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({ message: 'Please fill all the required fields' });
        const product = yield prisma.products.delete({
            where: {
                id: id,
            },
        });
        return res.json(product);
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteProduct = deleteProduct;
