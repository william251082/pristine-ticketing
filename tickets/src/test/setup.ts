import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
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
    // Build a jsonwebtoken payload. {id, email}
    // Create the JWT
    // Build session Object. { jwt: MY_JWT }
    // Turn that session into json
    // Take json and encode it as base64
    // return a string that's the cookie with the encoded data
};