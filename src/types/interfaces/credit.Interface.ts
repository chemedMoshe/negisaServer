import mongoose, { mongo } from "mongoose"

export interface ICredit extends Document {
    _id?: mongoose.Types.ObjectId 
    iduser:mongoose.Types.ObjectId,
    value: number
    
}