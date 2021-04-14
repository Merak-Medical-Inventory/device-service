import {Entity, PrimaryGeneratedColumn, Column,ManyToOne} from 'typeorm';
import Inventory from '../Inventory/Inventory';
import Device from '../Device/Device';
import User from '../user/User';
@Entity()
export class DeviceTransaction {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    blockchainTx: string;

    @Column()
    bcTransactionId: string;
    
    @Column({nullable : true})
    sender: User;
    
    @ManyToOne(type => Inventory,{nullable : true})
    inventory1!: Inventory;

    @ManyToOne(type => Inventory,{nullable : true})
    inventory2!: Inventory;

    @ManyToOne(type => Device)
    device!: Device;
}

export default DeviceTransaction
