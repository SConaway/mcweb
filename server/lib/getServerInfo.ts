import sendCommand from './sendCommand.js';
import getConfig from './getConfig.js';

import _debug from 'debug';

const debug = _debug('app:getServerInfo');

const parseList = (input: string) => {
    const maxPlayers = Number(input.split('max of ')[1]?.split(' players')[0]);

    let players: String[] = [];

    const playersString = input.split('players online: ')[1];

    // if players
    if (playersString && playersString !== '\n') {
        players = playersString.split(', ');
    }

    return {
        maxPlayers,
        players,
    };
};

export default async function (serverNum: number) {
    const config = getConfig();

    const serverInfo = config.servers[serverNum];

    if (!serverInfo) {
        debug('No server found with that number');
        throw new Error('No server found with that number');
    }

    debug('Getting server info for server:', serverInfo.name);

    const send = async (command: string) =>
        await sendCommand(
            command,
            serverInfo.host,
            serverInfo.port,
            serverInfo.password,
        );

    try {
        const list = parseList(await send('list'));

        debug(`Got server info for server ${serverInfo.name}:`);
        debug(list);

        return {
            ...list,
        };
    } catch (err) {
        return {offline: true, err};
    }
}
