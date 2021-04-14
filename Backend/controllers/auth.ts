import { sign } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { v4 as uuidv4} from 'uuid';

import { insert, querySingle, log } from '../db';
import User from '../models/auth/user';
import { hashPassword } from '../utils/db';
import { sendMail } from '../mail';
import EmailConfirmationCache from '../models/auth/emailConfirmationCache';
import { nowPlusMinutes } from '../utils/date';
import getConfirmEmailTemplate from '../mail/templates/confirmEmail';

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
    const success = await insert(new User(email.toLowerCase(), passwordHash, false, newsletter));

    if (!success) {
        log("SIGNUP", email, "Error");
        return {success: false, token: null}
    };
    
    setupSignupConfirm(email);
    log("SIGNUP", email, "Success");
    return {success: true, token: sign({userId: email}, process.env.JWTKEY, {expiresIn: '24h'})};
}

async function setupSignupConfirm(email: string) {
    const id = uuidv4();
    insert(new EmailConfirmationCache(email, id, nowPlusMinutes(15).toISOString()));
    sendMail(getConfirmEmailTemplate(email, id));
}