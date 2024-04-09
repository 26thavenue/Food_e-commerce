import { PrismaClient } from '@prisma/client';
import {Request, Response} from 'express';
import { hashSync} from 'bcrypt';

const prisma = new PrismaClient();

export const getAllUsers = async(req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany()
        return res.json(users).status(200)
    } catch (error) {
        console.log(error);
    }
}

export const getOneUser = async(req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: {id: id}
        })
        return res.json(user).status(200)
    } catch (error) {
        console.log(error);
    }
}

export const updateUser = async(req: Request, res: Response) =>{
    const userId = req.user?.id;
    const { password} = req.body;

    if(!userId){
        return res.json({message:'User not found'}).status(404)
    }
    if( !password){
        return res.json({message:'Name and password are required'}).status(404)
    }

    const user = await prisma.user.findUnique({
        where: {id:userId}
    })

    if(!user){
        return res.json({message:'User not found'}).status(404)
    }

    const oldPassword = user.hashedPassword

    if(oldPassword === hashSync(password,10)){
        return res.json({message:'New password is the same as the old one'}).status(400)
    }

    try {


        
        const updatedUser = await prisma.user.update({
            where: {id:userId },
            data: {
                hashedPassword: hashSync(password,10),
            }
        })
        return res.json(updatedUser).status(200)
    } catch (error) {
        console.log(error)
        return res.json({message:'Error updating user'}).status(500)
    }

   
}