export interface IServerSuccess {
    name: string;
    maxPlayers: number;
    players: string[];
}

export interface IServerFailure {
    name: string;
    offline: true;
    err: any;
}

export interface IServer extends IServerSuccess, IServerFailure {}
