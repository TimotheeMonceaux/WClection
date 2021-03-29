import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import authRouter from './routes/auth';
import carouselRouter from './routes/carousel';
import collectionRouter from './routes/collection';

const app = express();
const PORT = 8000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/auth', authRouter);
app.use('/api/carousel', carouselRouter);
app.use('/api/collection', collectionRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});