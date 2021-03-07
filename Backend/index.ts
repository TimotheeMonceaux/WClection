import express from 'express';
import { Pool } from 'pg';

const app = express();
const PORT = 8000;

app.get('/', (req, res) => res.send('Hello, World!'));

const client =new Pool();
client.connect();
client.query('SELECT * FROM "auth"."Users"', (err, res) => {
  console.log(err ? err.stack : res) // Hello World!
  client.end()
});

app.listen(PORT, () => {
  console.log(`Server is running at https://localhost:${PORT}`);
});