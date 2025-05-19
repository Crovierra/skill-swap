import {
    registerUser,
    loginUser,
    getUserInfo,
    deleteUser
} from "../controllers/authController.js"
import express from "express"
import {authenticateUser} from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/register", registerUser)

router.post("/login", loginUser)

router.get("/getUser", authenticateUser, getUserInfo)

router.delete("/delete-user", authenticateUser, deleteUser)


export default router