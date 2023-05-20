import express from 'express';
import cors from 'cors';
import { config as configEnvVariables } from 'dotenv';
import { env } from 'process';
import type { ApiResponse } from './controllers/types';

configEnvVariables();
const app = express();
// const port = env.PORT ?? 3000; povodny kod v DEV, zakomentovane preto lebo to hadzalo chybu
const port = env.PORT ?? 3000;

// CORS middlware
app.use(cors());

// JSON middleware
app.use(express.json());

// parse URL encoded strings
app.use(express.urlencoded({ extended: true }));

// DO NOT MODIFY THE PRECEDING code ^^

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.use((_req, res) => {
  const response: ApiResponse<{}> = {
    status: 'failure',
    data: {},
    error: 'No matching endpoint was found.',
  };

  return res.status(404).send(response);
});

// env.NODE_ENV
if (env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(
      `[${new Date().toISOString()}] RESTful API for SERVICE BOOK is listening on port ${port}`,
    );
  });
}

export default app;
