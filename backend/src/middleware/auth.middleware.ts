import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
    userId?: any;
}

export const authenticateToken =  (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try{
        const decoded = jwt.verify(token, "secretkey")
        req.userId = decoded
        next()
    } catch (error) {
        return res.status(403).json({ message: "Invalid token" });
    }
}