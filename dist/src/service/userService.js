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
const mongoose_1 = __importDefault(require("mongoose"));
const dataLayerFile_1 = __importDefault(require("../DataLayer/dataLayerFile"));
const userSchema_1 = require("../types/Schema/userSchema");
class UserService {
    static checkResquest(user) {
        const { username, personalnumber } = user;
        if (!username || !personalnumber) {
            throw ("היי.. שמנו לב שלא מלאת את כל הפרטים ההכרחיים");
        }
        return user;
    }
    static findUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkResquest(user);
            const { personalnumber } = user;
            const userFromDB = yield dataLayerFile_1.default.checkIfExist(personalnumber, userSchema_1.UserDB);
            return userFromDB;
        });
    }
    static createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.checkResquest(user);
                if ((yield this.findUser(user))) {
                    throw ("המספר כבר קיים במערכת");
                }
                yield dataLayerFile_1.default.createItem(user, userSchema_1.UserDB);
                return { message: "User created", user };
            }
            catch (err) {
                throw Error(`${err}`);
            }
        });
    }
    static deleteUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkResquest(user);
            try {
                const userFromDB = yield this.findUser(user);
                if (!userFromDB) {
                    throw new Error("סועד לא קיים במערכת");
                }
                yield dataLayerFile_1.default.deleteItem(user, userSchema_1.UserDB);
                return { err: false, message: `סועד ${user.username} נמחק בהצלחה` };
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        });
    }
    static updateUser(user, idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ObjId = new mongoose_1.default.Types.ObjectId(idUser);
                const userFromDB = yield dataLayerFile_1.default.findOneItemById(ObjId, userSchema_1.UserDB);
                if (!userFromDB) {
                    throw new Error("User dosn't exists");
                }
                const phoneExist = yield dataLayerFile_1.default.checkIfExist(user.personalnumber, userSchema_1.UserDB);
                if (phoneExist && phoneExist._id.toString() != userFromDB._id.toString()) {
                    throw ("מספר הטלפון כבר קיים במערכת");
                }
                yield dataLayerFile_1.default.updateItem(user, userFromDB._id, userSchema_1.UserDB);
                return "User updated";
            }
            catch (err) {
                throw Error(`${err}`);
            }
        });
    }
    static getUserById(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const ObjId = new mongoose_1.default.Types.ObjectId(idUser);
            try {
                const userFromDB = yield dataLayerFile_1.default.findOneItemById(ObjId, userSchema_1.UserDB);
                if (!userFromDB) {
                    throw new Error("User dosn't exists");
                }
                return userFromDB;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        });
    }
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usersFromDB = yield dataLayerFile_1.default.findAllItems(userSchema_1.UserDB);
                return usersFromDB;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        });
    }
    static searchUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userFromDB = yield dataLayerFile_1.default.searchItems(userSchema_1.UserDB, "username", user.username);
                return userFromDB || [];
            }
            catch (err) {
                throw (`${err}`);
            }
        });
    }
}
exports.default = UserService;
