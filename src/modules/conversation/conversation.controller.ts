import { Request, Response } from "express";
import { Conversation } from "./conversation.model";


export async function getConversations(
  req: Request,
  res: Response
) {
  const userId = req.user.id;

  const conversations = await Conversation.find({
    participants: userId,
  })
    .sort({ updatedAt: -1 })
    .lean();

  const response = conversations.map((c) => {
    const otherUserId = c.participants.find(
      (id) => id.toString() !== userId
    );

    return {
      conversationId: c._id,
      userId: otherUserId,
      lastMessage: c.lastMessage?.text,
      lastMessageAt: c.lastMessage?.createdAt,
      unreadCount: c.unreadCount?.[userId] || 0,
    };
  });

  res.json(response);
}