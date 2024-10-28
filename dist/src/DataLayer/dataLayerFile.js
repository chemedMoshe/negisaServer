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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
class DataLayer {
}
_a = DataLayer;
DataLayer.checkIfExist = (item, category) => __awaiter(void 0, void 0, void 0, function* () {
    return yield category.findOne({
        personalnumber: item
    });
});
DataLayer.findOneItemById = (id, category) => __awaiter(void 0, void 0, void 0, function* () {
    return yield category.findById(id);
});
DataLayer.findAllRelevanteItems = (properties, category) => __awaiter(void 0, void 0, void 0, function* () {
    return yield category.find(properties);
});
DataLayer.createItem = (item, category) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newItem = new category(item);
        yield newItem.save();
        return newItem;
    }
    catch (error) {
        throw new Error(`${error}`);
    }
});
DataLayer.deleteItem = (item, category) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield category.deleteOne(item);
    }
    catch (error) {
        throw new Error(`${error}`);
    }
});
DataLayer.updateItem = (itemUpdated, id, category) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield category.updateOne({ _id: id }, itemUpdated);
    }
    catch (error) {
        throw new Error(`${error}`);
    }
});
DataLayer.findAllItems = (category) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield category.find({});
    }
    catch (error) {
        throw new Error(`${error}`);
    }
});
DataLayer.searchItems = (category, key, value) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = { [key]: { $regex: `^${value}`, $options: "i" } };
        return yield category.find(filter);
    }
    catch (error) {
        throw new Error(`${error}`);
    }
});
exports.default = DataLayer;
