import '../src/TestEnv';
import supertest, { SuperTest } from 'supertest';
import Connection from '../src/connection';
import {typeOrmConfig} from '../src/config';
import app from '../src/server';
import { deleteGeneralDevice } from '@db/entity/GeneralDevice/GeneralDeviceDao';

const connection = new Connection(typeOrmConfig);

const deviceService : SuperTest<supertest.Test> = supertest(app)
const authService : SuperTest<supertest.Test> = supertest('http://localhost:3001/api');

let token : string;

beforeAll(async ()=>{
    await connection.create()

    const response = await authService.post("/auth/login").send({
        username: "superuser",
        password: "superuser",
    });
    token = response.body.data.token;
})

afterAll(async ()=>{
    await connection.close()
})

describe('Get All item',()=>{
    let generalDeviceId : number;

    beforeAll(async () => {
        const generalDeviceResponse = await deviceService
        .post("/api/generalDevice")
        .set("Authorization", `Bearer ${token}`)
        .send({
        name: "test general item",
        description: "test description",
        });
        generalDeviceId = parseInt(generalDeviceResponse.body.data.id);
    })

    afterAll(async ()=>{
       await deleteGeneralDevice(generalDeviceId)
    })


    it('Should get all general item',async ()=>{
        const generalDeviceResponse = await deviceService
        .get(`/api/generalDevice`)
        .set("Authorization", `Bearer ${token}`)
        const validationObject = {
            id : expect.any(Number),
            name: expect.any(String),
            description: expect.any(String),
        }
        expect(generalDeviceResponse.body.data).toEqual(expect.arrayContaining([validationObject]))
    })
})

describe('Get general item',()=>{
    let generalDeviceId : number;

    beforeAll(async () => {
        const generalDeviceResponse = await deviceService
        .post("/api/generalDevice")
        .set("Authorization", `Bearer ${token}`)
        .send({
        name: "test general item",
        description: "test description",
        });
        generalDeviceId = parseInt(generalDeviceResponse.body.data.id);
    })

    afterAll(async ()=>{
       await deleteGeneralDevice(generalDeviceId)
    })


    it('Should get a general item by id',async ()=>{
        const generalDeviceResponse = await deviceService
        .get(`/api/generalDevice/${generalDeviceId}`)
        .set("Authorization", `Bearer ${token}`)
        const validationObject = {
            id : generalDeviceId,
            name: "test general item",
            description: "test description",
        }
        expect(generalDeviceResponse.body.data).toEqual(validationObject)
    })
})

describe('General item creation',()=>{
    let generalDeviceId : number;

    afterAll(async ()=>{
       await deleteGeneralDevice(generalDeviceId)
    })

    it('Should create a general item',async ()=>{
        const generalDeviceResponse = await deviceService
        .post("/api/generalDevice")
        .set("Authorization", `Bearer ${token}`)
        .send({
        name: "test general item",
        description: "test description",
        });
        generalDeviceId = parseInt(generalDeviceResponse.body.data.id);
        const validationObject = {
            id : expect.any(Number),
            name : 'test general item',
            description : 'test description'
        }
        expect(generalDeviceResponse.body.data).toEqual(validationObject)
    })
})

describe('General item edit',()=>{
    let generalDeviceId : number;

    beforeAll(async () => {
        const generalDeviceResponse = await deviceService
        .post("/api/generalDevice")
        .set("Authorization", `Bearer ${token}`)
        .send({
        name: "test general item",
        description: "test description",
        });
        generalDeviceId = parseInt(generalDeviceResponse.body.data.id);
    })

    afterAll(async ()=>{
       await deleteGeneralDevice(generalDeviceId)
    })

    it('Should update a general item',async ()=>{
        const generalDeviceResponse = await deviceService
        .put(`/api/generalDevice/${generalDeviceId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "Updated general item",
            description: "Updated description",
        });
        const validationObject = {
            id : generalDeviceId,
            name: "Updated general item",
            description: "Updated description",
        }
        expect(generalDeviceResponse.body.data).toEqual(validationObject)
    })
})

describe('Delete general item',()=>{
    let generalDeviceId : number;

    beforeAll(async () => {
        const generalDeviceResponse = await deviceService
        .post("/api/generalDevice")
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "test general item",
            description: "test description",
        });
        generalDeviceId = parseInt(generalDeviceResponse.body.data.id);
    })

    afterAll(async ()=>{
       await deleteGeneralDevice(generalDeviceId)
    })

    it('Should delete a general item',async ()=>{
        const generalDeviceResponse = await deviceService
        .delete(`/api/generalDevice/${generalDeviceId}`)
        .set("Authorization", `Bearer ${token}`)
        const validationObject = {
            id : generalDeviceId,
            name: "Updated general item",
            description: "Updated description",
        }
        expect(generalDeviceResponse.body.statusCode).toBe(201)
    })
})