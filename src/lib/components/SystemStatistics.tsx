"use client";
import styles from "./SystemStatistics.module.css";
import { useEffect, useRef, useState } from "react";

export default function SystemStatistics(props: {
    hostname: string;
    uptime: number;
    memuse: number;
}) {
    const [uptime, setUptime] = useState<number>(props.uptime);
    const updateUptime = () => {
        setUptime((prev) => prev + 1);
        setTimeout(updateUptime, 1000);
    };
    useEffect(updateUptime, []);

    const memuseBarRef = useRef<HTMLElement>(null);
    const [memuse, setMemuse] = useState<number>(props.memuse);
    useEffect(() => {
        const updateMemuse = async () => {
            const res = await fetch("/api/memuse");
            const value = Number.parseFloat(await res.text());
            if (!Number.isNaN(value)) {
                setMemuse(value);
                memuseBarRef.current?.style.setProperty("--_size", `${value}%`);
            } else {
                console.warn("Invalid memuse value recieved:", value);
            }
            setTimeout(updateMemuse, 3000);
        };
        updateMemuse();
    }, []);

    return (
        <ul className={styles.stats}>
            <li>
                <span>Hostname:</span>
                <i className={styles.line} />
                <span>{props.hostname}</span>
            </li>
            <li>
                <span>Uptime:</span>
                <i className={styles.line} />
                <span>
                    {Math.floor(uptime / 86400)}d{" "}
                    {Math.floor((uptime / 3600) % 24)}h{" "}
                    {Math.floor((uptime / 60) % 60)}m {Math.floor(uptime % 60)}s
                </span>
            </li>
            <li>
                <span>Memuse:</span>
                <i className={styles.line} />
                <span className={styles.bar} ref={memuseBarRef}>
                    <span>{memuse}%</span>
                </span>
            </li>
        </ul>
    );
}
