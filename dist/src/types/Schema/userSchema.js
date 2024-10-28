"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDB = exports.userSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: [true, "Firstname is required"],
    },
    personalnumber: {
        type: String,
        required: [true, "Lastname is required"],
        unique: true, //, "Personal number already exists"]
    },
    sumcredit: {
        type: Number,
        default: 0
    },
    historycredits: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Credit"
        }]
}, {
    timestamps: true
});
exports.UserDB = mongoose_1.default.model("UserNegisa", exports.userSchema);
