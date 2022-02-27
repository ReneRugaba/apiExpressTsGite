import LoginDto from "src/DTO/login.dto";
import User from "src/entity/user";
import { UserService } from "src/service/userService";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import { privateKey } from "./privateKey";


export default class AuthUserProvider {

    constructor(private readonly userService:UserService){}

    verifyUser=async (user:LoginDto)=>{
        let userDb:User|undefined= await this.userService.findOneByUserName(user.userName)

        if(user && userDb && await bcrypt.compare(user.password,userDb.password)){
           return userDb
        }else{
            return null
        }
    }

    getToken=(user:User)=>{
        const payload ={username:user.email,id:user.id}

        if(privateKey){
            return {
                access_token:jwt.sign(payload,privateKey)
            }
        }else{
            return null
        }
    }



}