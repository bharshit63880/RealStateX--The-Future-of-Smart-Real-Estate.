import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { corsOptions } from './config/cors.js';
import { config } from './config/index.js';
import routes from './routes/index.js';
import { errorHandler } from './shared/middleware/error-handler.js';
import { notFoundHandler } from './shared/middleware/not-found-handler.js';
import { requestId } from './shared/middleware/request-id.js';
import { httpLogger } from './shared/logger/index.js';

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', 1);

app.use(requestId);
app.use(httpLogger);
app.use(helmet());
app.use(cors(corsOptions));
app.use(compression());
app.use(cookieParser(config.cookieSecret));
app.use(express.json({ limit: config.requestBodyLimit }));
app.use(express.urlencoded({ extended: true, limit: config.requestBodyLimit }));
app.use(
  rateLimit({
    standardHeaders: true,
    legacyHeaders: false,
    windowMs: config.rateLimit.windowMs,
    limit: config.rateLimit.max,
  }),
);

app.use(`/api/${config.apiVersion}`, routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
