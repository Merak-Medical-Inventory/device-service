import '../src/TestEnv';
import supertest, { SuperTest } from 'supertest';
import Connection from '../src/connection';
import {typeOrmConfig} from '../src/config';
import app from '../src/server';
import { deleteMaker } from '@db/entity/Maker/MakerDao';

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

describe('Get All makers',()=>{
    let makerId : number;

    beforeAll(async () => {
        const makerResponse = await deviceService
        .post("/api/maker")
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "test general device",
            phone_number: "04241443343",
            address : 'test address'
        });
        makerId = parseInt(makerResponse.body.data.id);
    })

    afterAll(async ()=>{
       await deleteMaker(makerId)
    })


    it('Should get all makers',async ()=>{
        const makerResponse = await deviceService
        .get(`/api/maker`)
        .set("Authorization", `Bearer ${token}`)
        const validationObject = {
            id : expect.any(Number),
            name: expect.any(String),
            phone_number: expect.any(String),
            address : expect.any(String)
        }
        expect(makerResponse.body.data).toEqual(expect.arrayContaining([validationObject]))
    })
})

describe('Get maker',()=>{
    let makerId : number;

    beforeAll(async () => {
        const makerResponse = await deviceService
        .post("/api/maker")
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "test general device",
            phone_number: "04241443343",
            address : 'test address'
        });
        makerId = parseInt(makerResponse.body.data.id);
    })

    afterAll(async ()=>{
       await deleteMaker(makerId)
    })


    it('Should get a general item by id',async ()=>{
        const makerResponse = await deviceService
        .get(`/api/maker/${makerId}`)
        .set("Authorization", `Bearer ${token}`)
        const validationObject = {
            id : makerId,
            name: "test general device",
            phone_number: "04241443343",
            address : 'test address'
        }
        expect(makerResponse.body.data).toEqual(validationObject)
    })
})

describe('General item creation',()=>{
    let makerId : number;

    afterAll(async ()=>{
       await deleteMaker(makerId)
    })

    it('Should create a general item',async ()=>{
        const makerResponse = await deviceService
        .post("/api/maker")
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "test general device",
            phone_number: "04241443343",
            address : 'test address'
        });
        makerId = parseInt(makerResponse.body.data.id);
        const validationObject = {
            id : expect.any(Number),
            name: "test general device",
            phone_number: "04241443343",
            address : 'test address'
        }
        expect(makerResponse.body.data).toEqual(validationObject)
    })
})

describe('General item edit',()=>{
    let makerId : number;

    beforeAll(async () => {
        const makerResponse = await deviceService
        .post("/api/maker")
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "test general device",
            phone_number: "04241443343",
            address : 'test address'
        });
        makerId = parseInt(makerResponse.body.data.id);
    })

    afterAll(async ()=>{
       await deleteMaker(makerId)
    })

    it('Should update a maker',async ()=>{
        const makerResponse = await deviceService
        .put(`/api/maker/${makerId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "updated device",
            phone_number: "2342355",
            address : 'updated address'
        });
        const validationObject = {
            id : makerId,
            name: "updated device",
            phone_number: "2342355",
            address : 'updated address'
        }
        expect(makerResponse.body.data).toEqual(validationObject)
    })
})

describe('Delete maker',()=>{
    let makerId : number;

    beforeAll(async () => {
        const makerResponse = await deviceService
        .post("/api/maker")
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "test general device",
            phone_number: "04241443343",
            address : 'test address'
        });
        makerId = parseInt(makerResponse.body.data.id);
    })

    afterAll(async ()=>{
       await deleteMaker(makerId)
    })

    it('Should delete a maker',async ()=>{
        const makerResponse = await deviceService
        .delete(`/api/maker/${makerId}`)
        .set("Authorization", `Bearer ${token}`)
        expect(makerResponse.body.statusCode).toBe(201)
    })
})