import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth';
import carouselRouter from './routes/carousel';
import collectionRouter from './routes/collection';
import cartRouter from './routes/cart';
import checkoutRouter from './routes/checkout';
import User from './models/auth/user';

const app = express();
const PORT = 8000;

declare var process : {
  env: {
    WCLECTIONENV: 'PROD' | 'LOCAL',
    SESSIONSECRET: string
  }
}

export const BASE_URL = process.env.WCLECTIONENV === 'PROD' ? 'http://wclection.com' : 'http://localhost:3000';

app.use(cors({
  origin: BASE_URL,
  credentials: true,
  optionsSuccessStatus: 200 
}));

app.use(cookieParser(process.env.SESSIONSECRET));
declare global {
  namespace Express.session {
    class Session {
      user?: User;
      cart?: {[productId: number]: number};
      updateDate?: Date;
    }
    interface SessionData {}
  }
}
app.use(session({
  secret: process.env.SESSIONSECRET,
  resave: false,
  saveUninitialized: false,
  name: 'wclectionSession',
  cookie: {
    path: '/', 
    httpOnly: true, 
    secure: false, 
    maxAge: 60 * 60 * 1000
  }
}));

app.use((req, res, next) => req.originalUrl !== "/api/checkout/webhook" ? bodyParser.json()(req, res, next) : next());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/auth', authRouter);
app.use('/api/carousel', carouselRouter);
app.use('/api/collection', collectionRouter);
app.use('/api/cart', cartRouter);
app.use('/api/checkout', checkoutRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});