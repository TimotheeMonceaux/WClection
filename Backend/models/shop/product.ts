import { IDbObject } from "../../db";
import { getInsertParameters } from "../../utils/db";
import { filterNullValues } from "../../utils/object";

export default class Product implements IDbObject {
    constructor(
        public id: number,
        public name: string,
        public basePrice: number,
        public price: number,
        public mainImage: string,
        public description?: string,
        public secondaryImage?: string,
        public images: Array<string> = []) {}

    public readonly TABLE_NAME = 'shop."Products"';

    getInsertParameters(): Array<[string, string]> {
        return getInsertParameters(this);
    }

    toFrontend(): {
        id: number,
        name: string,
        description: string | null | undefined,
        basePrice: number,
        price: number,
        mainImage: string | null | undefined,
        secondaryImage: string | null | undefined,
        images: Array<string>
    } {
        return filterNullValues(this);
    }
}