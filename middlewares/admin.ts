import { Request,Response, NextFunction } from "express";


export const adminMiddleware = async(req:Request, res:Response, next:NextFunction) => {
   const user = req.user
   if(user?.role.toUpperCase() !== 'ADMIN'){
         return next(res.json({message: 'Unauthorized'}).status(401))
    }
    next()

    
    


}