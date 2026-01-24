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
export const markDelivered = async (messageId: string) => {
    return Message.findByIdAndUpdate(
        messageId,
        { status: "delivered" },
        { new: true }
    );
};

export const markRead = async (messageId: string) => {
    return Message.findByIdAndUpdate(
        messageId,
        { status: "read" },
        { new: true }
    );
};
export const createMessageSafe = async (payload:any) => {
    try {
        return await Message.create(payload);
    } catch (err: any) {
        if (err.code === 11000) {
            // duplicate clientMessageId
            return Message.findOne({
                clientMessageId: payload.clientMessageId,
            });
        }
        throw err;
    }
};

