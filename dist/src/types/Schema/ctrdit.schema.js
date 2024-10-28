"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditDB = exports.creditSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.creditSchema = new mongoose_1.default.Schema({
    iduser: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    value: {
        type: Number,
        required: [true, "Value is required"]
    },
}, {
    timestamps: true
});
exports.CreditDB = mongoose_1.default.model("CreditNegisa", exports.creditSchema);
