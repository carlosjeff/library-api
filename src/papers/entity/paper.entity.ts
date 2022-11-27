import { Exclude } from "class-transformer";
import { Author } from "src/authors/entity/author.entity";
import { User } from "src/users/entity/user.entity";
import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('papers')
export class Paper {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    title: string;

    @Column({ length: 100 })
    summary: string;


    @Column("text")
    firstParagraph: string;


    @Column("text")
    body: string;


    @Column({ length: 100 })
    category: string;

    @Column()
    @Exclude()
    userId: number;

    @ManyToOne(() => User)
    user?: User;

    @Column()
    @Exclude()
    authorId: number;

    @ManyToOne(() => Author, (author) => author.papers)
    @JoinTable()
    author?: Author



    constructor(partial: Partial<Paper>) {
        Object.assign(this, partial);
    }

}