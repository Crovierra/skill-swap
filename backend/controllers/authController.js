import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/User.js"


//Generate JWT Token
const generateToken = (email) => {
    return jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: "1h"})
}

//Register User
export const registerUser = async (req, res) =>{
    try {
        const {name, password, email, skills, friendlist, active} = req.body;
    
        //Check for missing fields
        if(!name || !password || !email || !active){
            return res.status(400).json({message : "All fields are required"})
        }
    
        //Check if email is available
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message: "This email is already used"})
        }
    
        //Hash the password before saving
        const hashPassword = await bcrypt.hash(password, 10)
    
        //Save the user in database
        const newUser = new User({name, password:hashPassword, email, skills, friendlist, active})
        await newUser.save()
    
        return res.status(200).json({message: "Register Successful"})    
    } catch (error) {
        return res.status(500).json({message: "Failed to register", error: error.message})
    }
}

//Login User
export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        
        //Check for missing field
        if(!email){
            return res.status(400).json({message: "Email cannot be empty"})
        }
    
        if(!password){
            return res.status(400).json({message: "Password required"})
        }
    
        //Check if the user exist
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: "User with this email doesn't exist"})
        }
    
        //Check the password
        const compare = await bcrypt.compare(password, user.password)
        if(!compare){
            return res.status(409).json({message: "Wrong password"})
        }
    
        const token = generateToken(email);
        const {password: pwd, ...safeUser} = user.toObject()
    
        return res.status(200).json({message: "Login Successful",safeUser, token})
    } catch (error) {
        return res.status(500).json({message: "Failed to login", error: error.message})
    }
}

//Get User Info
export const getUserInfo = async (req, res) => {
    try {
        const user = await User.findOne({email: req.user.email}).select("-password")
        const {password: pwd, ...safeUser} = user.toObject()
        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        res.status(200).json(safeUser)
    } catch (error) {
        res.status(500).json({message: "Error fetching user info", error: error.message})
    }
}