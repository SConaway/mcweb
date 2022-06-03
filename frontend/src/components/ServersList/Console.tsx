import { useState } from "react";

import { IServer } from "../../types";

interface IEntry {
    message: string;
    cr: "command" | "response";
}

export default function Console({
    server,
    index,
    show,
}: {
    server: IServer;
    index: number;
    show: boolean;
}) {
    const [entries, setEntries] = useState<IEntry[]>([]);

    const [currentInput, setCurrentInput] = useState("");

    const showClass = show ? "block" : "hidden";

    const handleCommandRun = async () => {
        const command = currentInput;

        setCurrentInput("");

        if (!command) return;

        setEntries((c) => [...c, { message: command, cr: "command" }]);

        const response = await fetch("/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                server: index,
                command,
            }),
        });

        const data = await response.text();

        setEntries((c) => [...c, { message: data, cr: "response" }]);
    };

    return (
        <div className={`${showClass} border-2 rounded-lg mt-2`}>
            <div className="min-h-[50px] max-h-[50vh] overflow-auto m-4 pr-4">
                {entries.map((entry, index) => (
                    <div key={index}>
                        {entry.cr === "command" && <hr />}
                        <p
                            className={`text-gray-800 mx-2 overflow-auto break-words ${
                                entry.cr === "command"
                                    ? "text-right mt-2"
                                    : "text-left mb-2"
                            }`}
                        >
                            {entry.message}
                        </p>
                        {entry.cr === "response" && <hr />}
                    </div>
                ))}
            </div>

            <div className="flex justify-between m-4">
                <input
                    className="block w-3/4 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    type="text"
                    placeholder="Type a command..."
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            handleCommandRun();
                        }
                    }}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    value={currentInput}
                />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                        handleCommandRun();
                    }}
                >
                    Run
                </button>
            </div>
        </div>
    );
}
