import express from 'express';
import cors from 'cors';
import { config as configEnvVariables } from 'dotenv';
import { env } from 'process';
import cookieParser from 'cookie-parser';
import type { Role } from '@prisma/client';
import vehicle from './routes/vehicle';
import fault from './routes/fault';
import user from './routes/user';
import admin from './routes/admin';
import session from './middleware/sessionMiddleware';
import auth from './routes/auth';
import brand from './routes/brand';
import { notFoundRequestResponse } from './repositories/common/responses';

declare module 'express-session' {
  interface SessionData {user: { id: string, role: Role }}
}

configEnvVariables();
const app = express();
const port = env.PORT ?? 3000;
// JSON middleware
app.use(express.json());
app.use(cookieParser());
// CORS middlware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(session());

// parse URL encoded strings
app.use(express.urlencoded({ extended: true }));

// DO NOT MODIFY THE PRECEDING code ^^
app.use('/', auth);
app.use('/', vehicle);
app.use('/', fault);
app.use('/', user);
app.use('/', admin);
app.use('/', brand);

app.use((_req, res) => notFoundRequestResponse(res));

// env.NODE_ENV
app.listen(port, () => {
  console.log(
    `[${new Date().toISOString()}] RESTful API for SERVICE BOOK is listening on port ${port}`,
  );
});

export default app;
