import { Router } from "express";

import authRouter from "./authRoute";
import productRouter from "./productRoute";
import userRouter from "./userRoute";
const routes:Router = Router();

routes.use('/auth',authRouter);
routes.use('/product',productRouter);
routes.use('/user',userRouter);

export default routes;