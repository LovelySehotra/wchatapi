import { Schema, model, Types } from "mongoose";

interface LastMessage {
  _id: Types.ObjectId;
  text: string;
  senderId: Types.ObjectId;
  createdAt: Date;
}

export interface ConversationDocument {
  participants: Types.ObjectId[];
  lastMessage?: LastMessage;
  unreadCount: Record<string, number>;
  lastReadAt: Record<string, Date>;
  updatedAt: Date;
}

const LastMessageSchema = new Schema<LastMessage>(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    text: String,
    senderId: { type: Schema.Types.ObjectId, required: true },
    createdAt: Date,
  },
  { _id: false }
);

const ConversationSchema = new Schema<ConversationDocument>(
  {
    participants: {
      type: [Schema.Types.ObjectId],
      required: true,
      index: true,
    },

    lastMessage: LastMessageSchema,

    unreadCount: {
      type: Map,
      of: Number,
      default: {},
    },

    lastReadAt: {
      type: Map,
      of: Date,
      default: {},
    },
  },
  { timestamps: true }
);

ConversationSchema.index({ participants: 1 }, { unique: true });

export const Conversation = model(
  "Conversation",
  ConversationSchema
);