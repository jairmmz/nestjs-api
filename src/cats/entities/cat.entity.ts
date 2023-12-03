import { User } from '../../users/entities/user.entity';
import { Breed } from '../../breeds/entities/breed.entity';
import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm'

@Entity()
export class Cat {

    // @Column({ primary: true, generated: true })
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    @ManyToOne(() => Breed, (breed) => breed.id, {
        eager: true,
        // onDelete: 'CASCADE'
    })
    breed: Breed;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    user: User;

    @Column()
    userId: number;

    @DeleteDateColumn()
    deletedAt: Date;
}
