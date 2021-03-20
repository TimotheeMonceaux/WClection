import express from 'express';
import { body, validationResult } from 'express-validator';

const authRouter = express.Router();

authRouter.post('/login',
    body('email').isEmail(),
    body('password').isLength({min: 8}),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        
        res.status(200).json({status: 1});
    });

authRouter.post('/signup',
    body('email').isEmail(),
    body('password').isLength({min: 8}),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        
        res.status(200).json({status: 1});
    });

export default authRouter;