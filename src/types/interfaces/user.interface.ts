import mongoose from "mongoose";
import { ICredit } from "./credit.Interface";

export interface IUser extends Document {
    _id?: mongoose.Types.ObjectId|unknown
    username: string;
    personalnumber: string;
    sumcredit: number;
    joindate: Date;
    historycredits:mongoose.Types.ObjectId[]
}