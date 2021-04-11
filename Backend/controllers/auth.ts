import { sign } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { insert, querySingle, log } from '../db';

import User from '../models/auth/user';
import { hashPassword } from '../utils/db';

export async function retrieveUser(email: string): Promise<User | undefined> {
    const row = await querySingle('SELECT * FROM "auth"."Users" WHERE "Email"=$1', [email.toLowerCase()]);
    if (row === undefined) {
        log("RETRIEVE_USER", email, "Error");
        return undefined;
    }
    log("RETRIEVE_USER", email, "Success");
    return new User(row.Email, row.PasswordHash, row.Newsletter, row.Id, row.FirstName, row.MiddleName, row.LastName);
}

declare var process : {
    env: {
        JWTKEY: string
    }
}

export async function login(user: User, password: string): Promise<{success: boolean, token: string | null}> {
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
        log("LOGIN", user.email, "Error");
        return {success: false, token: null};
    }

    log("LOGIN", user.email, "Success");
    return {success: true, token: sign({userId: user.email}, process.env.JWTKEY, {expiresIn: '24h'})};
}

export async function signup(email: string, password: string, newsletter: boolean): Promise<{success: boolean, token: string | null}> {
    const passwordHash = await hashPassword(password);
    const {table, data} = new User(email.toLowerCase(), passwordHash, newsletter).getInsertParameters();
    const success = await insert(table, data);

    if (!success) {
        log("SIGNUP", email, "Error");
        return {success: false, token: null}
    };

    log("SIGNUP", email, "Success");
    return {success: true, token: sign({userId: email}, process.env.JWTKEY, {expiresIn: '24h'})};
}