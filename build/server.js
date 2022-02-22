"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const userController_1 = require("./controllers/userController");
const cors_1 = __importDefault(require("cors"));
const env = __importStar(require("dotenv"));
const tslog_1 = require("tslog");
const fs_1 = require("fs");
function logToTransport(logObject) {
    (0, fs_1.appendFileSync)("logs.log", JSON.stringify(logObject) + "\n");
}
const logger = new tslog_1.Logger();
logger.attachTransport({
    silly: logToTransport,
    debug: logToTransport,
    trace: logToTransport,
    info: logToTransport,
    warn: logToTransport,
    error: logToTransport,
    fatal: logToTransport,
}, "debug");
env.config();
class Server {
    constructor() {
        this.configPortApp = () => {
            this.app.set('port', 8080);
        };
        this.routesApp = () => __awaiter(this, void 0, void 0, function* () {
            yield (0, typeorm_1.createConnection)({
                type: "postgres",
                host: process.env.LOCALHOST_APP,
                database: process.env.DATA_BASE,
                username: process.env.USER_DB,
                password: process.env.PASS_WORD,
                port: Number(process.env.PORT_DB),
                entities: ['./build/entity/*.js'],
                synchronize: true
            });
            this.userController = new userController_1.UserController(logger);
            this.app.get('/', (req, resp) => {
                logger.warn("I am a warn log with a json object:", { foo: "bar" });
                resp.send("hello");
            });
            this.app.use('/api/users/', this.userController.router);
        });
        this.startApp = () => {
            this.app.listen(this.app.get("port"), () => console.log("app listen"));
        };
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cors_1.default)({
            allowedHeaders: [
                'Origin',
                'X-Requested-With',
                'Content-Type',
                'Accept',
                'X-Access-Token',
            ],
            origin: "*"
        }));
        this.configPortApp();
        this.routesApp();
    }
}
const server = new Server();
server.startApp();
//# sourceMappingURL=server.js.map