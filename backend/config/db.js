import mongoose from "mongoose"

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Success connect to database")
    } catch(error) {
        console.log("Failed to connect to database :", error.message)
        process.exit(1)      
    }
}

export default connectDB