import { filterNullValues } from "../../utils/object";

export default class Product {
    id: number;
    name: string;
    description: string | null | undefined;
    image: string | null | undefined;

    constructor(
        id: number,
        name: string,
        description: string | null | undefined = undefined,
        image: string | null | undefined = undefined
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
    }

    toFrontend(): {
        id: number,
        name: string,
        description: string | null | undefined,
        image: string | null | undefined
    } {
        return filterNullValues(this);
    }
}