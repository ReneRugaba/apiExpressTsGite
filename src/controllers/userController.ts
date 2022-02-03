import { Request, Response, Router } from "express";
import { User } from "../entity/user";
import { UserService } from "./../service/userService";




export class UserController{
    public router:Router;
    private userService:UserService

    constructor(){
        this.router = Router()
        this.userService=new UserService()
        this.routesApp()
    }

    public index = async (req:Request,res:Response)=>{
        res.json(await this.userService.index())
    }

    public getOneById = async (req:Request,res:Response)=>{
        return res.json(await this.userService.findOneById(Number(req.params.id)))
    }

    public createUser =async (req:Request,res:Response)=>{
        
        const newUser = req["body"] as User
       
       
        res.send(await this.userService.createUser(newUser))
    }

    public update = async (req:Request,res:Response)=>{
        res.send(await this.userService.updateUser(Number(req.params.id),req.body as User))
    }

    public remove = async (req:Request,res:Response)=>{
        res.send(await this.userService.removeUser(Number(req.params.id)))
    }


    public routesApp =()=>{
        this.router.get('/',this.index)
        this.router.post('/',this.createUser)
        this.router.put('/:id',this.update)
        this.router.delete('/:id',this.remove)
    }
}