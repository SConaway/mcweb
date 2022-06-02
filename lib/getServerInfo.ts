import sendCommand from './sendCommand';
import getConfig from './getConfig';

const parseList = (input: string) => {
    // console.log(input);

    const maxPlayers = Number(input.split('max of ')[1]?.split(' players')[0]);

    let players: String[] = [];

    const playersString = input.split('players online: ')[1];

    if (playersString) {
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
        return {
            ...parseList(await send('list')),
        };
    } catch (err) {
        return {offline: true, err};
    }
}
