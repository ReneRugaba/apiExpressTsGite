"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const privateKey_1 = require("./privateKey");
class AuthUserProvider {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    verifyUser = async (user) => {
        let userDb = await this.userService.findOneByUserName(user.userName);
        if (user && userDb && await bcrypt_1.default.compare(user.password, userDb.password)) {
            return userDb;
        }
        else {
            return null;
        }
    };
    getToken = (user) => {
        const payload = { username: user.email, id: user.id };
        if (privateKey_1.privateKey) {
            return {
                access_token: jsonwebtoken_1.default.sign(payload, privateKey_1.privateKey)
            };
        }
        else {
            return null;
        }
    };
}
exports.default = AuthUserProvider;
//# sourceMappingURL=AuthUserProvider.js.map