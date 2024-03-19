import { Router } from "express";

import authRouter from "./authRoute";

const routes:Router = Router();

routes.use('/auth',authRouter);

export default routes;