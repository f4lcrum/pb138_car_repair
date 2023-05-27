import express from 'express';
import cors from 'cors';
import { config as configEnvVariables } from 'dotenv';
import { env } from 'process';
import type { ApiResponse } from './controllers/types';
import vehicle from './routes/vehicle';
import fault from './routes/fault';
import user from './routes/user';

import cookieParser from 'cookie-parser';
import type { Role } from '@prisma/client';
import session from './middleware/sessionMiddleware';
import authRouter from './routes/auth';
declare module 'express-session' {
  interface SessionData {user: {email: string, role: Role}}
};


configEnvVariables();
const app = express();
// const port = env.PORT ?? 3000; povodny kod v DEV, zakomentovane preto lebo to hadzalo chybu
const port = env.PORT ?? 3000;
// JSON middleware
app.use(express.json());
app.use(cookieParser());
// CORS middlware
// TODO: what is ORIGIN in our case - PORT 8080?
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(session());


// parse URL encoded strings
app.use(express.urlencoded({ extended: true }));

// DO NOT MODIFY THE PRECEDING code ^^
app.use('/auth', authRouter);
app.use('/', vehicle);
app.use('/', fault);
app.use('/', user);

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
