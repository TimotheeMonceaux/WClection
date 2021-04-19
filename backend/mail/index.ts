import nodemailer from 'nodemailer';
import { log } from '../db';

declare var process : {
    env: {
        SMTPHOST: string,
        SMTPPORT: number,
        SMTPUSER: string,
        SMTPPASSWORD: string
    }
}

const transporter = nodemailer.createTransport({
    host: process.env.SMTPHOST,
    port: process.env.SMTPPORT,
    secure: false,
    logger: true,
    auth: {
        user: process.env.SMTPUSER,
        pass: process.env.SMTPPASSWORD
    }
});

export class EmailParameters {
    constructor(
        public from: string,
        public to: string,
        public subject: string,
        public text: string,
        public html: string) {}
}

export async function sendMail(params: EmailParameters): Promise<string> {
    try {
        const start = Date.now();
        const info = await transporter.sendMail({
            from: params.from, 
            to: params.to,
            subject: params.subject,
            text: params.text,
            html: params.html
        });
        const duration = Date.now() - start;
        log("EMAIL", params.to, "Success", {duration, from: params.from, text: params.text});
        return '';
    }
    catch(error) {
        log("EMAIL", params.to, "Error", {text: params.text});
        return error;
    }
}