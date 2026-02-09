import { Server } from "socket.io";

export async function isChatOpenAnywhere(
  io: Server,
  userId: string,
  conversationId: string
): Promise<boolean> {
  const sockets = await io.in(userId).fetchSockets();

  return sockets.some(
    (s) => s.data.activeConversationId === conversationId
  );
}