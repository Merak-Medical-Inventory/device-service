import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
@Entity()
export class Maker {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    phone_number: string;

    @Column()
    address: string;
}

export default Maker
