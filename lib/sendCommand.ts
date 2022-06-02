import {Rcon as RCON} from 'rcon-client';

import _debug from 'debug';

const debug = _debug('app:sendCommand');

type ServerRes = string;

export default async function (
    command: string,
    host: string,
    port: number,
    password: string,
): Promise<ServerRes> {
    // debug('Sending command:', command, 'to server:', host, ':', port);
    debug(`Sending command <${command}> to server ${host}:${port}`);

    let rcon;
    try {
        rcon = await RCON.connect({
            host,
            port,
            password,
        });

        const res = await rcon.send(command);

        debug(`Command <${command}> returned: <${res}>`);

        rcon.end();

        return res;
    } catch (err: any) {
        rcon && rcon.end();

        throw err;
    }
}
