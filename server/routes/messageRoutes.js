import express from "express"
import { getConversations, sendMessage } from "../controllers/messageController.js";
import { protectRoutes } from "../middleware/protectRoutes.js";

const messageRoute = express.Router();

messageRoute.get("/:id",protectRoutes,getConversations)
messageRoute.post("/send/:id",protectRoutes,sendMessage)



export default messageRoute;