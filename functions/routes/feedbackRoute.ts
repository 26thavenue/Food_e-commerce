import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/admin";

import { createFeedback, getAllFeedbacks } from "../controller/feedback";

const feedbackRouter:Router = Router();

feedbackRouter.post("/", createFeedback);
feedbackRouter.get("/", [authMiddleware], getAllFeedbacks);

export default feedbackRouter;