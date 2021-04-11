import { getInsertParameters } from "../../utils/db";
import { filterNullValues } from "../../utils/object";

export default class User {
    email: string;
    passwordHash: string;
    id: number | null | undefined;
    firstName: string | null | undefined;
    middleName: string | null | undefined;
    lastName: string | null | undefined;
    newsletter: boolean | null | undefined;

    constructor(
        email: string,
        passwordHash: string,
        newsletter: boolean | null | undefined = undefined,
        id: number | null | undefined = undefined,
        firstName: string | null | undefined= undefined,
        middleName: string | null | undefined = undefined,
        lastName: string | null | undefined = undefined
    ) {
        this.email = email;
        this.passwordHash = passwordHash;
        this.newsletter = newsletter;
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
        return filterNullValues({
            email: this.email,
            firstName: this.firstName,
            middleName: this.middleName,
            lastName: this.lastName
        });
    }
}