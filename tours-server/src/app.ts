import express, { Response, Request, NextFunction } from 'express';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerUI from 'swagger-ui-express';

import tripsRouter from './routes/tripsRoutes';
import usersRouter from './routes/usersRoutes';
import reviewsRouter from './routes/reviewsRoutes';
import bookingsRouter from './routes/bookingsRoutes';
import { createBookingsStripeWebhook } from './controllers/bookingsController';
import { errorHandler } from './utils/errorHandler';
import { stripe } from './utils/stripe';
import docs from './api-docs';

const app = express();
const allowedOrigins = ['http://localhost:3000', /\.vercel\.app$/];

const corsoptions: cors.CorsOptions = {
  origin: allowedOrigins,
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'PATCH'],
  credentials: true,
};

app.enable('trust proxy');
app.use(cors(corsoptions));
app.use('*', (req: Request, res: Response, next: NextFunction) => {
  console.log('Origin: ', req.headers['origin']);
  next();
});
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// Allow 100 request per hour from same IP

const options: rateLimit.Options = {
  windowMs: 60000, // 1 minute
  max: 100,
  message: 'Too many request from this IP. Try later',
};

const limiter = rateLimit(options);

app.use('/api', limiter);

app.use(
  '/createBookingsStripeWebhook',
  express.raw({ type: 'application/json' }),
  createBookingsStripeWebhook
);

app.use(express.json({ limit: '10kb' }));

app.use(cookieParser());

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
app.get('/docker', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: 'Hi, I am inside docker and NGINX is looking after me',
  });
});
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));

app.use('/api/v1/trips', tripsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/reviews', reviewsRouter);
app.use('/api/v1/bookings', bookingsRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    status: 'fail',
    message: `can't find ${req.originalUrl} on this server !!!`,
  });
});

app.use(errorHandler);

export { app };
