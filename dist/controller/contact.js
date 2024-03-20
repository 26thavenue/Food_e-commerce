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
exports.getAllContactDetails = exports.createContact = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, message } = req.body;
    if (!email || !name || !message) {
        return res.json({ message: 'Invalid feeback !!!!' }).status(400);
    }
    try {
        yield prisma.contact.create({
            data: {
                email,
                name,
                message
            }
        });
        return res.json({ message: 'Your message has been received' }).status(201);
    }
    catch (error) {
        console.log(error);
        return res.json({ message: 'Error creating contact form' }).status(500);
    }
});
exports.createContact = createContact;
const getAllContactDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allContact = yield prisma.contact.findMany();
    if (!allContact) {
        return res.json({ message: 'No messages' }).status(404);
    }
    return res.json(allContact).status(200);
});
exports.getAllContactDetails = getAllContactDetails;
