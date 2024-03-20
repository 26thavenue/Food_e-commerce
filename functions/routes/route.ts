import { Router } from "express";

import authRouter from "./authRoute";
import productRouter from "./productRoute";
import userRouter from "./userRoute";
import cartRouter from "./cartRoute";
import orderRouter from "./orderRoute";
import feedbackRouter from "./feedbackRoute";
import contactRouter from "./contactRoute";


export const routes:Router = Router();

routes.use('/auth',authRouter);
routes.use('/product',productRouter);
routes.use('/user',userRouter);
routes.use('/cart',cartRouter);
routes.use('/order',orderRouter);
routes.use('/feedback',feedbackRouter);
routes.use('/contact',contactRouter);

