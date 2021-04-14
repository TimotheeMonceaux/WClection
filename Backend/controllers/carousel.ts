import { query, log } from '../db';

import CarouselSlide from '../models/shop/carouselSlide';

export async function getCarouselSlides(): Promise<Array<CarouselSlide>> {
    const rows = await query('SELECT * FROM "shop"."CarouselSlides" WHERE "IsActive"=true');
    log("GET_CAROUSEL", undefined, "Success", {slides: rows.length});
    return rows.map(r => new CarouselSlide(r.Image, r.Name, r.Description));
}