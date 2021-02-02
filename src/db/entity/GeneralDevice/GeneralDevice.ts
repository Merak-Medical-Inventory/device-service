import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
@Entity()
export class GeneralDevice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;
}

export default GeneralDevice
