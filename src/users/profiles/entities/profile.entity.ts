import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Gender } from "../types/gender.enum";
import { Blog } from "src/blog/entities/blog.entity";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("uuid")
    uuid: string;

    @OneToOne(() => User, user => user.id)
    user: User;

    @OneToOne(() => Blog, blog => blog.id)
    blog: Blog;

    @Column({
        length: 20,
        nullable: true
    })
    flair?: string;

    @Column({
        type: "enum",
        enum: Gender
    })
    gender: Gender;

    @Column({ nullable: true })
    picture: string;

    @Column({ length: 20 })
    firstName: string;

    @Column({
        length: 30,
        nullable: true
    })
    lastName?: string;

    @CreateDateColumn()
    creationDate: Date;

    @UpdateDateColumn()
    modificationDate: Date;
}
