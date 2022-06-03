import { useState } from "react";

import Console from "./Console";

import { IServer } from "../../types";

export default function Server({
    server,
    index,
}: {
    server: IServer;
    index: number;
}) {
    const [showPlayers, setShowPlayers] = useState(false);
    const [showConsole, setShowConsole] = useState(false);

    return (
        <div className="flex flex-col bg-white p-4 mx-auto mt-2 mb-4 min-h-[100px] max-w-xl border-2 rounded-lg">
            <div>
                <p className="text-2xl text-center">{server.name}</p>
            </div>

            {!server.offline ? (
                <>
                    <div
                        onClick={() =>
                            server.players.length > 0 &&
                            setShowPlayers(!showPlayers)
                        }
                    >
                        <p className="text-gray-800 hover:text-blue-500 hover:underline underline-offset-4">
                            Players: {server.players.length}/{server.maxPlayers}
                        </p>

                        {showPlayers && server.players.length > 0 && (
                            <div className="px-8 py-2 border-2 rounded-md">
                                <ol className="list-decimal">
                                    {server.players.map((player, index) => (
                                        <li
                                            key={index}
                                            className="text-gray-600"
                                        >
                                            {player}
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        )}
                    </div>

                    <div>
                        <p
                            className="text-gray-800 hover:text-blue-500 hover:underline underline-offset-4"
                            onClick={() => setShowConsole(!showConsole)}
                        >
                            {showConsole ? "Hide" : "Show"} Console
                        </p>

                        <Console
                            show={showConsole}
                            server={server}
                            index={index}
                        />
                    </div>
                </>
            ) : (
                <div className="text-center">
                    <p className="text-red-500">Server is offline: </p>
                    <p className="text-red-500 text-xs font-mono mx-4">
                        {JSON.stringify(server.err, null, 2)}
                    </p>
                </div>
            )}
        </div>
    );
}
