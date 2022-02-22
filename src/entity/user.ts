import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("userapp")
@Unique(["email"])
export class User {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    firstName:string

    @Column()
    lastName:string

    @Column()
    email:string
}