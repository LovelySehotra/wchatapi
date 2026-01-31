import { Request, Response } from "express";
import { getAllUsersService } from "./user.service";

export const getAllUsers = async (req: Request, res: Response) => {

    try {
        const users = await getAllUsersService();
        res.status(200).json(users);
    } catch (error) {
        throw error;
    }
}