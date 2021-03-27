import { getInsertParameters } from "../../utils/db";

export default class Log {
    type: string;
    user: string | undefined;
    result: string | undefined;
    extraParameters: string | undefined;

    constructor (
        type: string,
        user: string | undefined = undefined,
        result: string | undefined = undefined,
        extraParameters: string | undefined = undefined
    ) {
        this.type = type;
        this.user = user;
        this.result = result;
        this.extraParameters = extraParameters;
    }

    getInsertParameters(): {table: string, data: Array<[string, string]>} {
        return getInsertParameters('"common"."Logs"', this);
    }
}