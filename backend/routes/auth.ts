import express from 'express';
import { body, validationResult } from 'express-validator';

import { confirmEmail, login, retrieveEmailConfirmationCache, retrieveLastEmailConfirmationCache, setupSignupConfirm, retrieveUser, signup, forgotPassword, retrieveForgotPasswordCache, retrieveLastForgotPasswordCache, resetPassword, setupForgotPassword } from '../controllers/auth';
import { log } from '../db';
import User from '../models/auth/user';

const authRouter = express.Router();

authRouter.get('/session', (req, res) => {
    if (req.session.user === undefined) {
        log('SESSION', undefined, 'Error');
        return res.status(200).json({success: false});
    }
    log('SESSION', req.session.user.email, 'Success');
    return res.status(200).json({success: true, user: req.session.user});
});

authRouter.post('/login',
    body('email').isEmail(),
    body('password').isLength({min: 8}),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success: false, msg: "Invalid request", errors: errors.array()});
        }

        try {
            const usr = await retrieveUser(req.body.email);
            if (usr === undefined) {
                return res.status(401).json({success: false, msg: "Email inconnu"});
            }
    
            const st = await login(usr!, req.body.password, req.session);
            if (!st) {
                return res.status(401).json({success: false, msg: "Mot de passe incorrect"});
            }
            return res.status(200).json({success: true, user: usr!.toFrontend()});
        } 
        catch (e) {
            console.error(e.stack);
            return res.status(500).json("An unexpected error has occured.");
        }
    });

authRouter.post('/signup',
    body('email').isEmail(),
    body('password').isLength({min: 8}),
    body('newsletter').isBoolean(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success: false, msg: "Invalid request", errors: errors.array()});
        }

        try {
            const usr = await retrieveUser(req.body.email);
            if (usr !== undefined) {
                return res.status(401).json({success: false, msg: "Cet email est déjà utilisé"});
            }

            const st = await signup(req.body.email, req.body.password, req.body.newsletter, req.session);
            if (!st) {
                return res.status(500).json({success: false, msg: "Internal server error"});
            }
            return res.status(200).json({success:true, user: new User(req.body.email, '').toFrontend()});
        }
        catch (e) {
            console.error(e.stack);
            return res.status(500).json("An unexpected error has occured.");
        }
    });

authRouter.post('/confirmEmail',
    body('email').isEmail(),
    body('key').isUUID(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success: false, msg: "Invalid request.", errors: errors.array()});
        }

        try {
            const ecc = await retrieveEmailConfirmationCache(req.body.email, req.body.key);
            if (ecc === undefined) {
                return res.status(401).json({success: false, msg: "Ce lien n'est pas valide."});
            }

            const st = await confirmEmail(ecc.email, ecc.validUntil, req.session);
            if (!st.success) {
                return res.status(401).json({success: false, msg: "Ce lien n'est plus valide."})
            }
            return res.status(200).json(st);
        }
        catch (e) {
            console.error(e.stack);
            return res.status(500).json("An unexpected error has occured.");
        }
    });

authRouter.post('/resendConfirmEmail',
    body('email').isEmail(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success: false, msg: "Invalid request.", errors: errors.array()});
        }

        try {
            const ecc = await retrieveLastEmailConfirmationCache(req.body.email);
            if (ecc !== undefined && (Date.now() - new Date(ecc.createDate!).getTime()) < 60000) {
                return res.status(401).json({success: false, msg: "Veuillez attendre au moins une minute entre deux envois."});
            }
            await setupSignupConfirm(req.body.email);
            return res.status(200).json({success:true, msg: "Email envoyé !"})
        }
        catch (e) {
            console.error(e.stack);
            return res.status(500).json("An unexpected error has occured.");
        }
    });

authRouter.post('/forgotPassword',
    body('email').isEmail(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success: false, msg: "Invalid request.", errors: errors.array()});
        }

        try {
            const usr = await retrieveUser(req.body.email);
            if (usr === undefined) {
                return res.status(401).json({success: false, msg: "Cet email ne correspond à aucun compte"});
            }

            const st = await forgotPassword(req.body.email);
            if (!st) {
                return res.status(500).json({success: false, msg: "Internal server error"});
            }
            return res.status(200).json({success: true});
        }
        catch (e) {
            console.error(e.stack);
            return res.status(500).json("An unexpected error has occured.");
        }
    });

authRouter.post('/resendForgotPassword',
    body('email').isEmail(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success: false, msg: "Invalid request.", errors: errors.array()});
        }

        try {
            const ecc = await retrieveLastForgotPasswordCache(req.body.email);
            if (ecc !== undefined && (Date.now() - new Date(ecc.createDate!).getTime()) < 60000) {
                return res.status(401).json({success: false, msg: "Veuillez attendre au moins une minute entre deux envois."});
            }
            await setupForgotPassword(req.body.email);
            return res.status(200).json({success:true, msg: "Email envoyé !"})
        }
        catch (e) {
            console.error(e.stack);
            return res.status(500).json("An unexpected error has occured.");
        }
    });

authRouter.post('/resetPassword',
    body('email').isEmail(),
    body('password').isLength({min: 8}),
    body('key').isUUID(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success: false, msg: "Invalid request", errors: errors.array()});
        }

        try {
            const usr = await retrieveUser(req.body.email);
            if (usr === undefined) {
                return res.status(401).json({success: false, msg: "Ce lien n'est pas valide."});
            }
            
            const fpc = await retrieveForgotPasswordCache(req.body.email, req.body.key);
            if (fpc === undefined) {
                return res.status(401).json({success: false, msg: "Ce lien n'est pas valide."});
            }

            const st = await resetPassword(req.body.email, req.body.password, fpc.validUntil, req.session);
            if (!st.success) {
                return res.status(401).json({success: false, msg: "Ce lien n'est plus valide."});
            }
            return res.status(200).json({success:true, user: new User(req.body.email, '').toFrontend()});
        }
        catch (e) {
            console.error(e.stack);
            return res.status(500).json("An unexpected error has occured.");
        }
    });

authRouter.post('/logout', (req, res) => {
    log('LOGOUT', req.session.user?.email, 'Success');
    req.session.user = undefined;
    req.session.updateDate = new Date();
    return res.status(200).json({success: true});
});

export default authRouter;