import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("userapp")
@Unique(["email"])
export default class User {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    firstName:string

    @Column()
    lastName:string

    @Column()
    email:string

    @Column()
    password:string
}