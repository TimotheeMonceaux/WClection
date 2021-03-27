import express from 'express';
import { body, validationResult } from 'express-validator';
import { login, retrieveUser, signup } from '../controllers/auth';
import User from '../models/auth/user';

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
                    return res.status(401).json({success: false, msg: "Email inconnu"});
                }

                login(usr!, req.body.password)
                    .then(st => {
                        if (!st.success) {
                            return res.status(401).json({success: false, msg: "Mot de passe incorrect"});
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
            return res.status(400).json({success: false, msg: "Invalid request", errors: errors.array()});
        }
        
        retrieveUser(req.body.email)
            .then(usr => {
                if (usr !== undefined) {
                    return res.status(401).json({success: false, msg: "Cet email est déjà utilisé"});
                }
                
                signup(req.body.email, req.body.password)
                    .then(st => {
                        if (!st.success) {
                            return res.status(500).json({success: false, msg: "Internal server error"});
                        }

                        return res.status(200).json({success:true, token: st.token, user: new User(req.body.email, '', null, null, null, null).toFrontend()});
                    })
                    .catch(e => console.error(e.stack));
            });
    });

export default authRouter;