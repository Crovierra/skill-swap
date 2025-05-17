import express from "express"
import "dotenv/config"
import cors from "cors"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import skillsRoutes from "./routes/skillsRoutes.js"

const app = express()
const PORT = process.env.PORT || 5000


app.use(express.json())
app.use(cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
}))

connectDB();


app.use("/api/auth", authRoutes)
app.use(`/api/skills/`, skillsRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})