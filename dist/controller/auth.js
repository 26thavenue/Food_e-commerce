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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.signUp = exports.login = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400);
            return res.json({ message: 'Please fill all the required fields' });
        }
        const user = yield prisma.user.findFirst({
            where: {
                email: email
            }
        });
        if (!user) {
            res.status(400);
            return res.json({ message: 'Invalid password' });
        }
        if (!(0, bcrypt_1.compareSync)(password, user.hashedPassword)) {
            res.status(403);
            return res.json({ message: 'Invalid password' });
            // throw new Error('Invalid password')
        }
        const secret = process.env.JWT_SECRET;
        const token = jsonwebtoken_1.default.sign({ id: user.id }, secret);
        return res.json({ user, token });
    }
    catch (error) {
        console.log(error);
    }
});
exports.login = login;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        res.status(400);
        return res.json({ message: 'Please fill all the required fields' });
    }
    const checkForDuplicteEmail = yield prisma.user.findFirst({
        where: {
            email: email
        }
    });
    if (checkForDuplicteEmail) {
        res.status(500);
        return res.json({ message: 'Email already exists' });
    }
    const user = yield prisma.user.create({
        data: {
            email: email,
            hashedPassword: (0, bcrypt_1.hashSync)(password, 10),
            name: name
        }
    });
    return res.json(user);
});
exports.signUp = signUp;
const me = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json(req.user);
});
exports.me = me;
