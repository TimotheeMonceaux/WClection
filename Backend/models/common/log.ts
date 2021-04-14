import { IDbObject } from "../../db";
import { getInsertParameters } from "../../utils/db";

export default class Log implements IDbObject {
    constructor (
        public type: string,
        public user?: string,
        public result?: string,
        public extraParameters?: string) {}

    public readonly TABLE_NAME = 'common."Logs"';

    getInsertParameters(): Array<[string, string]> {
        return getInsertParameters(this);
    }
}