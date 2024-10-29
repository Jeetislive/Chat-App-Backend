import express from "express"
import dotenv from "dotenv"
import cors from "cors";  // Middleware for enabling CORS (Cross-Origin Resource Sharing)


import { connectDB } from "./db/db.js";
import router from "./routes/index.js";

// Load environment variables from .env file
dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json());

// Routes 
app.use("/api",router);

app.get("/",(req,res) => {
    res.send("Hello, World!!")
})

// Connect to MongoDB & running the server
connectDB().
then(() => {
    app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)  
    })
})
