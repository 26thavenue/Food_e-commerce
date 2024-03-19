import { Router } from "express";

import {login,signUp} from './../controller/auth'

const authRouter:Router = Router();

authRouter.post("/login", login );
authRouter.post("/register", signUp );

authRouter.get('/',(req,res)=>{
    res.send('Auth route works')
})

export default authRouter;