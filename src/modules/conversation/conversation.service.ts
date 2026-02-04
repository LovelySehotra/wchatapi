import { Message } from "../message/message.model";
import { Conversation } from "./conversation.model";

export async function markConversationRead(
  conversationId: string,
  userId: string
) {
  await Message.updateMany(
    {
      conversationId,
      receiverId: userId,
      status: { $ne: "read" },
    },
    { $set: { status: "read" } }
  );

  await Conversation.findByIdAndUpdate(conversationId, {
    $set: {
      [`unreadCount.${userId}`]: 0,
      [`lastReadAt.${userId}`]: new Date(),
    },
  });
}