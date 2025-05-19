import express from "express"
import { addSkill, removeSkill, editSkill, getSkillInfo, wantedSkill } from "../controllers/skillsController.js"
import { getUserInfo } from "../controllers/authController.js"
import { authenticateUser } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/add-skill", authenticateUser, addSkill)

router.delete("/remove-skill", authenticateUser, removeSkill)

router.patch("/edit-skill", authenticateUser, editSkill)

router.get("/get-skill", authenticateUser, getSkillInfo)

router.post("/add-needed-skill", authenticateUser, wantedSkill)

export default router