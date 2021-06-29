import '../src/TestEnv';
import supertest, { SuperTest } from 'supertest';
import Connection from '../src/connection';
import {typeOrmConfig} from '../src/config';
import app from '../src/server';
import { deleteDevice } from '../src/db/entity/Device/DeviceDao';

const deviceService : SuperTest<supertest.Test> = supertest(app)
const authService : SuperTest<supertest.Test> = supertest('http://localhost:3001/api');
const inventoryService : SuperTest<supertest.Test> = supertest('http://localhost:3002/api');

const connection = new Connection(typeOrmConfig);

let token : string;
let userId : number;
let deparmentId : number;
let brandId : number;
let makerId : number;
let generalDeviceId : number;

beforeAll( async () => {
    await connection.create();

  const response = await authService.post("/auth/login").send({
    username: "superuser",
    password: "superuser",
  });
  token = response.body.data.token;
  userId = parseInt(response.body.data.response.id);
  deparmentId = parseInt(response.body.data.department)

  const brandResponse = await inventoryService
    .post("/api/brand")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "test brand",
      description: "test description",
    });
  brandId = parseInt(brandResponse.body.data.id);

  const makerResponse = await deviceService
    .post("/api/generalDevice")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "test general device",
      phone_number: "04241443343",
      address : 'test address'
    });
    makerId = parseInt(makerResponse.body.data.id);

  const generalDeviceResponse = await deviceService
    .post("/api/generalDevice")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "test general device",
      description: "test description",
    });
    generalDeviceId = parseInt(generalDeviceResponse.body.data.id);
})

afterAll(async ()=>{
    await connection.close()
});

describe('Create device', ()=>{

    let deviceId : number;
    
    afterAll(async ()=>{
        await deleteDevice(deviceId)
    })

    it('Should create a device', async ()=>{

        const deviceResponse = await deviceService
        .post("/api/device")
        .set("Authorization", `Bearer ${token}`)
        .send({
            serial_code: `${Math.floor(1000 + Math.random() * 9000).toString()}`,
            power_supply: "test power supply",
            date: new Date(),
            warranty_date : new Date(),
            production_year : 2021,
            generalDevice : generalDeviceId,
            maker : makerId,
            brand : brandId,
            location : deparmentId
        });

        deviceId = parseInt(deviceResponse.body.data.id);
        expect(deviceResponse.body.statusCode).toBe(201)
    })

})

describe('Update location device', ()=>{

    let deviceId : number;

    beforeAll(async () =>{

        const deviceResponse = await deviceService
        .post("/api/device")
        .set("Authorization", `Bearer ${token}`)
        .send({
            serial_code: `${Math.floor(1000 + Math.random() * 9000).toString()}`,
            power_supply: "test power supply",
            date: new Date(),
            warranty_date : new Date(),
            production_year : 2021,
            generalDevice : generalDeviceId,
            maker : makerId,
            brand : brandId,
            location : deparmentId
        });
        deviceId = parseInt(deviceResponse.body.data.id);
    })

    afterAll(async ()=>{
        await deleteDevice(deviceId)
    })

    it('Should update the location of the device', async ()=>{

        const deviceResponse = await deviceService
        .post(`/api/device/location/${deviceId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
            idInventory : 2
        });

        deviceId = parseInt(deviceResponse.body.data.id);
        expect(deviceResponse.body.statusCode).toBe(201)
    })

})