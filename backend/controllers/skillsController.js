import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const addSkill = async (req, res) => {
    try {
        const {category, skill_name} = req.body
        if(!category){
            return res.status(400).json({message: "Category field cannot be empty"})
        }
        if(!skill_name){
            return res.status(400).json({message: "Skill name cannot be empty"})
        }

        const user = await User.findByIdAndUpdate(req.user._id, {$push: {skills: { category: category, skill_name: skill_name}}}, {new: true}).select("-password")

        return res.status(200).json({message: "Success adding new skill"})
    } catch (error) {
        return res.status(500).json({message: "Failed to add new skill", error: error.message})
    }
}

export const removeSkill = async (req, res) => {
    try {
        const {id} = req.body
        const objectId = id.toObject()
        if(!id){
            return res.status(404).json({message: "Invalid skill id"})
        }
        const updatedUser = await User.findByIdAndUpdate(req.user._id, {$pull: {skills:{_id: objectId}}}, {new: true})

        const {password:pwd, ...safeUser} = user.toObject();

        return res.status(200).json({message: "Success removing skill", safeUser})
    } catch (error) {
        return res.status(500).json({message: "Failed to remove skill"})
    }
}

export const editSkill = async (req, res) => {
    try {
        const {updatedSkill} = req.body
        const objectId = updatedSkill.id.toObject()

        if(!updatedSkill.id){
            return res.status(404).json({message: "Invalid skill id"})
        }

        const updatedUser = await User.findByIdAndUpdate(req.user._id, {$set: {skills: {_id: objectId, category: updatedSkill.category, skill_name:updatedSkill.skill_name}}}, {new:true})

        return res.status(200).json({message: "Success updating skills"})
    } catch (error) {
        
    }
}