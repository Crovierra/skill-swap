import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]
        if(!token){
            return res.status(401).json({message: "Not authorized, no token"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        req.user = await User.findOne({email: decoded.email}).select("-password")
        
        if(!decoded){
            return res.status(401).json({message: "Not authorized, invalid token"})
        }
        next();
    } catch (error) {
        console.log("Error authenticating user :", error.message)
    }
}