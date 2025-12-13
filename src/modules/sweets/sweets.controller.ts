import { Request, Response } from "express";
import * as sweetService from "./sweets.service";

export const createSweet = async (req: Request, res: Response) => {
  try {
    const sweet = await sweetService.createSweet(req.body.name, req.body.category, req.body.price, req.body.quantity);
    res.status(201).json(sweet);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getSweets = async (req: Request, res: Response) => {
  const sweets = await sweetService.getSweets();
  res.json(sweets);
};

export const searchSweets = async (req: Request, res: Response) => {
  const { name, category, minPrice, maxPrice } = req.query;
  const sweets = await sweetService.searchSweets({
    name: name as string,
    category: category as string,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined
  });
  res.json(sweets);
};

export const updateSweet = async (req: Request, res: Response) => {
  try {
    const sweet = await sweetService.updateSweet(req.params.id, req.body);
    res.json(sweet);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteSweet = async (req: Request, res: Response) => {
  try {
    await sweetService.deleteSweet(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const purchaseSweet = async (req: Request, res: Response) => {
  try {
    const sweet = await sweetService.purchaseSweet(req.params.id);
    res.json(sweet);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const restockSweet = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    const sweet = await sweetService.restockSweet(req.params.id, amount);
    res.json(sweet);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
