import { Request, Response, NextFunction } from "express";

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (user.role !== "ADMIN") {
        return res.status(403).json({message: "Admins only allowed!"});
    }
    next();
};
