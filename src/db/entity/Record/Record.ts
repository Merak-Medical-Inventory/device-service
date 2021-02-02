import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from 'typeorm';
import Device from "@entity/Device/Device";
import Inventory from "@entity/Inventory/Inventory";
@Entity()
export class Record {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    initialDate: Date;

    @Column({nullable: true})
    endDate: Date;

    @ManyToOne(type => Device)
    device!: Device;

    @ManyToOne(type => Inventory)
    location!: Inventory;
}

export default Record
