import { db } from "../db";
import { usersTable } from "../db/usersSchema";
import crypto from "crypto";


const DEFAULT_LIMIT = 10;
const HASH_FUNCTION = 'sha512';



export async function create(user: any) {

    //var salt = crypto.randomBytes(16);
    var salt = "";

    var hashedPassword = crypto.pbkdf2Sync(user.password, salt, 100000, 64, HASH_FUNCTION);
    user.password = hashedPassword.toString('hex');

    return await db.insert(usersTable)
        .values(user)
        .returning();
};

module.exports.User;