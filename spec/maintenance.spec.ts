import '../src/TestEnv';
import supertest, { SuperTest } from 'supertest';
import Connection from '../src/connection';
import {typeOrmConfig} from '../src/config';
import app from '../src/server';
import { deleteMaintenance } from '@db/entity/Maintenance/MaintenanceDao';
import { any } from '@hapi/joi';

const connection = new Connection(typeOrmConfig);

const deviceService : SuperTest<supertest.Test> = supertest(app)
const authService : SuperTest<supertest.Test> = supertest('http://localhost:3001/api');
const inventoryService : SuperTest<supertest.Test> = supertest('http://localhost:3002');

let token : string;
let userId : number;
let deparmentId = 1;
let brandId : number;
let makerId : number;
let generalDeviceId : number;
let deviceId : number;


beforeAll( async () => {
    await connection.create();

  const response = await authService.post("/auth/login").send({
    username: "superuser",
    password: "superuser",
  });
  token = response.body.data.token;
  userId = parseInt(response.body.data.response.id);

  const brandResponse = await inventoryService
    .post("/api/brand")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "test brand",
      description: "test description",
    });
  brandId = parseInt(brandResponse.body.data.id);

  const makerResponse = await deviceService
    .post("/api/maker")
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
    await connection.close()
})

describe('Get All maintenances',()=>{
    let maintenanceId : number;

    beforeAll(async () => {
        const maintenanceResponse = await deviceService
        .post("/api/maintenance")
        .set("Authorization", `Bearer ${token}`)
        .send({
            description: "test maintenance",
            date: "10-01-2021",
            device : deviceId
        });
        maintenanceId = parseInt(maintenanceResponse.body.data.id);
    })

    afterAll(async ()=>{
       await deleteMaintenance(maintenanceId)
    })


    it('Should get all maintenance',async ()=>{
        const maintenanceResponse = await deviceService
        .get(`/api/maintenance`)
        .set("Authorization", `Bearer ${token}`)
        const validationObject = {
            id : expect.any(Number),
            description: expect.any(String),
            date: expect.any(String),
            device : expect.anything()
        }
        expect(maintenanceResponse.body.data).toEqual(expect.arrayContaining([validationObject]))
    })
})

describe('Get maintenance',()=>{
    let maintenanceId : number;

    beforeAll(async () => {
        const maintenanceResponse = await deviceService
        .post("/api/maintenance")
        .set("Authorization", `Bearer ${token}`)
        .send({
            description: "test maintenance",
            date: "10-01-2021",
            device : deviceId
        });
        maintenanceId = parseInt(maintenanceResponse.body.data.id);
    })

    afterAll(async ()=>{
       await deleteMaintenance(maintenanceId)
    })


    it('Should get a maintenance by id',async ()=>{
        const maintenanceResponse = await deviceService
        .get(`/api/maintenance/${maintenanceId}`)
        .set("Authorization", `Bearer ${token}`)
        const validationObject = {
            id : maintenanceId,
            description: "test maintenance",
            date: expect.any(String),
            device : expect.anything()
        }
        expect(maintenanceResponse.body.data).toEqual(validationObject)
    })
})

describe('Maintenance creation',()=>{
    let maintenanceId : number;

    afterAll(async ()=>{
       await deleteMaintenance(maintenanceId)
    })

    it('Should create a maintenance',async ()=>{
        const maintenanceResponse = await deviceService
        .post("/api/maintenance")
        .set("Authorization", `Bearer ${token}`)
        .send({
            description: "test maintenance",
            date: "10-01-2021",
            device : deviceId
        });
        maintenanceId = parseInt(maintenanceResponse.body.data.id);
        const validationObject = {
            id : expect.any(Number),
            description: "test maintenance",
            date: "10-01-2021",
            device : deviceId
        }
        expect(maintenanceResponse.body.data).toEqual(validationObject)
    })
})

describe('Maintenance edit',()=>{
    let maintenanceId : number;

    beforeAll(async () => {
        const maintenanceResponse = await deviceService
        .post("/api/maintenance")
        .set("Authorization", `Bearer ${token}`)
        .send({
            description: "test maintenance",
            date: "10-01-2021",
            device : deviceId
        });
        maintenanceId = parseInt(maintenanceResponse.body.data.id);
    })

    afterAll(async ()=>{
       await deleteMaintenance(maintenanceId)
    })

    it('Should update a maintenance',async ()=>{
        const maintenanceResponse = await deviceService
        .put(`/api/maintenance/${maintenanceId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
            description: "updated maintenance",
            date: "11-01-2021",
            device : deviceId
        });
        const validationObject = {
            id : maintenanceId,
            description: "updated maintenance",
            date: expect.any(String),
        }
        console.log(maintenanceResponse.body)
        expect(maintenanceResponse.body.data).toEqual(validationObject)
    })
})

describe('Delete maintenance',()=>{
    let maintenanceId : number;

    beforeAll(async () => {
        const maintenanceResponse = await deviceService
        .post("/api/maintenance")
        .set("Authorization", `Bearer ${token}`)
        .send({
            description: "test maintenance",
            date: "10-01-2021",
            device : deviceId
        });
        maintenanceId = parseInt(maintenanceResponse.body.data.id);
    })

    it('Should delete a maintenance',async ()=>{
        const maintenanceResponse = await deviceService
        .delete(`/api/maintenance/${maintenanceId}`)
        .set("Authorization", `Bearer ${token}`)
        expect(maintenanceResponse.body.statusCode).toBe(201)
    })
})