import express from "express"
import { authenticateUser } from "../middleware/authMiddleware"
import { addFriend, editUser, getAllFriends, removeFriend } from "../controllers/userController"

const router = express.Router()

router.put("/edit-profile", authenticateUser, editUser)

router.post("/add-friend", authenticateUser, addFriend)

router.delete("/remove-friend", authenticateUser, removeFriend)

router.get("/friends", authenticateUser, getAllFriends)

export default router