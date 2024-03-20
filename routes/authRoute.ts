import { Router } from "express";

import {login,signUp,me} from './../controller/auth'

const authRouter:Router = Router();

authRouter.post("/login", login );
authRouter.post("/register", signUp );
authRouter.get("/me", me );

authRouter.get('/',(req,res)=>{
    res.send('Auth route works')
})

export default authRouter;