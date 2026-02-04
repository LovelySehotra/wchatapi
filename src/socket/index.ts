import { Server } from "socket.io";
// import { socketAuthMiddleware } from "./middleware";
import { addUserSocket, removeUserSocket } from "./presence.store";
import { messageHandler } from "./handlers/message.handler";
import { typingHandler } from "./handlers/typing.handler";
import { readHandler } from "./handlers/read.handler";
import { socketAuthMiddleware } from "./middleware";
import { createAdapter } from "@socket.io/redis-adapter";
import { pubClient, subClient } from "../config/redis";

let io: Server;

export const initSocket = (httpServer: any) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*",
      credentials: true,
    },
  });
  io.adapter(createAdapter(pubClient, subClient));
  io.use(socketAuthMiddleware);

  io.on("connection", (socket) => {
    console.log("socket",socket.data)
    const userId = socket.data.user.userId;
    const isFirst = addUserSocket(userId, socket.id);
    socket.join(userId);

    if (isFirst) {
      io.emit("user_online", { userId });
    }
    messageHandler(socket);
    typingHandler(socket);
    readHandler(socket);
    socket.on("disconnect", () => {
      const isLast = removeUserSocket(userId, socket.id);

      if (isLast) {
        io.emit("user_offline", { userId });
      }
    });
  });
};

export const getIO = () => io;
