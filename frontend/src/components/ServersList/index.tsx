import { useState, useEffect } from "react";
import { IServer } from "../../types";

import Server from "./Server";

export default function ServersList() {
    const [servers, setServers] = useState<IServer[]>([]);

    const loadData = () => {
        fetch("/list")
            .then((res) => res.json())
            .then((data) => setServers(data))
            .catch((err) => console.log("err", err));
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <div
                className={`flex justify-between items-center bg-white px-4 py-2 mx-auto mt-2 mb-4 min-h-[12vh] max-w-2xl border-2 rounded-lg`}
            >
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={loadData}
                >
                    Refresh
                </button>

                <p className="text-gray-600">
                    {servers.length}{" "}
                    {servers.length === 1 ? "Server" : "Servers"}
                </p>
            </div>

            {servers.map((server, index) => (
                <Server server={server} index={index} key={index} />
            ))}
        </div>
    );
}
