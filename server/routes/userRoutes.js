import express from "express"
import { protectRoutes } from "../middleware/protectRoutes.js";
import { getUsersForSidebar } from "../controllers/getUsersController.js";

const userRoutes = express.Router();

// User routes will go here...
userRoutes.get("/", protectRoutes, getUsersForSidebar);


export default userRoutes;
