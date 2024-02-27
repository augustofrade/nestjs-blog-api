import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Blog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 25 })
    slug: string;

    @OneToOne(() => User, user => user.id)
    @JoinColumn()
    author: User;
}
