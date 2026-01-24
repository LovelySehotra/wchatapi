import { Message } from "./message.model";

export const createMessage = async ({
  senderId,
  receiverId,
  text,
}: {
  senderId: string;
  receiverId: string;
  text: string;
}) => {
  return Message.create({
    senderId,
    receiverId,
    text,
  });
};
export const getChatHistory = async ({
  userId,
  otherUserId,
  limit = 20,
  cursor,
}: {
  userId: string;
  otherUserId: string;
  limit?: number;
  cursor?: string;
}) => {
  const query: any = {
    $or: [
      { senderId: userId, receiverId: otherUserId },
      { senderId: otherUserId, receiverId: userId },
    ],
  };

  if (cursor) {
    query._id = { $lt: cursor }; // pagination
  }

  return Message.find(query)
    .sort({ _id: -1 })
    .limit(limit);
};
