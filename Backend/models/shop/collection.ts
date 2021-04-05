import Product from './product';

export default class Collection {
    name: string;
    products: Array<Product>;

    constructor(
        name: string,
        products: Array<Product> = []
    ) {
        this.name = name;
        this.products = products;
    }

    toFrontend(): {
        name: string, 
        products: Array<{
            id: number,
            name: string,
            description: string | null | undefined,
            image1: string | null | undefined,
            image2: string | null | undefined,
            image3: string | null | undefined
            }>} {
                return {
                    name: this.name,
                    products: this.products.map(p => p.toFrontend())
                }
            }
}