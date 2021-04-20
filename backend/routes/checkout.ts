import bodyParser from 'body-parser';
import express from 'express';
import Stripe from 'stripe';
import { onCheckoutSessionCompleted } from '../controllers/checkout';

import { BASE_URL } from '../index';

declare var process : {
    env: {
        STRIPESK: string,
        STRIPEWEBHOOKSECRET: string
    }
}
const stripe = new Stripe(process.env.STRIPESK, {apiVersion: '2020-08-27'});

const checkoutRouter = express.Router();

function getLineItems(session: Express.session.Session): Array<Stripe.Checkout.SessionCreateParams.LineItem> {
    return [
        {
            price_data: {
                currency: 'eur',
                product_data: {
                    name: 'WClection Sticker',
                    images: ['https://www.efl.fr/actualites/img/QUOTI-20170419-UNE-social2.jpg']
                },
                unit_amount_decimal: '1999'
            },
            quantity: 2
        }
    ];
}

checkoutRouter.post('/',
    async (req, res) => {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: getLineItems(req.session),
            mode: 'payment',
            success_url: `${BASE_URL}/checkoutSuccess`,
            cancel_url: `${BASE_URL}/checkoutCancel`
        });
        return res.status(200).json({success: true, sessionId: session.id});
    });

checkoutRouter.post('/webhook', bodyParser.raw({type: 'application/json'}),
    (req, res) => {
        const payload = req.body;
        const sig = req.headers['stripe-signature'];

        try {
            const event = stripe.webhooks.constructEvent(payload, sig!, process.env.STRIPEWEBHOOKSECRET);
            
            if (event.type === 'checkout.session.completed')
                onCheckoutSessionCompleted(event.data.object);
        } 
        catch (e) {
            console.log(e.message);
            return res.status(400).send(`Webhook Error: ${e.message}`);
        }
        res.status(200).json();
});

export default checkoutRouter;