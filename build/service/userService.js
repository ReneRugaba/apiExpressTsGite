"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const userRepository_1 = require("./../repository/userRepository");
const typeorm_1 = require("typeorm");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService {
    userRepository;
    logger;
    constructor(logger) {
        this.userRepository = (0, typeorm_1.getCustomRepository)(userRepository_1.UserRepository);
        this.logger = logger;
    }
    index = async () => {
        return await this.userRepository.find();
    };
    findOneByUserName = async (userName) => {
        return await this.userRepository.findOne({ email: userName });
    };
    findOneById = async (id) => {
        return await this.userRepository.findOne(id);
    };
    createUser = async (user) => {
        try {
            this.logger.info("user created in service");
            user = { ...user, password: await bcrypt_1.default.hash(user.password, 10) };
            return await this.userRepository.save(user);
        }
        catch (error) {
            this.logger.error(error.message);
            if (error.routine == '_bt_check_unique') {
                return new Error("Email already in use!").message;
            }
            return new Error("Error occure!").message;
        }
    };
    removeUser = async (userId) => {
        return await this.userRepository.delete(userId);
    };
    updateUser = async (userId, newUser) => {
        return await this.userRepository.update(userId, newUser);
    };
}
exports.UserService = UserService;
//# sourceMappingURL=userService.js.map