import { Socket } from "socket.io";
import { markRead } from "../../modules/message/message.service";
import { getIO } from "../index";
import { Message } from "../../modules/message/message.model";
import { Conversation } from "../../modules/conversation/conversation.model";

export const readHandler = (socket: Socket) => {
  const io = getIO();
  const readerId = socket.data.user.userId;

  socket.on("message_read", async ({ messageId }) => {
    const message = await markRead(messageId) as any;

    if (!message) return;

    io.to(message.senderId).emit("message_read", {
      messageId,
      readerId,
    });
  });
  socket.on("chat:read", async ({ conversationId }) => {
    const userId = socket.data.user.id;

    // 1. Mark unread messages as read (terminal)
    await Message.updateMany(
      {
        conversationId,
        receiverId: userId,
        status: { $ne: "read" },
      },
      { $set: { status: "read" } }
    );

    // 2. Reset unread safely
    await Conversation.findByIdAndUpdate(
      conversationId,
      {
        $set: {
          [`unreadCount.${userId}`]: 0,
          [`lastReadAt.${userId}`]: new Date(),
        },
      }
    );

    // 3. Notify other user
    socket.to(conversationId).emit("chat:read:ack", {
      conversationId,
      userId,
    });
  });
};
