import express from 'express';

import cookieParser from 'cookie-parser';
import logger from 'morgan';
import helmet from 'helmet';

import path from 'path';
import {fileURLToPath} from 'url';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use(logger('dev'));
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

export default app;
