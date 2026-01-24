import { Socket } from "socket.io";
import { createMessage } from "../../modules/message/message.service";
import { getIO } from "../index";

export const messageHandler = (socket: Socket) => {
  socket.on("send_message", async (payload, callback) => {
    try {
      const senderId = socket.data.user.userId;
      const { receiverId, text } = payload;

      if (!receiverId || !text) {
        return callback({ success: false, error: "Invalid payload" });
      }

      // 1. Save message
      const message = await createMessage({
        senderId,
        receiverId,
        text,
      });

      // 2. Emit to receiver
      const io = getIO();
      io.to(receiverId).emit("receive_message", message);

      // 3. Ack sender
      callback({ success: true, message });
    } catch (err) {
      callback({ success: false, error: "Message failed" });
    }
  });
};
