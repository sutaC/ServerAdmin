"use client";
import styles from "./ScriptManager.module.css";
import { useEffect, useRef, useState } from "react";
import { streamFetch } from "@/lib/utils";

export default function ScriptManager(props: { script: string }) {
    const scriptEndpointURL = `/api/script?name=${encodeURI(props.script)}`;
    const [isPending, setIsPending] = useState<boolean>(false);
    const [lines, setLines] = useState<string[]>([]);
    const outputRef = useRef<HTMLDivElement>(null);

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
            if (outputRef.current)
                outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
        checkIfIsPending();
    };

    useEffect(() => {
        checkIfIsPending();
    }, []);

    return (
        <div className={styles.script}>
            <div className={styles.topbar}>
                <span className={styles.name}>{props.script}</span>
                <div>
                    {isPending && <i className="spinner" />}
                    {!isPending && <button onClick={runScript}>Run</button>}
                    {!isPending && (
                        <button
                            disabled={lines.length === 0}
                            onClick={() => setLines([])}
                        >
                            Clear
                        </button>
                    )}
                </div>
            </div>
            <div className={styles.output} ref={outputRef}>
                {lines.map((line, idx) => (
                    <span key={idx}>{line}</span>
                ))}
            </div>
        </div>
    );
}
