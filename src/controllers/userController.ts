import { Request, Response, Router } from "express";
import AuthUserProvider from "./../auth/AuthUserProvider";
import LoginDto from "src/DTO/login.dto";
import { UserDto } from "src/DTO/user.dto";
import { Logger } from "tslog";
import  User  from "../entity/user";
import { UserService } from "./../service/userService";




export class UserController{
    public router:Router;
    private userService:UserService
    private logger:Logger
    private auth: AuthUserProvider

    constructor(logger:Logger){
        this.router = Router()
        this.userService=new UserService(logger)
        this.auth = new AuthUserProvider(this.userService,this.logger)
        this.routesApp()
        this.logger= logger
    }

    public login= async (req:Request,res:Response)=>{
        this.logger.info("login start!")
        let user= req.body as LoginDto
        let userAuth= await this.auth.verifyUser(user)
        if(userAuth){
            this.logger.info("user wil be auth in controller!")
            const token = this.auth.getToken(userAuth)
            res.status(200).json(token)
        }else{
            res.status(500).json(new Error("Unknow user!").message)
        }
    }

    
    public index = async (req:Request,res:Response)=>{
        this.logger.info("route #index() start!")
        res.json(await this.userService.index())
    }

    public getOneById = async (req:Request,res:Response)=>{
        return res.json(await this.userService.findOneById(Number(req.params.id)))
    }

    public createUser =async (req:Request,res:Response)=>{
        
        const newUser = req["body"] as UserDto
       
        this.logger.info("route #createUser(): User created with success!")
        res.send(await this.userService.createUser(newUser))
    }

    public update = async (req:Request,res:Response)=>{
        res.send(await this.userService.updateUser(Number(req.params.id),req.body as User))
    }

    public remove = async (req:Request,res:Response)=>{
        res.send(await this.userService.removeUser(Number(req.params.id)))
    }


    public routesApp =()=>{
        this.router.post('/login',this.login)
        this.router.get('/',this.auth.getUserByToken,this.index)
        this.router.get('/:id',this.getOneById)
        this.router.post('/',this.createUser)
        this.router.put('/:id',this.update)
        this.router.delete('/:id',this.remove)
    }
}