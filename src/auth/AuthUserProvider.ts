import LoginDto from "src/DTO/login.dto";
import User from "src/entity/user";
import { UserService } from "src/service/userService";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import { privateKey } from "./privateKey";
import { Logger } from "tslog";
import { NextFunction, Request, Response } from "express";


export default class AuthUserProvider {

    constructor(private readonly userService:UserService,private readonly logger:Logger){}

    verifyUser=async (user:LoginDto)=>{
        let userDb:User|undefined= await this.userService.findOneByUserName(user.userName)
        if(user && userDb && await bcrypt.compare(user.password,userDb.password)){
            this.logger.info("User Authentified!")
           return userDb
        }else{
            this.logger.error("User not Authentified!")
            return undefined
        }
    }

    getToken=(user:User)=>{
        const payload ={username:user.email,id:user.id}

        if(privateKey){
            return {
                access_token:jwt.sign(payload,privateKey,{ expiresIn: 30 * 60 })
            }
        }else{
            return undefined
        }
    }

    getUserByToken=(req:Request,res:Response,next:NextFunction)=>{
        console.log(req.headers.authorization?.split(" ")[1])
        next()
    }



}