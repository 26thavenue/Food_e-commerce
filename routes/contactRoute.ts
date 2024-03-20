import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/admin";

import { createContact, getAllContactDetails } from "../controller/contact";

const contactRouter:Router = Router();

contactRouter.post("/", createContact);
contactRouter.get("/", [authMiddleware], getAllContactDetails);

export default contactRouter;