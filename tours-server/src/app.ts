import express, { Response, Request, NextFunction } from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';

import tripsRouter from './routes/tripsRoutes';
import { errorHandler } from './utils/errorHandler';

const app = express();

dotenv.config({ path: './config.env' });

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
  });
});

app.use('/api/v1/trips', tripsRouter);
// app.use('/api/v1/users', userRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    status: 'fail',
    message: `can't find ${req.originalUrl} on this server !!!`,
  });
});

app.use(errorHandler);

export { app };
