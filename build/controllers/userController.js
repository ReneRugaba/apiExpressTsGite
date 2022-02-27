"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const express_1 = require("express");
const userService_1 = require("./../service/userService");
class UserController {
    router;
    userService;
    logger;
    constructor(logger) {
        this.router = (0, express_1.Router)();
        this.userService = new userService_1.UserService(logger);
        this.routesApp();
        this.logger = logger;
    }
    index = async (req, res) => {
        this.logger.info("route #index() start!");
        res.json(await this.userService.index());
    };
    getOneById = async (req, res) => {
        return res.json(await this.userService.findOneById(Number(req.params.id)));
    };
    createUser = async (req, res) => {
        const newUser = req["body"];
        this.logger.info("route #createUser(): User created with success!");
        res.send(await this.userService.createUser(newUser));
    };
    update = async (req, res) => {
        res.send(await this.userService.updateUser(Number(req.params.id), req.body));
    };
    remove = async (req, res) => {
        res.send(await this.userService.removeUser(Number(req.params.id)));
    };
    routesApp = () => {
        this.router.get('/', this.index);
        this.router.get('/:id', this.getOneById);
        this.router.post('/', this.createUser);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.remove);
    };
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map