import { Paper } from "src/papers/entity/paper.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('authors')
export class Author {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 150 })
    picture: string;

    @OneToMany(() => Paper, (paper) => paper.author)
    papers: Paper[]
}