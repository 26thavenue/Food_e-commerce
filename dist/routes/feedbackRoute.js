"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const feedback_1 = require("../controller/feedback");
const feedbackRouter = (0, express_1.Router)();
feedbackRouter.post("/", feedback_1.createFeedback);
feedbackRouter.get("/", [authMiddleware_1.authMiddleware], feedback_1.getAllFeedbacks);
exports.default = feedbackRouter;
