import express from 'express';

import {StatusCodes} from 'http-status-codes';

import getConfig from '../lib/getConfig';
import getServerInfo from '../lib/getServerInfo';

const router = express.Router();

router.get('/', async function (_req, res, _next) {
    const config = getConfig();

    let servers: any[] = [];

    // for each server, get the info and add it to the list
    for (let i = 0; i < config.servers.length; i++) {
        const server = config.servers[i];

        if (!server) continue;

        const status = await getServerInfo(i);

        console.log(status);

        servers.push({name: server.name, ...status});
    }

    res.status(StatusCodes.OK).send(servers);
});

export default router;
