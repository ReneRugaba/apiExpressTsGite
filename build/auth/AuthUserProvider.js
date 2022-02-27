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
    logger;
    constructor(userService, logger) {
        this.userService = userService;
        this.logger = logger;
    }
    verifyUser = async (user) => {
        let userDb = await this.userService.findOneByUserName(user.userName);
        if (user && userDb && await bcrypt_1.default.compare(user.password, userDb.password)) {
            this.logger.info("User Authentified!");
            return userDb;
        }
        else {
            this.logger.error("User not Authentified!");
            return undefined;
        }
    };
    getToken = (user) => {
        const payload = { username: user.email, id: user.id };
        if (privateKey_1.privateKey) {
            return {
                access_token: jsonwebtoken_1.default.sign(payload, privateKey_1.privateKey, { expiresIn: 30 * 60 })
            };
        }
        else {
            return undefined;
        }
    };
    getUserByToken = (req, res, next) => {
        console.log(req.headers.authorization?.split(" ")[1]);
        next();
    };
}
exports.default = AuthUserProvider;
//# sourceMappingURL=AuthUserProvider.js.map