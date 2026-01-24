import { Schema, model } from "mongoose";

const messageSchema = new Schema(
    {
        senderId: { type: String, required: true },
        receiverId: { type: String, required: true },
        text: { type: String, required: true },
        status: {
            type: String,
            enum: ["sent", "delivered", "read"],
            default: "sent",
        },
        clientMessageId: {
            type: String,
            required: true,
            unique: true,
        },

    },
    { timestamps: true }
);

export const Message = model("Message", messageSchema);
