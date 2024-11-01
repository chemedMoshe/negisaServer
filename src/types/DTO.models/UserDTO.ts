import mongoose from "mongoose";
import { ICredit } from "../interfaces/credit.Interface";
import ICreditDTO from "./CreditDTO";

export default interface IUserDTO {
    _id?: mongoose.Types.ObjectId;
    username: string;
    personalnumber: string;
    sumcredit?: number;
    historycredits?: ICreditDTO[];
}