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
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const helmet_1 = __importDefault(require("helmet"));
const swaggerDocument = yamljs_1.default.load(__dirname + '/swagger.yaml');
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
    app;
    userController;
    constructor() {
        this.app = (0, express_1.default)();
        this.app.use("/docs-api", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, helmet_1.default)());
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
    configPortApp = () => {
        this.app.set('port', 8000);
    };
    routesApp = async () => {
        await (0, typeorm_1.createConnection)();
        this.userController = new userController_1.UserController(logger);
        this.app.get('/', (req, resp) => {
            logger.warn("I am a warn log with a json object:", { foo: "bar" });
            resp.send("hello");
        });
        this.app.use('/api/v1/users/', this.userController.router);
    };
    startApp = () => {
        this.app.listen(this.app.get("port"), () => logger.info("app listen"));
    };
}
const server = new Server();
server.startApp();
//# sourceMappingURL=server.js.map