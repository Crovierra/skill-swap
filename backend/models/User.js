import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match:[/^\S+@\S+\.\S+$/, "Invalid email format"]
    },
    skills: [{
        category :{
            type: String,
        },
        skill_name: {
            type: String,
        }
    }
    ],
    needed_skills: [{
        category :{
            type: String,
        },
        skill_name: {
            type: String,
        }
    }]
    ,
    friendlist: {
        type: String,
    },
    active: {
        type: Boolean,
        required: true,
    },
}, {timestamps: true})

const User = mongoose.models.User || mongoose.model("User", UserSchema)

export default User
