import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 100, unique: true })
    email: string;

    @Column({ length: 100, select: false })
    @Exclude({ toPlainOnly: true })
    password: string;

    @Column({ length: 20 })
    role: string;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}