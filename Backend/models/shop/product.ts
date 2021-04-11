import { filterNullValues } from "../../utils/object";

export default class Product {
    id: number;
    name: string;
    description: string | null | undefined;
    basePrice: number;
    price: number;
    mainImage: string;
    secondaryImage: string | null | undefined;
    images: Array<string>;

    constructor(
        id: number,
        name: string,
        basePrice: number,
        price: number,
        mainImage: string,
        description: string | null | undefined = undefined,
        secondaryImage: string | null | undefined = undefined,
        images: Array<string> | null | undefined = undefined
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.basePrice = basePrice;
        this.price = price;
        this.mainImage = mainImage;
        this.secondaryImage = secondaryImage;
        this.images = images ?? [];
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