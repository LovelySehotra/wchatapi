import { Socket } from "socket.io";
import { markRead } from "../../modules/message/message.service";
import { getIO } from "../index";

export const readHandler = (socket: Socket) => {
  const io = getIO();
  const readerId = socket.data.user.userId;

  socket.on("message_read", async ({ messageId }) => {
    const message = await markRead(messageId);

    if (!message) return;

    io.to(message.senderId).emit("message_read", {
      messageId,
      readerId,
    });
  });
};
