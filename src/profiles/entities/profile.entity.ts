import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, Generated, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Gender } from '../types/gender.enum';

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated("uuid")
    uuid: string;

    @OneToOne(() => User, user => user.id)
    user: User;

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
