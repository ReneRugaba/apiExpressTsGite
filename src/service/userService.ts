import { User } from "../entity/user";
import { UserRepository } from "./../repository/userRepository";
import { DeleteResult, getCustomRepository, UpdateResult } from "typeorm";


export class UserService {
    private userRepository:UserRepository

    constructor(){
        this.userRepository = getCustomRepository(UserRepository)
    }

    public index:()=>Promise<User[]|undefined> = async () =>{

        return this.userRepository.find()
    }

    public findOneById:(id:number)=>Promise<User|undefined> =async (id:number)=>{
        return await this.userRepository.findOne(id)
    }

    public createUser:(user:User)=>Promise<User> = async (user:User)=>{
        return await this.userRepository.save(user)
    }

    public removeUser:(userId:number)=>Promise<DeleteResult>= async(userId:number)=>{
        return await this.userRepository.delete(userId)
    }

    public updateUser:(userId:number,newUser:User)=>Promise<UpdateResult>=async (userId:number,newUser:User)=>{
        return await this.userRepository.update(userId,newUser)
    }
}