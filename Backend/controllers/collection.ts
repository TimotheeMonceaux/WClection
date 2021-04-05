import _ from 'lodash';

import { query, log } from '../db';
import Collection from '../models/shop/collection';
import Product from '../models/shop/product';

const collectionQuery = `
    SELECT C."Name" AS "Collection", P."Id", P."Name", P."Description", P."Image1", P."Image2", P."Image3"
    FROM shop."Products" P
    JOIN shop."Collections" C ON P."CollectionId" = C."Id"
    WHERE C."IsActive" AND P."IsActive"`;

export async function getCollections(): Promise<Array<Collection>> {
    const rows = await query(collectionQuery);
    const grouped = _.groupBy(rows, 'Collection');
    const collections = Object.keys(grouped)
        .map(k => new Collection(
            k, 
            grouped[k].map((i: any) => new Product(
                i.Id, 
                i.Name, 
                i.Description, 
                i.Image1, 
                i.Image2, 
                i.Image3))));
    log("GET_COLLECTION", undefined, "Success", {collections: collections.length, products: rows.length});
    return collections;
}