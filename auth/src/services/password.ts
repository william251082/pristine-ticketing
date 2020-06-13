import {promisify} from "util";
import {randomBytes, scrypt} from "crypto";

const scryptAsync = promisify(scrypt);

export class Password {
    static async toHash(password: string) {
        const salt = randomBytes(8).toString('hex');
        // scrypt returns buffer(array with raw data)
        // actual password hashing process
        const buf = (await scryptAsync(password, salt, 64)) as Buffer;

        return `${buf.toString('hex')}.${salt}`;
    }

    static compare(storedPassword: string, suppliedPassword: string) {

    }
}