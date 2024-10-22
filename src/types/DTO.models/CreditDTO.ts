import mongoose from "mongoose"

export default interface ICreditDTO {
    _id?: mongoose.Types.ObjectId|string
    iduser: mongoose.Types.ObjectId
    value: number
}