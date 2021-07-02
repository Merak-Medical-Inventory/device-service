import '../src/TestEnv';
import supertest, { SuperTest } from 'supertest';
import Connection from '../src/connection';
import {typeOrmConfig} from '../src/config';
import app from '../src/server';
import { deleteDevice } from '../src/db/entity/Device/DeviceDao';
import { array, object } from '@hapi/joi';

const deviceService : SuperTest<supertest.Test> = supertest(app)
const authService : SuperTest<supertest.Test> = supertest('http://localhost:3001/api');
const inventoryService : SuperTest<supertest.Test> = supertest('http://localhost:3002');

const connection = new Connection(typeOrmConfig);

let token : string;
let userId : number;
let deparmentId = 1;
let brandId : number;
let makerId : number;
let generalDeviceId : number;

const deviceValidationObject = {
  id : expect.any(Number),
  serial_code : expect.any(String),
  power_supply : expect.any(String),
  date : expect.any(String),
  warranty_date : expect.any(String),
  production_year : expect.any(Number),
  generalDevice : expect.anything(),
  brand : expect.anything(),
  location : expect.anything(),
  maker : expect.anything()
}

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
})

afterAll(async ()=>{
    await connection.close()
});


describe('Get all device', ()=>{

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

  it('Should get all the devices', async ()=>{

      const deviceResponse = await deviceService
      .get(`/api/device`)
      .set("Authorization", `Bearer ${token}`)
      expect(deviceResponse.body.data).toEqual(expect.arrayContaining([expect.objectContaining(deviceValidationObject)]))
  }) 

  it('Should get all the devices by deparment', async ()=>{

    const deviceResponse = await deviceService
    .get(`/api/device/inventory/${deparmentId}`)
    .set("Authorization", `Bearer ${token}`)
    expect(deviceResponse.body.data).toEqual(expect.arrayContaining([expect.objectContaining(deviceValidationObject)]))
}) 

it('Should get all the devices by order', async ()=>{

  const deviceResponse = await deviceService
  .post(`/api/device/order`)
  .set("Authorization", `Bearer ${token}`)
  .send({
    asc : true
  })
  expect(deviceResponse.body.data).toEqual(expect.arrayContaining([expect.anything()]))
}) 
})

describe('Get device', ()=>{

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

  it('Should get a device by id device', async ()=>{

      const deviceResponse = await deviceService
      .get(`/api/device/${deviceId}`)
      .set("Authorization", `Bearer ${token}`)
      expect(deviceResponse.body.data).toEqual(expect.objectContaining(deviceValidationObject))
  }) 

  it('Should get a device by id device', async ()=>{

      const deviceResponse = await deviceService
      .get(`/api/device/${deviceId}`)
      .set("Authorization", `Bearer ${token}`)
      expect(deviceResponse.body.data).toEqual(expect.objectContaining(deviceValidationObject))
  }) 
})

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
        .put(`/api/device/location/${deviceId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
            idInventory : 2
        });
        expect(deviceResponse.body.data.location.id).toBe(2)
    }) 
})

// describe('Get all devices by deparment', ()=>{

//   let deviceId : number;

//   beforeAll(async () =>{

//       const deviceResponse = await deviceService
//       .post("/api/device")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//           serial_code: `${Math.floor(1000 + Math.random() * 9000).toString()}`,
//           power_supply: "test power supply",
//           date: new Date(),
//           warranty_date : new Date(),
//           production_year : 2021,
//           generalDevice : generalDeviceId,
//           maker : makerId,
//           brand : brandId,
//           location : deparmentId
//       });
//       deviceId = parseInt(deviceResponse.body.data.id);
//   })

//   afterAll(async ()=>{
//       await deleteDevice(deviceId)
//   })

//   it('Should get all the devices by deparment', async ()=>{

//       const deviceResponse = await deviceService
//       .get(`/api/device/inventory/${deparmentId}`)
//       .set("Authorization", `Bearer ${token}`)
//       expect(deviceResponse.body.data).toEqual(expect.arrayContaining([expect.objectContaining(deviceValidationObject)]))
//   }) 
// })



// describe('Delete device', ()=>{

//   let deviceId : number;

//   beforeAll(async () =>{

//       const deviceResponse = await deviceService
//       .post("/api/device")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//           serial_code: `${Math.floor(1000 + Math.random() * 9000).toString()}`,
//           power_supply: "test power supply",
//           date: new Date(),
//           warranty_date : new Date(),
//           production_year : 2021,
//           generalDevice : generalDeviceId,
//           maker : makerId,
//           brand : brandId,
//           location : deparmentId
//       });
//       deviceId = parseInt(deviceResponse.body.data.id);
//   })

//   it('Should update the location of the device', async ()=>{

//       const deviceResponse = await deviceService
//       .delete(`/api/device/${deviceId}`)
//       .set("Authorization", `Bearer ${token}`)

//       expect(deviceResponse.body.statusCode).toBe(201)
//   }) 
// })