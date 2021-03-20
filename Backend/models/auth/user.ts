import { getInsertParameters } from "../../utils/db";

export default class User {
    email: string;
    passwordHash: string;
    id: number | null | undefined;
    firstName: string | null | undefined;
    middleName: string | null | undefined;
    lastName: string | null | undefined;

    constructor(
        email: string,
        passwordHash: string,
        id: number | null | undefined= undefined,
        firstName: string | null | undefined= undefined,
        middleName: string | null | undefined = undefined,
        lastName: string | null | undefined = undefined
    ) {
        this.email = email;
        this.passwordHash = passwordHash;
        this.id = id;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
    }

    getInsertParameters(): {table: string, data: Array<[string, string]>} {
        return getInsertParameters('"auth"."Users"', this);
    }

    toFrontend(): {
        email: string,
        firstName: string | null | undefined,
        middleName: string | null | undefined,
        lastName: string | null | undefined
    } {
        return {
            email: this.email,
            firstName: this.firstName,
            middleName: this.middleName,
            lastName: this.lastName
        }
    }
}