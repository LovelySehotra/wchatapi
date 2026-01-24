import { Request, Response } from "express";
import { getChatHistory } from "../message/message.service";

export const getChatMessages = async (req: Request, res: Response) => {
  const userId = req.user.userId; // from auth middleware
  const { otherUserId, limit, cursor } = req.query;

  if (!otherUserId) {
    return res.status(400).json({ error: "otherUserId required" });
  }

  const messages = await getChatHistory({
    userId,
    otherUserId: otherUserId as string,
    limit: Number(limit) || 20,
    cursor: cursor as string,
  });

  res.json(messages);
};
