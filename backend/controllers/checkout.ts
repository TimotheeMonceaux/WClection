import Stripe from "stripe";

export function onCheckoutSessionCompleted(session: Stripe.Event.Data.Object) {
    console.log(session);
    console.log('SAVE COMPLETED ORDER TO DB');
    console.log('SEND RECEIPT EMAIL TO CLIENT');
}