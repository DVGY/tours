import express, { Response, Request, NextFunction } from 'express';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import * as dotenv from 'dotenv';

import tripsRouter from './routes/tripsRoutes';
import usersRouter from './routes/usersRoutes';
import reviewsRouter from './routes/reviewsRoutes';
import { errorHandler } from './utils/errorHandler';
import { sanitize } from 'express-mongo-sanitize';

const app = express();

dotenv.config({ path: './config.env' });

app.use(helmet());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// Allow 100 request per hour from same IP

const options: rateLimit.Options = {
  windowMs: 60000, // 1 minute
  max: 5,
  message: 'Too many request from this IP. Try later',
};

const limiter = rateLimit(options);

app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));

app.use(mongoSanitize());

app.use(xss());

app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
  });
});

app.use('/api/v1/trips', tripsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/reviews', reviewsRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    status: 'fail',
    message: `can't find ${req.originalUrl} on this server !!!`,
  });
});

app.use(errorHandler);

export { app };
