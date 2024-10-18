import mongoose from "mongoose";
import { ICredit } from "./credit.Interface";

export interface IUser extends Document {
    _id?: mongoose.Types.ObjectId
    username: string;
    personalnumber: number;
    sumcredit: number;
    joindate: Date;
    historycredits:ICredit[]
}