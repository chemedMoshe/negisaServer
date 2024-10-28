"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUser = exports.getAllUsers = exports.getUserById = exports.updateUser = exports.deleteUser = exports.createNewUser = void 0;
const userService_1 = __importDefault(require("../service/userService"));
const createNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userService_1.default.createUser(req.body);
        res.status(201).json({ err: false, result });
    }
    catch (err) {
        res.status(400).json({ err: true, result: { message: `${err}` } });
    }
});
exports.createNewUser = createNewUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userService_1.default.deleteUser(req.body);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(400).json({ err: true, message: `${err}` });
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userService_1.default.updateUser(req.body, req.params.id);
        res.status(200).json({ err: false, result });
    }
    catch (err) {
        res.status(400).json({ err: true, message: `${err}` });
    }
});
exports.updateUser = updateUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userService_1.default.getUserById(req.body);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(400).send(`${err}`);
    }
});
exports.getUserById = getUserById;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userService_1.default.getAllUsers();
        res.status(200).json(result);
    }
    catch (err) {
        res.status(400).send(`${err}`);
    }
});
exports.getAllUsers = getAllUsers;
const searchUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userService_1.default.searchUser(req.body);
        res.status(200).json({ err: false, result });
    }
    catch (err) {
        res.status(400).json({ err: true, message: `${err}` });
    }
});
exports.searchUser = searchUser;
