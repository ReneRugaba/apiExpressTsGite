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
exports.UserService = void 0;
const userRepository_1 = require("./../repository/userRepository");
const typeorm_1 = require("typeorm");
class UserService {
    constructor(logger) {
        this.index = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.find();
        });
        this.findOneById = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.findOne(id);
        });
        this.createUser = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.info("user created in service");
                return yield this.userRepository.save(user);
            }
            catch (error) {
                this.logger.error(error.message);
                if (error.routine == '_bt_check_unique') {
                    return new Error("Email already in use!").message;
                }
                return new Error("Error occure!").message;
            }
        });
        this.removeUser = (userId) => __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.delete(userId);
        });
        this.updateUser = (userId, newUser) => __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.update(userId, newUser);
        });
        this.userRepository = (0, typeorm_1.getCustomRepository)(userRepository_1.UserRepository);
        this.logger = logger;
    }
}
exports.UserService = UserService;
//# sourceMappingURL=userService.js.map