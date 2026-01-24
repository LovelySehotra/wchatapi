const userSockets = new Map<string, Set<string>>();

export const addUserSocket = (userId: string, socketId: string) => {
  const sockets = userSockets.get(userId);
  if (!sockets) {
    userSockets.set(userId, new Set([socketId]));
    return true; // first connection
  }
  sockets.add(socketId);
  return false;
};

export const removeUserSocket = (userId: string, socketId: string) => {
  const sockets = userSockets.get(userId);
  if (!sockets) return false;

  sockets.delete(socketId);

  if (sockets.size === 0) {
    userSockets.delete(userId);
    return true; // last disconnect
  }
  return false;
};

export const isUserOnline = (userId: string) => {
  return userSockets.has(userId);
};
