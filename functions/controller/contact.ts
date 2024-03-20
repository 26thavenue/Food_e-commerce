import { Request , Response} from "express";
import { PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export const createContact = async (req: Request, res: Response) => {
    const {email, name, message } = req.body

    if(!email || !name || !message){
        return res.json({message:'Invalid feeback !!!!'}).status(400)
    }

    try {
         await prisma.contact.create({
            data:{
                email,
                name,
                message
            }
        })
        return res.json({message:'Your message has been received'}).status(201)
    } catch (error) {
        console.log(error)
        return res.json({message:'Error creating contact form'}).status(500)
    }
}

export const getAllContactDetails = async (req: Request, res: Response) => {
    const allContact = await prisma.contact.findMany()
    if(!allContact){
        return res.json({message:'No messages'}).status(404)
    }
    return res.json(allContact).status(200)
}