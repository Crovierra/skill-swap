import User from "../models/User.js";
import bcrypt from "bcrypt"

export const editUser = async (req, res) => {
    try {
        const {name, email, password} = req.body
        if(!name || !email || !password){
            return res.status(401).json({message: "All field required"})
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await User.findByIdAndUpdate(req.user._id, {$set: {name:name, email: email, password: hashPassword}}).select("-password")
        if(!user){
            return res.status(401).json({message: "User not found, please login first"})
        }

        return res.status(200).json({message: "Edit data successful"})
    } catch (error) {
        return res.status(500).json({message: "Failed to edit user info", error: error.message})
    }
}

export const addFriend = async (req, res) => {
    try {
        const {_id} = req.body
        if(!_id){
            return res.status(400).json({message: "User with that id not found"})
        }
        const updateUser = await User.findByIdAndUpdate(req.user._id, {$push: {friendlist: _id }}, {new: true})
        return res.status(200).json({message: "Success adding new friend"})
    } catch (error) {
        return res.status(500).json({message: "Internal server error", error: error.message})
    }
}

export const removeFriend = async (req, res) => {
    try {
        const {_id} = req.body
        if(!_id){
            return res.status(400).json({message: "User with that id not found"})
        }
        const updateUser = await User.findByIdAndUpdate(req.user._id, {$pull: {friendlist: _id }}, {new: true})
        return res.status(200).json({message: "Success removing user from friend list"})
    } catch (error) {
        return res.status(500).json({message: "Internal server error", error: error.message})
    }
}
export const removeFriend = async (req, res) => {
    try {
        const {_id} = req.body
        if(!_id){
            return res.status(400).json({message: "User with that id not found"})
        }
        const updateUser = await User.findByIdAndUpdate(req.user._id, {$pull: {friendlist: _id }}, {new: true})
        return res.status(200).json({message: "Success removing user from friend list"})
    } catch (error) {
        return res.status(500).json({message: "Internal server error", error: error.message})
    }
}

export const getAllFriends = async (req, res) => {
    try {
        const currentUser = await User.findOne({_id: req.body._id}).select("friendlist")
        if(!currentUser){
            return res.status(404).json({message: "User not found"})
        }
        if(user.friendlist.length === 0){
            return res.status(200).json({message: "Friend list empty"})
        }

        const friends = await User.find({_id: {$in : currentUser.friendlist}}).select("name active needed_skills skills")

        return res.status(200).json({message: "Friend successfully retrieved", count: friends.length, friends: friends})
    } catch (error) {
        return res.status(500).json({message: "Internal server error", error: error.message})
    }
}