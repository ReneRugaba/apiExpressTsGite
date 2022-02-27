"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const express_1 = require("express");
const AuthUserProvider_1 = __importDefault(require("./../auth/AuthUserProvider"));
const userService_1 = require("./../service/userService");
class UserController {
    router;
    userService;
    logger;
    auth;
    constructor(logger) {
        this.router = (0, express_1.Router)();
        this.userService = new userService_1.UserService(logger);
        this.auth = new AuthUserProvider_1.default(this.userService, this.logger);
        this.routesApp();
        this.logger = logger;
    }
    login = async (req, res) => {
        this.logger.info("login start!");
        let user = req.body;
        let userAuth = await this.auth.verifyUser(user);
        if (userAuth) {
            this.logger.info("user wil be auth in controller!");
            const token = this.auth.getToken(userAuth);
            res.status(200).json(token);
        }
        else {
            res.status(500).json(new Error("Unknow user!").message);
        }
    };
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
        this.router.post('/login', this.login);
        this.router.get('/', this.auth.getUserByToken, this.index);
        this.router.get('/:id', this.getOneById);
        this.router.post('/', this.createUser);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.remove);
    };
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map