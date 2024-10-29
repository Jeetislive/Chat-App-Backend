import jwt from "jsonwebtoken"
import User from "../model/userAuthSchema.js";

// Middleware to check if a user is authenticated

export const protectRoutes = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        //console.log(token);
        
        if (!token) {
          res.status(401).json({err: 'Please login to access this route'});
        }
      
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
          if (!decoded) {
            res.status(401).json({err: "Invalid token or token expires"});
          }
          const user = await User.findById(decoded.userId).select("-password");
          if (!user) {
            return res.status(404).json({ error: "User not found" });
          }
          req.user = user;
        //   req.user = decoded;
          next();
        }catch (error) {
        console.error("Error in protecting Routes Middleware", error.message);
        res.status(500).json({ error: "Internal server Error" });
    }
};