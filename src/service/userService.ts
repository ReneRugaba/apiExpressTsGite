import User  from "../entity/user";
import { UserRepository } from "./../repository/userRepository";
import { DeleteResult, getCustomRepository, UpdateResult } from "typeorm";
import { Logger } from "tslog";
import bcrypt from "bcrypt"

export class UserService {
    private userRepository:UserRepository
    private logger:Logger

    constructor(logger:Logger){
        this.userRepository = getCustomRepository(UserRepository)
        this.logger=logger
    }

    public index:()=>Promise<User[]|undefined> = async () =>{

        return await this.userRepository.find()
    }

    public findOneByUserName=async(userName:string)=>{
        return await this.userRepository.findOne({email:userName})
    }

    public findOneById:(id:number)=>Promise<User|undefined> =async (id:number)=>{
        return await this.userRepository.findOne(id)
    }

    public createUser:(user:User)=>Promise<User|undefined|string> = async (user:User):Promise<User|undefined|string>=>{
        try {
            this.logger.info("user created in service")
            user={...user,password:await bcrypt.hash(user.password,10)}
            return await this.userRepository.save(user)
        } catch (error) {
            this.logger.error(error.message)
            if(error.routine=='_bt_check_unique'){
                return new Error("Email already in use!").message     
                
            }
            return new Error("Error occure!").message
           
        }
    }

    public removeUser:(userId:number)=>Promise<DeleteResult>= async(userId:number)=>{
        return await this.userRepository.delete(userId)
    }

    public updateUser:(userId:number,newUser:User)=>Promise<UpdateResult>=async (userId:number,newUser:User)=>{
        return await this.userRepository.update(userId,newUser)
    }
}