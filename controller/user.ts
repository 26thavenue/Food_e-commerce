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

export const updateUser = (req: Request, res: Response) =>{
    const id = req.user?.id;
    const {name, email, password} = req.body;

    try {
         const updatedUser = prisma.user.update({
        where: {id: id},
        data: {
            name,
            email,
            hashedPassword: hashSync(password,10),
        }
    })
    return res.status(200).json(updatedUser); 
    } catch (error) {
        console.log(error)
    }

   
}