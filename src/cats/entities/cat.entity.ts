import { Breed } from 'src/breeds/entities/breed.entity';
import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, ManyToOne } from 'typeorm'

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

    @DeleteDateColumn()
    deletedAt: Date;
}
