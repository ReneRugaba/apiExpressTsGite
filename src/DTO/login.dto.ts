import { IsEmail, IsString, Length } from "class-validator"


export default class LoginDto {

    @IsEmail()
    userName:string

    @IsString()
    @Length(3)
    password:string
}