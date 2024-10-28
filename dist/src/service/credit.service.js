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
const ctrdit_schema_1 = require("../types/Schema/ctrdit.schema");
const userService_1 = __importDefault(require("./userService"));
class CreditService {
    static checkRequest(newCredit, _idCredit = null) {
        {
            const { value, iduser } = newCredit;
            if (!value || !iduser) {
                throw ("Credit value and idUser is required");
            }
            if (_idCredit) {
                const { _id } = newCredit;
                if (!_id) {
                    throw ("Credit id is required");
                }
                return newCredit;
            }
        }
    }
    static findCredit(credit) {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkRequest(credit);
            const { value, iduser } = credit;
            const creditFromDB = yield dataLayerFile_1.default.checkIfExist({ iduser, value }, ctrdit_schema_1.CreditDB);
            return creditFromDB;
        });
    }
    static createCredit(credit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { value, iduser } = credit;
                console.log(value, iduser);
                this.checkRequest(credit);
                const newCredit = yield dataLayerFile_1.default.createItem(credit, ctrdit_schema_1.CreditDB);
                const userFromDB = yield userService_1.default.getUserById(credit.iduser);
                userFromDB.sumcredit += credit.value;
                userFromDB.historycredits.push(newCredit._id);
                yield userService_1.default.updateUser(userFromDB, userFromDB._id);
                return "Credit created";
            }
            catch (err) {
                throw Error(`${err}`);
            }
        });
    }
    static deleteCredit(credit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.checkRequest(credit);
                const creditFromDB = yield dataLayerFile_1.default.findOneItemById(credit._id, ctrdit_schema_1.CreditDB);
                if (!creditFromDB) {
                    throw new Error("Credit dosn't exists");
                }
                yield dataLayerFile_1.default.deleteItem(creditFromDB, ctrdit_schema_1.CreditDB);
                const userFromDB = yield userService_1.default.getUserById(credit.iduser);
                userFromDB.sumcredit -= credit.value;
                const indexOfCredit = userFromDB.historycredits.indexOf(creditFromDB._id);
                userFromDB.historycredits.splice(indexOfCredit, indexOfCredit + 1);
                yield userService_1.default.updateUser(userFromDB, userFromDB._id);
                return "Credit deleted";
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        });
    }
    static updateCredit(credit, idCredit) {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkRequest(credit);
            try {
                const ObjId = new mongoose_1.default.Types.ObjectId(idCredit);
                const creditFromDB = yield dataLayerFile_1.default.findOneItemById(ObjId, ctrdit_schema_1.CreditDB);
                if (!creditFromDB) {
                    throw new Error("Credit dosn't exists");
                }
                yield dataLayerFile_1.default.updateItem(credit, creditFromDB._id, ctrdit_schema_1.CreditDB);
                const userFromDB = yield userService_1.default.getUserById(credit.iduser);
                userFromDB.sumcredit += credit.value - creditFromDB.value;
                yield userService_1.default.updateUser(userFromDB, userFromDB._id);
                return "Credit updated";
            }
            catch (err) {
                throw Error(`${err}`);
            }
        });
    }
    static getCreditById(idCredit) {
        return __awaiter(this, void 0, void 0, function* () {
            const ObjId = new mongoose_1.default.Types.ObjectId(idCredit);
            try {
                const creditFromDB = yield dataLayerFile_1.default.findOneItemById(ObjId, ctrdit_schema_1.CreditDB);
                if (!creditFromDB) {
                    throw new Error("Credit dosn't exists");
                }
                return creditFromDB;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        });
    }
    static getAllCredits() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const creditsFromDB = yield dataLayerFile_1.default.findAllItems(ctrdit_schema_1.CreditDB);
                return creditsFromDB;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        });
    }
    static getCreditByUser(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const creditsByUser = yield dataLayerFile_1.default.findAllRelevanteItems({ iduser: idUser }, ctrdit_schema_1.CreditDB);
                return creditsByUser ? creditsByUser : [];
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        });
    }
}
exports.default = CreditService;
