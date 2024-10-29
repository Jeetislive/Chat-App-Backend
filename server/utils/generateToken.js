import jwt from "jsonwebtoken"

export const generateToken = (userId,res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" })
    //console.log(token);
    
    return token;
    //res.send(token);
}