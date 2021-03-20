import express from 'express';
import { body, validationResult } from 'express-validator';
import { login, retrieveUser } from '../controllers/auth';

const authRouter = express.Router();

authRouter.post('/login',
    body('email').isEmail(),
    body('password').isLength({min: 8}),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success: false, msg: "Invalid request", errors: errors.array()});
        }
        
        retrieveUser(req.body.email)
            .then(usr => {
                if (usr === undefined) {
                    return res.status(401).json({success: false, msg: "Unknown User"});
                }

                login(usr!, req.body.password)
                    .then(st => {
                        if (!st.success) {
                            return res.status(401).json({success: false, msg: "Incorrect Password"});
                        }
                        return res.status(200).json({success: true, token: st.token, user: usr!.toFrontend()});
                    })
            });
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