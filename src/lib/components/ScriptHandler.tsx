"use client";
import { useEffect, useState } from "react";
import { streamFetch } from "@/lib/utils";

export default function ScriptHandler(props: { script: string; key?: any }) {
    const scriptEndpointURL = `/api/script?name=${encodeURI(props.script)}`;
    const [isPending, setIsPending] = useState<boolean>(false);
    const [lines, setLines] = useState<string[]>([]);

    const checkIfIsPending = async () => {
        const res = await fetch(scriptEndpointURL);
        const status = await res.json();
        if (typeof status !== "boolean") return;
        setIsPending(status);
        if (status) {
            setTimeout(checkIfIsPending, 5000);
        }
    };

    const runScript = async () => {
        if (isPending) return;
        setIsPending(true);
        setLines([]);
        const it = streamFetch(scriptEndpointURL, { method: "POST" });
        for await (const value of it) {
            setLines((prev) => [...prev, value]);
        }
        checkIfIsPending();
    };

    useEffect(() => {
        checkIfIsPending();
    }, []);

    return (
        <div key={props.key}>
            {props.script}
            {isPending && <small>:Pending...</small>}
            {!isPending && <button onClick={runScript}>Run</button>}

            <pre>{lines}</pre>
        </div>
    );
}
