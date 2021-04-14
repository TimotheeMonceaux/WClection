import { IDbObject } from "../../db";
import { getInsertParameters } from "../../utils/db";
import { filterNullValues } from "../../utils/object";

export default class CarouselSlide implements IDbObject {
    constructor(
        public image: string,
        public name?: string,
        public description?: string) {}

    public readonly TABLE_NAME = 'shop."CarouselSlides"';

    getInsertParameters(): Array<[string, string]> {
        return getInsertParameters(this);
    }

    toFrontend(): {
        image: string,
        name: string | null | undefined,
        description: string | null | undefined
    } {
        return filterNullValues(this);
    }
}