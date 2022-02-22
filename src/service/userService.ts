import { User } from "../entity/user";
import { UserRepository } from "./../repository/userRepository";
import { DeleteResult, getCustomRepository, UpdateResult } from "typeorm";


export class UserService {
    private userRepository:UserRepository

    constructor(){
        this.userRepository = getCustomRepository(UserRepository)
    }

    public index:()=>Promise<User[]|undefined> = async () =>{

        return await this.userRepository.find()
    }

    public findOneById:(id:number)=>Promise<User|undefined> =async (id:number)=>{
        return await this.userRepository.findOne(id)
    }

    public createUser:(user:User)=>Promise<User|undefined|string> = async (user:User):Promise<User|undefined|string>=>{
        try {
            return await this.userRepository.save(user)
            
        } catch (error) {
            
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