import mongoose from "mongoose";
import { ICredit } from "../interfaces/credit.Interface";

export const creditSchema = new mongoose.Schema<ICredit>({
    iduser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    value: {
        type: Number,
        required: [true, "Value is required"]
    },
    
},
    {
        timestamps: true
    }
)

export const CreditDB = mongoose.model<ICredit>("CreditNegisa", creditSchema)