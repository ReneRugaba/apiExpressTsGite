import express, { Request, Response } from 'express'
import { createConnection } from 'typeorm'
import { UserController } from './controllers/userController'
import cors from 'cors';
import * as env from 'dotenv';
import { Logger,ILogObject } from "tslog";
import { appendFileSync } from "fs";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import YAML from "yamljs"
import helmet from 'helmet';

const swaggerDocument= YAML.load(__dirname+'/swagger.yaml');






function logToTransport(logObject: ILogObject) {
  appendFileSync("logs.log", JSON.stringify(logObject) + "\n");
}

const options ={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Library API",
            version:"1.0.0",
            description:"Gite payment management"
        },
        servers:[
            {
                url:"http://127.0.0.1:8080/api"
            }
        ],
    },
    apis:["./controllers/*.js"]
}

const specs = swaggerJsdoc(options)




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
        this.app.use("/docs-api",swaggerUi.serve,swaggerUi.setup(swaggerDocument))
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:true}))
        this.app.use(helmet())
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
        this.app.set('port',8000)
    }

   

    public routesApp = async () =>{
        await createConnection()
        this.userController=new UserController(logger)
        
        this.app.get('/',(req: Request,resp:Response)=>{
            logger.warn("I am a warn log with a json object:", { foo: "bar" });
            resp.send("hello")
        })

        this.app.use('/api/v1/users/',this.userController.router)
    }


    public startApp =()=>{
        this.app.listen(this.app.get("port"),()=>logger.info("app listen"))
    }
}

const server = new Server()
server.startApp()

