import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import Device from "@entity/Device/Device";
@Entity()
export class Maintenance {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    date: Date;

    @ManyToOne(type => Device, { onDelete: 'CASCADE' })
    device: Device;
}

export default Maintenance
