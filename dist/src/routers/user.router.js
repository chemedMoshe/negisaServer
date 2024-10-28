"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const user_controller_1 = require("../controllers/user,controller");
exports.router = require('express').Router();
exports.router.get('/', user_controller_1.getAllUsers);
exports.router.post('/search', user_controller_1.searchUser);
exports.router.get('/:id', user_controller_1.getUserById);
exports.router.post('/', user_controller_1.createNewUser);
exports.router.put('/:id', user_controller_1.updateUser);
exports.router.delete('/', user_controller_1.deleteUser);
exports.default = exports.router;
