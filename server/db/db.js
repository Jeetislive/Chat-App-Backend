import mongoose from "mongoose"
// Connect to MongoDB
export const connectDB = async() => {
    try {
        await mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`);
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1);
    }
}