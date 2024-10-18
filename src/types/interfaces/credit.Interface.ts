import mongoose, { mongo } from "mongoose"

export interface ICredit extends Document {
    iduser:mongoose.Types.ObjectId,
    value: number
    
}