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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const express_1 = require("express");
const userService_1 = require("./../service/userService");
class UserController {
    constructor(logger) {
        this.index = (req, res) => __awaiter(this, void 0, void 0, function* () {
            this.logger.info("route #index() start!");
            res.json(yield this.userService.index());
        });
        this.getOneById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return res.json(yield this.userService.findOneById(Number(req.params.id)));
        });
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const newUser = req["body"];
            this.logger.info("route #createUser(): User created with success!");
            res.send(yield this.userService.createUser(newUser));
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.send(yield this.userService.updateUser(Number(req.params.id), req.body));
        });
        this.remove = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.send(yield this.userService.removeUser(Number(req.params.id)));
        });
        this.routesApp = () => {
            this.router.get('/', this.index);
            this.router.get('/:id', this.getOneById);
            this.router.post('/', this.createUser);
            this.router.put('/:id', this.update);
            this.router.delete('/:id', this.remove);
        };
        this.router = (0, express_1.Router)();
        this.userService = new userService_1.UserService(logger);
        this.routesApp();
        this.logger = logger;
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map