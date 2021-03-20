import { sign } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { querySingle } from '../db';

import User from '../models/auth/user';

export async function retrieveUser(email: string): Promise<User | undefined> {
    const row = await querySingle('SELECT * FROM "auth"."Users" WHERE "Email"=$1', [email]);
    if (row === undefined) return undefined;
    const user = new User(row.Email, row.PasswordHash, row.Id, row.Username, row.FirstName, row.MiddleName, row.LastName);
    console.log(user);
    return user;
}

declare var process : {
    env: {
        JWTKEY: string
    }
}

export async function login(user: User, password: string): Promise<{success: boolean, token: string | null}> {
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
        return {success: false, token: null};
    }

    return {success: true, token: sign({userId: user.email}, process.env.JWTKEY, {expiresIn: '24h'})};
}