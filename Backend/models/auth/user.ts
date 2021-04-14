import { IDbObject } from "../../db";
import { getInsertParameters } from "../../utils/db";
import { filterNullValues } from "../../utils/object";

export default class User implements IDbObject{
    constructor(
        public email: string,
        public passwordHash: string,
        public confirmed?: boolean,
        public newsletter?: boolean,
        public firstName?: string,
        public middleName?: string,
        public lastName?: string,
        public id?: number) {}

    public readonly TABLE_NAME = 'auth."Users"';

    getInsertParameters(): Array<[string, string]> {
        return getInsertParameters(this);
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