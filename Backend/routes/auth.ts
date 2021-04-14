import express from 'express';
import { body, check, validationResult } from 'express-validator';
import { confirmEmail, login, retrieveEmailConfirmationCache, retrieveUser, signup } from '../controllers/auth';
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
            })
            .catch(e => {console.error(e.stack); return res.status(500).json("An unexpected error has occured.")});
    });

authRouter.post('/signup',
    body('email').isEmail(),
    body('password').isLength({min: 8}),
    body('newsletter').isBoolean(),
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
                
                signup(req.body.email, req.body.password, req.body.newsletter)
                    .then(st => {
                        if (!st.success) {
                            return res.status(500).json({success: false, msg: "Internal server error"});
                        }

                        return res.status(200).json({success:true, token: st.token, user: new User(req.body.email, '').toFrontend()});
                    });
            })
            .catch(e => {console.error(e.stack); return res.status(500).json("An unexpected error has occured.")});
    });

authRouter.get('/confirmEmail',
    check('email').isEmail(),
    check('key').isUUID(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success: false, msg: "Invalid request", errors: errors.array()});
        }

        retrieveEmailConfirmationCache(req.query!.email, req.query!.key)
            .then(ecc => {
                if (ecc === undefined) {
                    return res.status(401).json({success: false, msg: "Ce lien n'est plus valide"});
                }

                confirmEmail(ecc.email, ecc.validUntil)
                    .then(st => {
                        if (!st.success) {
                            return res.status(401).json({success: false, msg: "Ce lien n'est plus valide"})
                        }

                        return res.status(200).json({success:true, token: st.token})
                    });
            })
            .catch(e => {console.error(e.stack); return res.status(500).json("An unexpected error has occured.")});
    });

export default authRouter;