import express from "express"
import { addSkill, removeSkill, editSkill } from "../controllers/skillsController.js"
import { getUserInfo } from "../controllers/authController.js"
import { authenticateUser } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/add-skill", authenticateUser, addSkill)

router.delete("/remove-skill", authenticateUser, getUserInfo, removeSkill)

router.patch("/edit-skill", authenticateUser, getUserInfo, editSkill)

export default router