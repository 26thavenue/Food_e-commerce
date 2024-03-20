import { Request , Response} from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createOrder = async(req:Request, res:Response) => {

    const user = req.user

    const {address} = req.body

    if(!user){
        return res.json({message:'You need to be logged in to make an order'}).status(404)
    }

    const userWithCartItems = await prisma.user.findUnique({
        where: {
            id: user.id
        },
        include: {
            cartItems: {
                include: {
                    product: true
                }
            
            }
        }
    })

      if(!userWithCartItems){
        return res.json({message:'User not found'}).status(404)
    }

    const totalPrice = userWithCartItems.cartItems.reduce((acc:any, cartItem:any) => {
            // Multiply the product price by the cart item quantity and add to accumulator
            return acc + (cartItem.product.price * cartItem.quantity);
        }, 0);

    try {
        const newOrder = await prisma.order.create({
            data:{
                address,
                userId : user.id,
                totalAmount:totalPrice
            }
        })

        return res.json(newOrder).status(201)
    } catch (error) {
        console.log(error)
        return res.json({message:'Error creating order'}).status(500)
    }
            

}

export const getAllUserOrders = async (req:Request, res:Response) => {

    const user = req.user

    if(!user){
        return res.json({message:'You need to be logged in to view your orders'}).status(404)
    }

    try {
        const userOrders = await prisma.order.findMany({
        where:{
            userId:user.id
            },include:{
                user:{
                    include:{
                        cartItems:{
                            include:{
                                product:true
                            }
                        }
                    }
                }
            }
        })

        return res.json({userOrders}).status(200)
    } catch (error) {
        console.log(error)
        return res.json({message:'Error fetching orders'}).status(500)
    }

    

}

export const deleteOrder = async(req: Request, res: Response) => {
        const user = req.user

        if(!user){
            return res.json({message:'You need to be logged in to delete an order'}).status(404)
        }
    
        const orderId = req.params.id
    
        if(!orderId){
            return res.json({message:'Order Id is required'}).status(404)
        }
        const item = await prisma.order.findFirst({
                where: {
                    AND: [
                        { id: req.params.id },
                        { userId: user.id } 
                    ]
                }
            })
        if(!item){
            return res.json({message:'Order not found'}).status(404)
        }
        try {
            await prisma.order.delete({
                where:{
                    id:orderId
                }
            })
    
            return res.json({message:'Order deleted'}).status(200)
        } catch (error) {
            console.log(error)
            return res.json({message:'Error deleting order'}).status(500)
        }
}