import { Server } from "socket.io";
import { socketAuthMiddleware } from "./middleware";

let io: Server;

export const initSocket = (httpServer: any) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.use(socketAuthMiddleware);

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);
  });
};

export const getIO = () => io;
