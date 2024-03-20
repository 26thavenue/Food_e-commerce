import { Request , Response} from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createFeedback = async (req: Request, res: Response) => {
    const {email, name, message } = req.body

    if(!email || !name || !message){
        return res.json({message:'Invalid feeback !!!!'}).status(400)
    }

    try {
         await prisma.feedback.create({
            data:{
                email,
                name,
                message
            }
        })
        return res.json({message:'Feedback created successfully'}).status(201)
    } catch (error) {
        console.log(error)
        return res.json({message:'Error creating feedback'}).status(500)
    }
}

export const getAllFeedbacks = async (req: Request, res: Response) => {
    const feedbacks = await prisma.feedback.findMany()
    if(!feedbacks){
        return res.json({message:'No feedbacks found'}).status(404)
    }
    return res.json(feedbacks)
}