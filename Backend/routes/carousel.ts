import express from 'express';

import CarouselSlide from '../models/shop/carouselSlide';
import { getCarouselSlides } from '../controllers/carousel';

const carouselRouter = express.Router();

carouselRouter.get('/',
    (req, res) => {
        getCarouselSlides()
            .then(slides => res.status(200).json({success: true, slides}))
            .catch(error => res.status(500).json({success: false, msg: "An unexpected error has occured", error}));
    });

export default carouselRouter;