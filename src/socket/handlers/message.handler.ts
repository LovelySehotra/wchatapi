import { Socket } from "socket.io";
import { createMessage, markDelivered } from "../../modules/message/message.service";
import { getIO } from "../index";

export const messageHandler = (socket: Socket) => {
    socket.on("send_message", async (payload, callback) => {
        try {
            const senderId = socket.data.user.userId;
            const { receiverId, text, clientMessageId } = payload;
            console.log("k0k", receiverId, text)
            if (!receiverId || !text) {
                return callback({ success: false, error: "Invalid payload" });
            }

            // 1. Save message
            const message = await createMessage({
                senderId,
                receiverId,
                text,
                clientMessageId
            });
            console.log("k1k", message)
            // 2. Emit to receiver
            const io = getIO();
            // emit to receiver
            io.to(receiverId).emit("receive_message", message);

            // mark delivered if receiver online
            const sockets = io.sockets.adapter.rooms.get(receiverId);
            console.log("sockets",sockets)
            if (sockets && sockets.size > 0) {
                const updated = await markDelivered(message._id.toString());

                io.to(senderId).emit("message_delivered", {
                    messageId: message._id,
                });
            }

            // 3. Ack sender
            callback({ success: true, message });
        } catch (err) {
            callback({ success: false, error: "Message failed" });
        }
    });
};
