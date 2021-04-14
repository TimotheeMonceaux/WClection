import { IDbObject } from '../../db';
import { getInsertParameters } from "../../utils/db";
import Product from './product';

export default class Collection implements IDbObject {
    constructor(
        public name: string,
        public products: Array<Product> = []) {}

    public readonly TABLE_NAME = 'shop."Collections"';

    getInsertParameters(): Array<[string, string]> {
        return getInsertParameters(this);
    }

    toFrontend(): {
        name: string, 
        products: Array<{
            id: number,
            name: string,
            description: string | null | undefined,
            basePrice: number,
            price: number,
            mainImage: string | null | undefined,
            secondaryImage: string | null | undefined,
            images: Array<string>
        }>} {
                return {
                    name: this.name,
                    products: this.products.map(p => p.toFrontend())
                }
            }
}