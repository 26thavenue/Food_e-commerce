import { PrismaClient } from '@prisma/client';
import {Request, Response} from 'express';
import { hashSync} from 'bcrypt';

const prisma = new PrismaClient();

export const getAllUsers = (req: Request, res: Response) => {
    try {
        prisma.user.findMany().then((users) => {
            res.status(200).json(users);
        });
    } catch (error) {
        console.log(error);
    }
}

export const getOneUser = (req: Request, res: Response) => {
    const {id} = req.params;
    try {
        prisma.user.findUnique({
            where: {
                id: id
            }
        }).then((user) => {
            res.status(200).json(user);
        });
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