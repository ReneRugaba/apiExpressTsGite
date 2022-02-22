import express, { Request, Response } from 'express'
import { createConnection } from 'typeorm'
import { UserController } from './controllers/userController'
import cors from 'cors';
import * as env from 'dotenv';
import { Logger,ILogObject } from "tslog";
import { appendFileSync } from "fs";

function logToTransport(logObject: ILogObject) {
  appendFileSync("logs.log", JSON.stringify(logObject) + "\n");
}

const logger: Logger = new Logger();
logger.attachTransport(
    {
      silly: logToTransport,
      debug: logToTransport,
      trace: logToTransport,
      info: logToTransport,
      warn: logToTransport,
      error: logToTransport,
      fatal: logToTransport,
    },
    "debug"
  );

env.config()


class Server {
    private app:express.Application
    private userController: UserController

    constructor(){
        this.app = express()
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:true}))
        this.app.use(cors({
            allowedHeaders: [
                'Origin',
                'X-Requested-With',
                'Content-Type',
                'Accept',
                'X-Access-Token',
              ],
              origin:"*"
        }))
        this.configPortApp()
        this.routesApp()
    }

    public configPortApp:()=>void =()=>{
        this.app.set('port',8080)
    }

   

    public routesApp = async () =>{
        await createConnection({
            type: "postgres",
            host: process.env.LOCALHOST_APP,
            database: process.env.DATA_BASE,
            username: process.env.USER_DB,
            password: process.env.PASS_WORD,
            port: Number(process.env.PORT_DB),
            entities: ['./build/entity/*.js'],
            synchronize: true
        })
        this.userController=new UserController(logger)
        
        this.app.get('/',(req: Request,resp:Response)=>{
            logger.warn("I am a warn log with a json object:", { foo: "bar" });
            resp.send("hello")
        })

        this.app.use('/api/users/',this.userController.router)
    }


    public startApp =()=>{
        this.app.listen(this.app.get("port"),()=>console.log("app listen"))
    }
}

const server = new Server()
server.startApp()

