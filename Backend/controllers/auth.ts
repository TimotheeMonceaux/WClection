import bcrypt from 'bcrypt';
import { v4 as uuidv4} from 'uuid';

import { insert, querySingle, update, log } from '../db';
import User from '../models/auth/user';
import { hashPassword } from '../utils/db';
import { sendMail } from '../mail';
import EmailConfirmationCache from '../models/auth/emailConfirmationCache';
import { nowPlusMinutes } from '../utils/date';
import getConfirmEmailTemplate from '../mail/templates/confirmEmail';

function updateSession(session: Express.session.Session, user: User) {
    if (session.user === undefined) session.user = new User(user.email, '');
    session.user.confirmed = user.confirmed ?? session.user.confirmed;
    session.user.firstName = user.firstName ?? session.user.firstName;
    session.user.middleName = user.middleName ?? session.user.middleName;
    session.user.lastName = user.lastName ?? session.user.lastName;
    session.updateDate = new Date();
}

export async function retrieveUser(email: string): Promise<User | undefined> {
    const row = await querySingle('SELECT * FROM "auth"."Users" WHERE "Email"=$1', [email.toLowerCase()]);
    if (row === undefined) {
        log("RETRIEVE_USER", email, "Error");
        return undefined;
    }
    log("RETRIEVE_USER", email, "Success");
    return new User(row.Email, row.PasswordHash, row.Newsletter, row.Id, row.FirstName, row.MiddleName, row.LastName);
}

export async function login(user: User, password: string, session: Express.session.Session): Promise<boolean> {
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
        log("LOGIN", user.email, "Error");
        return false;
    }

    updateSession(session, user);
    log("LOGIN", user.email, "Success");
    return true;
}

export async function signup(email: string, password: string, newsletter: boolean, session: Express.session.Session): Promise<boolean> {
    const passwordHash = await hashPassword(password);
    const user = new User(email.toLowerCase(), passwordHash, false, newsletter);
    const success = await insert(user);

    if (!success) {
        log("SIGNUP", email, "Error");
        return false
    };
    
    setupSignupConfirm(email);
    updateSession(session, user);
    log("SIGNUP", email, "Success");
    return true;
}

export async function setupSignupConfirm(email: string) {
    const id = uuidv4();
    const p1 = insert(new EmailConfirmationCache(email, id, nowPlusMinutes(15).toISOString()));
    const p2 = sendMail(getConfirmEmailTemplate(email, id));
    await Promise.all([p1, p2]);
}

export async function retrieveEmailConfirmationCache(email: string, key: string): Promise<EmailConfirmationCache | undefined> {
    const row = await querySingle('SELECT * FROM auth."EmailConfirmationCache" WHERE "Email"=$1 AND "Key"=$2', [email.toLowerCase(), key]);
    if (row === undefined) {
        log("RETRIEVE_EMAIL_CONFIRM", email, "Error");
        return undefined;
    }
    
    log("RETRIEVE_EMAIL_CONFIRM", email, "Success");
    return new EmailConfirmationCache(row.Email, row.Key, row.ValidUntil, row.CreateDate);
}

export async function retrieveLastEmailConfirmationCache(email: string): Promise<EmailConfirmationCache | undefined> {
    const row = await querySingle('SELECT * FROM auth."EmailConfirmationCache" WHERE "Email"=$1 ORDER BY "CreateDate" DESC LIMIT 1', [email.toLowerCase()]);
    if (row === undefined) {
        log("RETRIEVE_LAST_EMAIL_CONFIRM", email, "Error");
        return undefined;
    }
    
    log("RETRIEVE_LAST_EMAIL_CONFIRM", email, "Success");
    return new EmailConfirmationCache(row.Email, row.Key, row.ValidUntil, row.CreateDate);
}

export async function confirmEmail(email: string, validUntil: string, session: Express.session.Session): Promise<{success: boolean, user?: User}> {
    if (Date.now() > new Date(validUntil).getTime()) {
        log("CONFIRM_EMAIL", email, "Error", {validUntil});
        return {success:  false};
    }

    const success = await update('auth."Users"' , [['"Email"', email]], [['"Confirmed"', '1']]);
    if (!success) {
        log("CONFIRM_EMAIL", email, "Error", {msg: "Update fail"});
        return {success: false};
    }

    const user = new User(email, '', true);
    updateSession(session, user);
    log("CONFIRM_EMAIL", email, "Success", {validUntil});
    return {success: true, user}
}