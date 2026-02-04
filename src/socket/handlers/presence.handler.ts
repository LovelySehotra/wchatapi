import { Server, Socket } from "socket.io";
import { addUserSocket, removeUserSocket } from "../presence.store";

export function registerPresence(io: Server, socket: Socket) {
  const userId = socket.data.user.userId;

  socket.join(userId);

  const isFirst = addUserSocket(userId, socket.id);
  if (isFirst) {
    io.emit("user:online", { userId });
  }

  socket.on("disconnect", () => {
    const isLast = removeUserSocket(userId, socket.id);
    if (isLast) {
      io.emit("user:offline", { userId });
    }
  });
}