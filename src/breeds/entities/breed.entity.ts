import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cat } from "src/cats/entities/cat.entity";

@Entity()
export class Breed {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    name: string;

    @OneToMany(() => Cat, (cat) => cat.breed )
    cats: Cat[];
}
