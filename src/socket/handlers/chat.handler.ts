import { Server, Socket } from "socket.io";
import { markConversationRead } from "../../modules/conversation/conversation.service";


export function readHandler(io: Server, socket: Socket) {
  const userId = socket.data.user.userId;

  socket.on("chat:read", async ({ conversationId }) => {
    await markConversationRead(conversationId, userId);

    socket.to(conversationId).emit("chat:read:ack", {
      conversationId,
      userId,
    });
  });
}