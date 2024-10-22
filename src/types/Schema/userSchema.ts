import mongoose from "mongoose";
import { IUser } from "../interfaces/user.interface";

export const userSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        required: [true, "Firstname is required"],
        
    },

    personalnumber: {
        type: String,
        required: [true, "Lastname is required"],
        unique: true,//, "Personal number already exists"]
        
    },
    
    sumcredit: {
        type: Number,
        default: 0
    },
    historycredits: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Credit"
    }]
},
    {
        timestamps: true
    }
)

export const UserDB = mongoose.model<IUser>("UserNegisa", userSchema)
