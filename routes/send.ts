import express from 'express';

import {StatusCodes} from 'http-status-codes';

import send from '../lib/sendCommand';
import getConfig from '../lib/getConfig';

var router = express.Router();

router.get('/', async function (req, res, _next) {
    const command = req.body.command as string;
    const serverNum = req.body.server as number;

    if (!command) {
        res.status(StatusCodes.BAD_REQUEST).send('No command specified');
        return;
    }

    if (!serverNum) {
        res.status(StatusCodes.BAD_REQUEST).send('No server specified');
        return;
    }

    const config = getConfig();

    const serverInfo = config.servers[serverNum];

    if (!serverInfo) {
        res.status(StatusCodes.BAD_REQUEST).send(
            'No server found with that number',
        );
        return;
    }

    try {
        const serverRes = await send(
            command,
            serverInfo.host,
            serverInfo.port,
            serverInfo.password,
        );
        res.status(StatusCodes.OK).send(serverRes);
    } catch (err) {
        res.status(StatusCodes.BAD_GATEWAY).send(String(err));
    }
});

export default router;
