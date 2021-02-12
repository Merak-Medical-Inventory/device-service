import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, OneToMany} from "typeorm";
import Brand from "@entity/Brand/Brand";
import GeneralDevice from "@entity/GeneralDevice/GeneralDevice";
import Maintenance from "@entity/Maintenance/Maintenance";
import Inventory from "@entity/Inventory/Inventory";
import Record from "@entity/Record/Record";
import Maker from "@entity/Maker/Maker";

@Entity()
export class Device {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    serial_code: string;

    @Column()
    power_supply: string;

    @Column()
    date: Date;

    @Column()
    warranty_date: Date;

    @Column()
    production_year: number;

    @ManyToOne(type => GeneralDevice, { onDelete: 'CASCADE' })
    generalDevice: GeneralDevice;

    @ManyToOne(type => Brand, { onDelete: 'CASCADE' })
    brand: Brand;

    @ManyToOne(type => Maker, { onDelete: 'CASCADE' })
    maker: Brand;

    @OneToMany(type => Maintenance, maintenance => maintenance.device, {nullable: true})
    Maintenance: Maintenance[];

    @ManyToOne(type => Inventory, { onDelete: 'CASCADE' })
    location: Inventory;

    @OneToMany(type => Record, record => record.device)
    Record: Record[];

}

export default Device
