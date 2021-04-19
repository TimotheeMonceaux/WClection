import { query, log } from '../db';

import CarouselSlide from '../models/shop/carouselSlide';
import { nowPlusHours } from '../utils/date';

const carouselCache: {
    revokeDate?: Date,
    carouselSlides?: Array<CarouselSlide>
} = {};

function isCacheValid(): boolean {
    return carouselCache !== {} && new Date() < carouselCache.revokeDate!;
}

function updateCache(carouselSlides: Array<CarouselSlide>) {
    carouselCache.carouselSlides = carouselSlides;
    carouselCache.revokeDate = nowPlusHours(12);
}

export async function getCarouselSlides(): Promise<Array<CarouselSlide>> {
    if (isCacheValid())
        return carouselCache.carouselSlides!;

    const rows = await query('SELECT * FROM "shop"."CarouselSlides" WHERE "IsActive"=true');
    const carouselSlides = rows.map(r => new CarouselSlide(r.Image, r.Name, r.Description));

    updateCache(carouselSlides);
    log("GET_CAROUSEL", undefined, "Success", {slides: rows.length});
    return carouselSlides;
}