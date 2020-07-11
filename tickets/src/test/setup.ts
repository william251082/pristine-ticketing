import {MongoMemoryServer} from "mongodb-memory-server";
import * as mongoose from "mongoose";
import * as request from "supertest";
import {app} from "../app";

declare global {
    namespace NodeJS {
        interface Global {
            signin(): Promise<string[]>;
        }
    }
}

let mongo: any;
beforeAll(async () => {
    // not an ideal solution yet
    process.env.JWT_KEY = 'gfgsdfgsfd';

    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

global.signin = async () => {
    const email = 'test@test.com';
    const password = 'password';

    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email, password
        })
        .expect(201);

    return response.get('Set-Cookie');
};