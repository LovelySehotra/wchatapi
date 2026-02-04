import { Schema, model, Types } from "mongoose";

export interface MessageDocument {
  conversationId: Types.ObjectId;
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  text: string;
  status: "sent" | "delivered" | "read";
  clientMessageId: string;
  createdAt: Date;
}

const MessageSchema = new Schema<MessageDocument>(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    senderId: { type: Schema.Types.ObjectId, required: true },
    receiverId: { type: Schema.Types.ObjectId, required: true },
    text: String,
    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "sent",
    },
    clientMessageId: {
      type: String,
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

MessageSchema.index(
  { senderId: 1, clientMessageId: 1 },
  { unique: true }
);

export const Message = model("Message", MessageSchema);