import mongoose from 'mongoose';
import {ENV} from "./env.js";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV.MONGO_URL);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("Error connection to MONGODB: ", error.message, "");
        process.exit(1);
    }
}