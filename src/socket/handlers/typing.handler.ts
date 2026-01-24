import { Socket } from "socket.io";
import { getIO } from "../index";

export const typingHandler = (socket: Socket) => {
  const io = getIO();
  const senderId = socket.data.user.userId;

  socket.on("typing_start", ({ receiverId }) => {
    if (!receiverId) return;

    io.to(receiverId).emit("user_typing", {
      userId: senderId,
    });
  });

  socket.on("typing_stop", ({ receiverId }) => {
    if (!receiverId) return;

    io.to(receiverId).emit("user_stop_typing", {
      userId: senderId,
    });
  });
};
