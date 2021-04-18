import { IDbObject } from "../../db";
import { getInsertParameters } from "../../utils/db";

export default class ForgotPasswordCache implements IDbObject {
    constructor(
        public email: string,
        public key: string,
        public validUntil: string,
        public createDate?: string,
        public id?: number) {}

    public readonly TABLE_NAME = 'auth."ForgotPasswordCache"';

    getInsertParameters() {
        return getInsertParameters(this);
    }
}