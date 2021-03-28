import { getInsertParameters } from "../../utils/db";
import { filterNullValues } from "../../utils/object";

export default class CarouselSlide {
    image: string;
    name: string | null | undefined;
    description: string | null | undefined;

    constructor(
        image: string,
        name: string | null | undefined = undefined,
        description: string | null | undefined = undefined
    ) {
        this.image = image;
        this.name = name;
        this.description = description;
    }

    getInsertParameters(): {table: string, data: Array<[string, string]>} {
        return getInsertParameters('"shop"."CarouselSlides"', this);
    }

    toFrontend(): {
        image: string,
        name: string | null | undefined,
        description: string | null | undefined
    } {
        return filterNullValues(this);
    }
}