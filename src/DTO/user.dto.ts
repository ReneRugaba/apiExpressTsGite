import { IsEmail, IsInt, IsString,Length, Matches, Min } from "class-validator"


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

    @Matches('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')
    @Length(8)
    password: string
}