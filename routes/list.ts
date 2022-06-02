import express from 'express';

import {StatusCodes} from 'http-status-codes';

import getConfig from '../lib/getConfig';

const router = express.Router();

router.get('/', async function (_req, res, _next) {
    const config = getConfig();

    const servers = config.servers.map((server) => server.name);

    res.status(StatusCodes.OK).send(servers);
});

export default router;
