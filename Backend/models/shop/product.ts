import { filterNullValues } from "../../utils/object";

export default class Product {
    id: number;
    name: string;
    description: string | null | undefined;
    image1: string | null | undefined;
    image2: string | null | undefined;
    image3: string | null | undefined;

    constructor(
        id: number,
        name: string,
        description: string | null | undefined = undefined,
        image1: string | null | undefined = undefined,
        image2: string | null | undefined = undefined,
        image3: string | null | undefined = undefined
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image1 = image1;
        this.image2 = image2;
        this.image3 = image3;
    }

    toFrontend(): {
        id: number,
        name: string,
        description: string | null | undefined,
        image1: string | null | undefined,
        image2: string | null | undefined,
        image3: string | null | undefined
    } {
        return filterNullValues(this);
    }
}