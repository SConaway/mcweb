import sendCommand from './sendCommand';
import getConfig from './getConfig';

export default async function (serverNum: number) {
    const config = getConfig();

    const serverInfo = config.servers[serverNum];

    if (!serverInfo) {
        throw new Error('No server found with that number');
    }

    const send = async (command: string) =>
        await sendCommand(
            command,
            serverInfo.host,
            serverInfo.port,
            serverInfo.password,
        );

    try {
        const players = await send('list');

        const maxPlayers = await send('maxplayers');

        return {
            players,
            maxPlayers,
        };
    } catch {
        return {offline: true};
    }
}
