import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Profile } from '../../profiles/entities/profile.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()   
    id: number;

    @Column({
        length: 25,
        unique: true
    })
    @Index()
    username: string;

    @Column({
        length: 25,
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @Column()
    ip: string;

    @OneToOne(() => Profile, profile => profile.id)
    @JoinColumn()
    profile: Profile;

    @BeforeInsert()
    async hashPassword() {
        const saltOrRounds = 10;
        const salt = await bcrypt.genSalt(saltOrRounds);
        this.password = await bcrypt.hash(this.password, salt);
    }

    public verifyPassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}