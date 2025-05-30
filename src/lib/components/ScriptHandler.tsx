"use client";
import { useEffect, useState } from "react";

export default function ScriptHandler(props: { script: string; key?: any }) {
    const scriptEndpointURL = `/api/script?name=${encodeURI(props.script)}`;
    const [isPending, setIsPending] = useState<boolean>(false);

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
        const req = await fetch(scriptEndpointURL, { method: "POST" });
        if (!req.ok) console.error(req.statusText);
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
        </div>
    );
}
