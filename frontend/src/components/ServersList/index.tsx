import { useState, useEffect } from "react";
import { IServer } from "../../types";

import Server from "./Server";

import { errorToast } from "../../utilities/errorToast";

export default function ServersList() {
    const [servers, setServers] = useState<IServer[]>([]);

    const loadData = () => {
        fetch("/list")
            .then((res) => res.json())
            .then((data) => setServers(data))
            .catch((err) => {
                console.log("err", err);
                errorToast(`Error fetching servers: ${err}`);
            });
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="container p-4 mx-auto">
            <div
                className={`flex justify-between items-center bg-white px-4 py-2 mx-auto mt-2 mb-4 min-h-[12vh] max-w-2xl border-2 rounded-lg`}
            >
                <button
                    className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
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
