import bcrypt from "bcryptjs"

import User from "../model/userAuthSchema.js";
import { generateToken } from "../utils/generateToken.js";

export const signUp = async(req,res) => {
    try {
        // Validate request data
        const { name, username, email, password, confirmPassword, phone, gender } = req.body;
        // Check if all required fields are provided
        if (!name ||!username ||!email ||!password ||!confirmPassword ||!phone ||!gender) {
            return res.status(400).json({ error: "All fields are required" });
        }
        // Check if password is matching with confirmPassword
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }
        // Check if username already exists
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }
        // HASH PASSWORD HERE
            const hashedPassword = await bcrypt.hash(password, 10);

        // https://avatar-placeholder.iran.liara.run/

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // Create new user
        const newUser = new User({
            name,
            username,
            email,
            password: hashedPassword,
            phone,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        });

        // Save user to database
        if (newUser) {
            // Generate JWT token here
            const token = generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                token,
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }   
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
    
}

export const logIn = async(req,res) => {
    try {
        // Validate request data
        const { username, password } = req.body;
        // Check if all required fields are provided
        if (!username ||!password) {
            return res.status(400).json({ error: "All fields are required" });
        }
        // Check if username exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        // Generate JWT token here
        const token = generateToken(user._id, res);
        // Return user data with JWT token
        res.status(200).json({
            token,
            msg: "login Successfully",
            _id: user._id,
            fullName: user.name,
            username: user.username,
            profilePic: user.profilePic,
        });
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

export const logOut = async(req,res) => {
    try {
        // Logout user and invalidate JWT
        res.json({ msg: "Logged out successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}