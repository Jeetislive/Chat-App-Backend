import express from "express"
import { logIn, logOut, signUp } from "../controllers/userAuthController.js";


const authRoute = express.Router();

authRoute.post("/signup",signUp);

authRoute.post("/login",logIn);

authRoute.get("/profile", (req, res) => {
    // Get user's profile based on JWT
    res.send("Retrieving user profile");
});

authRoute.post("/logout", logOut);

export default authRoute;