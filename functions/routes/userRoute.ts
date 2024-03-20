import { Router } from "express";
import { updateUser, getAllUsers } from "../controller/user";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/admin";

const userRouter:Router = Router ();

userRouter.get('/', [authMiddleware,adminMiddleware],getAllUsers);
userRouter.put('/', [authMiddleware],updateUser);

export default userRouter;