import { Router } from "express";

import {login,signUp,me} from '../controller/auth'

import { authMiddleware } from "../middlewares/authMiddleware";

const authRouter:Router = Router();

authRouter.post("/login", login );
authRouter.post("/register", signUp );
authRouter.get("/me",[authMiddleware], me );

authRouter.get('/',(req,res)=>{
    res.send('Auth route works')
})

export default authRouter;