"use client";
import styles from "./ServiceManager.module.css";
import { useEffect, useState } from "react";
import { SERVICE_ACTION } from "@/lib/utils";

export default function ServiceManager(props: { service: string }) {
    const serviceEndpointURL = `/api/service?name=${encodeURI(props.service)}`;
    const [isActive, setIsActive] = useState<boolean>(true);
    const updateStatus = async () => {
        const res = await fetch(serviceEndpointURL);
        const data = await res.json();
        if (typeof data !== "boolean") return;
        setIsActive(data);
    };
    useEffect(() => {
        updateStatus();
    }, []);

    const [actionPending, setActionPending] = useState<boolean>(false);
    const performAction = async (action: SERVICE_ACTION) => {
        try {
            setActionPending(true);
            await fetch(`${serviceEndpointURL}&action=${encodeURI(action)}`, {
                method: "POST",
            });
            await updateStatus();
        } catch (error) {
            console.warn(error);
        } finally {
            setActionPending(false);
        }
    };

    return (
        <div className={styles.service}>
            <div className={styles.topbar}>
                <span className={styles.name}>{props.service}</span>
                <span>
                    Status:{" "}
                    <span
                        className={isActive ? styles.active : styles.inactive}
                    >
                        {isActive ? "Active" : "Inactive"}
                    </span>
                </span>
            </div>
            <div className={styles.controls}>
                <div>
                    <button onClick={updateStatus}>Refresh</button>
                    {isActive && (
                        <button
                            disabled={actionPending}
                            onClick={() => performAction("restart")}
                        >
                            Restart
                        </button>
                    )}
                    {isActive && (
                        <button
                            disabled={actionPending}
                            onClick={() => performAction("stop")}
                        >
                            Stop
                        </button>
                    )}
                    {!isActive && (
                        <button
                            disabled={actionPending}
                            onClick={() => performAction("start")}
                        >
                            Start
                        </button>
                    )}
                </div>
                {actionPending && <i className="spinner" />}
            </div>
        </div>
    );
}
