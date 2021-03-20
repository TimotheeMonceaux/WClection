import { getInsertParameters } from "../../utils/db";

export default class User {
    email: string;
    passwordHash: string;
    id: number | undefined;
    username: string | undefined;
    firstName: string | undefined;
    middleName: string | undefined;
    lastName: string | undefined;

    constructor(
        email: string,
        passwordHash: string,
        id: number | undefined = undefined,
        username: string | undefined = undefined,
        firstName: string | undefined = undefined,
        middleName: string | undefined = undefined,
        lastName: string | undefined = undefined
    ) {
        this.email = email;
        this.passwordHash = passwordHash;
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
    }

    getInsertParameters(): {table: string, data: Array<[string, string]>} {
        return getInsertParameters('"auth"."Users"', this);
    }
}