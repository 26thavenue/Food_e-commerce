"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("./../controller/auth");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const authRouter = (0, express_1.Router)();
authRouter.post("/login", auth_1.login);
authRouter.post("/register", auth_1.signUp);
authRouter.get("/me", [authMiddleware_1.authMiddleware], auth_1.me);
authRouter.get('/', (req, res) => {
    res.send('Auth route works');
});
exports.default = authRouter;
