import crypto from "crypto";

const HASH_FUNCTION = 'sha512';
const salt = "";

export async function getHashedPassword (password) {

    const hashedPassword = await crypto.pbkdf2Sync(password, salt, 100000, 64, HASH_FUNCTION).toString('hex');
    return hashedPassword;
}