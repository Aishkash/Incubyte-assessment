import prisma from "../../config/prisma";

export const createSweet = async (name: string, category: string, price: number, quantity: number) => {
  return prisma.sweet.create({
    data: { name, category, price, quantity }
  });
};

export const getSweets = async () => {
  return prisma.sweet.findMany();
};

export const searchSweets = async (query: { name?: string; category?: string; minPrice?: number; maxPrice?: number }) => {
  return prisma.sweet.findMany({
    where: {
      AND: [
        query.name ? { name: { contains: query.name, mode: "insensitive" } } : {},
        query.category ? { category: { equals: query.category } } : {},
        query.minPrice !== undefined ? { price: { gte: query.minPrice } } : {},
        query.maxPrice !== undefined ? { price: { lte: query.maxPrice } } : {}
      ]
    }
  });
};

export const updateSweet = async (id: string, data: Partial<{ name: string; category: string; price: number; quantity: number }>) => {
  return prisma.sweet.update({
    where: { id },
    data
  });
};

export const deleteSweet = async (id: string) => {
  return prisma.sweet.delete({
    where: { id }
  });
};

export const purchaseSweet = async (id: string) => {
  const sweet = await prisma.sweet.findUnique({ where: { id } });
  if (!sweet) throw new Error("Sweet not found");
  if (sweet.quantity <= 0) throw new Error("Out of stock");

  return prisma.sweet.update({
    where: { id },
    data: { quantity: sweet.quantity - 1 }
  });
};

export const restockSweet = async (id: string, amount: number) => {
  const sweet = await prisma.sweet.findUnique({ where: { id } });
  if (!sweet) throw new Error("Sweet not found");

  return prisma.sweet.update({
    where: { id },
    data: { quantity: sweet.quantity + amount }
  });
};
