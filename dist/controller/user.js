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
exports.updateUser = exports.getOneUser = exports.getAllUsers = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = require("bcrypt");
const prisma = new client_1.PrismaClient();
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany();
        return res.json(users).status(200);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllUsers = getAllUsers;
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield prisma.user.findUnique({
            where: { id: id }
        });
        return res.json(user).status(200);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getOneUser = getOneUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const { password } = req.body;
    if (!userId) {
        return res.json({ message: 'User not found' }).status(404);
    }
    if (!password) {
        return res.json({ message: 'Name and password are required' }).status(404);
    }
    try {
        const updatedUser = yield prisma.user.update({
            where: { id: userId },
            data: {
                hashedPassword: (0, bcrypt_1.hashSync)(password, 10),
            }
        });
        return res.json(updatedUser).status(200);
    }
    catch (error) {
        console.log(error);
        return res.json({ message: 'Error updating user' }).status(500);
    }
});
exports.updateUser = updateUser;
