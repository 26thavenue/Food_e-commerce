"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const contact_1 = require("../controller/contact");
const contactRouter = (0, express_1.Router)();
contactRouter.post("/", contact_1.createContact);
contactRouter.get("/", [authMiddleware_1.authMiddleware], contact_1.getAllContactDetails);
exports.default = contactRouter;
