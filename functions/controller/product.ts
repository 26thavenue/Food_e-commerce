import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, description, imageUrl } = req.body;

    if(!name || !price || !description || !imageUrl) return res.status(400).json({message: 'Please fill all the required fields'});
    const product = await prisma.products.create({
      data: {
        name,
        price,
        description,
        imageUrl
      },
    });

    return res.json(product);
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.products.findMany();

    if(products.length === 0) return res.status(404).json({message: 'No products found, please add some products first!'});

    return res.json(products);
  } catch (error) {
    console.log(error);
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if(!id) return res.status(400).json({message: 'Please fill all the required fields'});

    const product = await prisma.products.findUnique({
      where: {
        id: id,
      },
    });

    if(!product) return res.status(404).json({message: 'Product not found'});


    return res.json(product);
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if(!id) return res.status(400).json({message: 'Please fill all the required fields'});


    const { name, price, description, imageUrl } = req.body;

    if(!name || !price || !description || !imageUrl) return res.status(400).json({message: 'Please fill all the required fields'});

    const product = await prisma.products.update({
      where: {
        id: id,
      },
      data: {
        name,
        price,
        description,
        imageUrl,
      },
    });

    return res.json(product);
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if(!id) return res.status(400).json({message: 'Please fill all the required fields'});

    const product = await prisma.products.delete({
      where: {
        id: id,
      },
    });

    return res.json(product);
  } catch (error) {
    console.log(error);
  }
};
