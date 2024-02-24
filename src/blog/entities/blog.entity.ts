import { Profile } from "src/users/profiles/entities/profile.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Blog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 25 })
    slug: string;

    @OneToOne(() => Profile, profile => profile.id)
    @JoinColumn()
    author: Profile;
}
