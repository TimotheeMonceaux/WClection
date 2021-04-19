import { IDbObject } from "../../db";
import { getInsertParameters } from "../../utils/db";

export default class CartItem implements IDbObject {
    constructor(
        public productId: number,
        public quantity: number,
        public userEmail?: string,
        public createDate?: Date
    ) {}

    public readonly TABLE_NAME = 'shop."CartItems"';

    getInsertParameters(): Array<[string, string]> {
        return getInsertParameters(this);
    }
}