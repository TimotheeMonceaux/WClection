import { IDbObject } from "../../db";
import { getInsertParameters } from "../../utils/db";

export default class EmailConfirmationCache implements IDbObject {
    constructor(
        public email: string,
        public key: string,
        public validUntil: string,
        public id?: number) {}

    public readonly TABLE_NAME = 'auth."EmailConfirmationCache"';

    getInsertParameters() {
        return getInsertParameters(this);
    }
}