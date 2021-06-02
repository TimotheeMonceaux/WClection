import _ from 'lodash';

import { query, update, upsert, log, delete_ } from "../db";
import CartItem from "../models/shop/cartItem";

export async function getCartFromDb(email: string): Promise<Array<CartItem>> {
    const rows = await query('SELECT * FROM shop."CartItems" WHERE "UserEmail"=$1', [email]);
    const cart = rows.map(r => new CartItem(r.ProductId, r.Quantity, r.UserEmail, r.CreateDate));
    log("GET_CART", email, "Success", {cart: rows.length});
    return cart;
}

export async function clearCartInDb(email: string): Promise<boolean> {
    const res = await delete_('shop."CartItems"', [['"UserEmail"', email]]);
    log('CLEAR_CART', email, 'Success');
    return res;
}

export async function addItemToDb(productId: number, quantity: number, email: string): Promise<boolean> {
    const res = await upsert(new CartItem(productId, quantity, email), ['"UserEmail"', '"ProductId"'], [['"Quantity"', 'excluded."Quantity" + "CartItems"."Quantity"'], ['"CreateDate"', 'excluded."CreateDate"']]);
    log('UPSERT_CART', email, 'Success', {productId, quantity});
    return res;
}

export async function setItemToDb(productId: number, quantity: number, email: string): Promise<boolean> {
    const res = await update('shop."CartItems"', [['"UserEmail"', email], ['"ProductId"', productId.toString()]], [['"Quantity"', quantity.toString()]]);
    log('SET_CART', email, 'Success', {productId, quantity});
    return res;
}

export async function deleteItemFromDb(productId: number, email: string): Promise<boolean> {
    const res = await delete_('shop."CartItems"', [['"UserEmail"', email], ['"ProductId"', productId.toString()]]);
    log('DELETE_CART', email, 'Success', {productId});
    return res;
}

export function addItemToSession(productId: number, quantity: number, session: Express.session.Session) {
    if (session.cart === undefined)
        session.cart = {};
    
    session.cart = {...session.cart, [productId]: (session.cart[productId] ?? 0) + quantity};
}

export function setItemToSession(productId: number, quantity: number, session: Express.session.Session) {
    if (session.cart === undefined)
        session.cart = {};
    
    session.cart = {...session.cart, [productId]: quantity};
}

export function deleteItemFromSession(productId: number, session: Express.session.Session) {
    if (session.cart === undefined)
        session.cart = {};
    
    session.cart = _.omit(session.cart, productId);
}