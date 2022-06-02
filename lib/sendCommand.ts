import {Rcon as RCON} from 'rcon-client';

type ServerRes = string;

export default async function (
    command: string,
    host: string,
    port: number,
    password: string,
): Promise<ServerRes> {
    let rcon;
    try {
        rcon = await RCON.connect({
            host,
            port,
            password,
        });

        const res = await rcon.send(command);

        rcon.end();

        return res;
    } catch (err: any) {
        rcon && rcon.end();

        throw err;
    }
}
