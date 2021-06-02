import express from 'express';
import { body, validationResult } from 'express-validator';

import { getCartFromDb, addItemToDb, addItemToSession, setItemToDb, setItemToSession, clearCartInDb, deleteItemFromDb, deleteItemFromSession } from '../controllers/cart';

const cartRouter = express.Router();

cartRouter.post('/synchronize',
    async (req, res) => {
        if (req.session.user?.email === undefined) 
            return res.status(200).json({success: true, cart: req.session.cart});

        try {
            if (req.session.cart === undefined || req.session.cart === {}) {
                const cart = await getCartFromDb(req.session.user!.email);
                cart.forEach(item => addItemToSession(item.productId, item.quantity, req.session));
                return res.status(200).json({success: true, cart: req.session.cart});
            }
            
            await clearCartInDb(req.session.user!.email);
            await Promise.all(Object.keys(req.session.cart!)
                                    .map(k => parseInt(k))
                                    .map(async k => await addItemToDb(k, req.session.cart![k], req.session.user!.email)));
            return res.status(200).json({success: true, cart: req.session.cart});
        }
        catch (e) {
            console.error(e.stack);
            return res.status(500).json("An unexpected error has occured.");
        }
    });

cartRouter.post('/item',
    body('productId').isInt(),
    body('quantity').isInt().toInt(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success: false, msg: "Invalid request", errors: errors.array(), body: req.body});
        }

        try {
            if (req.session.user?.email !== undefined)
                await addItemToDb(req.body.productId, req.body.quantity, req.session.user.email);
            addItemToSession(req.body.productId, req.body.quantity, req.session);
            return res.status(200).json({success: true, cart: req.session.cart});
        }
        catch (e) {
            console.error(e.stack);
            return res.status(500).json("An unexpected error has occured.");
        }
    });

cartRouter.put('/item',
    body('productId').isInt(),
    body('quantity').isInt().toInt(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success: false, msg: "Invalid request", errors: errors.array(), body: req.body});
        }

        try {
            if (req.session.user?.email !== undefined)
                await setItemToDb(req.body.productId, req.body.quantity, req.session.user.email);
            setItemToSession(req.body.productId, req.body.quantity, req.session);
            return res.status(200).json({success: true, cart: req.session.cart});
        }
        catch (e) {
            console.error(e.stack);
            return res.status(500).json("An unexpected error has occured.");
        }
    });

cartRouter.delete('/item',
    body('productId').isInt(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success: false, msg: "Invalid request", errors: errors.array(), body: req.body});
        }

        try {
            if (req.session.user?.email !== undefined)
                await deleteItemFromDb(req.body.productId, req.session.user.email);
            deleteItemFromSession(req.body.productId, req.session);
            return res.status(200).json({success: true, cart: req.session.cart});
        }
        catch (e) {
            console.error(e.stack);
            return res.status(500).json("An unexpected error has occured.");
        }
    });

export default cartRouter;