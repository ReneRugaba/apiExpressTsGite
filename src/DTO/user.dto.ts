import { IsEmail, IsInt, IsString,Length, Min } from "class-validator"


export class UserDto {
    @IsInt()
    @Min(1)
    id:number

    @IsString()
    @Length(3,50)
    firstName:string

    @IsString()
    @Length(3,50)
    lastName:string

    @IsEmail()
    email:string
}