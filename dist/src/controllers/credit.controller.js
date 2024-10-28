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
exports.getCreditesByUser = exports.getAllCredits = exports.getCreditById = exports.updateCredit = exports.deleteCredit = exports.createNewCredit = void 0;
const credit_service_1 = __importDefault(require("../service/credit.service"));
const createNewCredit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield credit_service_1.default.createCredit(req.body);
        res.status(201).send(result);
    }
    catch (err) {
        res.status(400).send(`${err}`);
    }
});
exports.createNewCredit = createNewCredit;
const deleteCredit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield credit_service_1.default.deleteCredit(req.body);
        res.status(200).send(result);
    }
    catch (err) {
        res.status(400).send(`${err}`);
    }
});
exports.deleteCredit = deleteCredit;
const updateCredit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield credit_service_1.default.updateCredit(req.body, req.params.id);
        res.status(200).send(result);
    }
    catch (err) {
        res.status(400).send(`${err}`);
    }
});
exports.updateCredit = updateCredit;
const getCreditById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield credit_service_1.default.getCreditById(req.params.id);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(400).send(`${err}`);
    }
});
exports.getCreditById = getCreditById;
const getAllCredits = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield credit_service_1.default.getAllCredits();
        res.status(200).json(result);
    }
    catch (err) {
        res.status(400).send(`${err}`);
    }
});
exports.getAllCredits = getAllCredits;
const getCreditesByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield credit_service_1.default.getCreditByUser(req.params.id);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(400).send(`${err}`);
    }
});
exports.getCreditesByUser = getCreditesByUser;
