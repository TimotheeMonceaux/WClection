import express from 'express';

import { getCollections } from '../controllers/collection';

const collectionRouter = express.Router();

collectionRouter.get('/',
    (req, res) => {
        getCollections()
            .then(collections => res.status(200).json({success: true, collections: collections.map(c => c.toFrontend())}))
            .catch(error => res.status(500).json({success: false, msg: "An unexpected error has occured", error}));
    });

export default collectionRouter;