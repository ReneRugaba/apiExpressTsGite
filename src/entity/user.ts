import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("userapp")
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