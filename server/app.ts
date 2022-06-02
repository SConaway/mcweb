import express from 'express';

import cookieParser from 'cookie-parser';
import logger from 'morgan';
import helmet from 'helmet';

import path from 'path';

import _debug from 'debug';

const debug = _debug('app');

import send from './routes/send';
import list from './routes/list';

import getConfig from './lib/getConfig';

const app = express();

app.use(logger('dev'));
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/send', send);
app.use('/list', list);

app.use((_req, res, _next) => {
    res.status(404).send("Sorry can't find that!");
});

// quit if no config file
if (!getConfig()) {
    // print message and quit
    debug('No config file found. Please create one.');
    process.exit(1);
}

export default app;
