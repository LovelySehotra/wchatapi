import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const DB_URI = process.env.DB_URI||"mongodb://localhost:27017/wchat";

export const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI!, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        } as mongoose.ConnectOptions);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}