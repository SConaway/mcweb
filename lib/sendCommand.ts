import {Rcon as RCON} from 'rcon-client';

type ServerResSuccess = {
    res: string;
    success: true;
};

type ServerResError = {
    err: string;
    success: false;
};

type ServerRes = ServerResSuccess | ServerResError;

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

        return {res, success: true};
    } catch (err: any) {
        rcon && rcon.end();

        if (err instanceof Error) return {err: err.message, success: false};
        else return {err: err, success: false};
    }
}
