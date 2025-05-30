"use client";

import { useEffect, useState } from "react";

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

    const [memuse, setMemuse] = useState<number>(props.memuse);
    const updateMemuse = async () => {
        const res = await fetch("/api/memuse");
        const value = await res.text();
        try {
            setMemuse(Number.parseFloat(value));
        } catch (error) {
            console.warn(error);
        }
        setTimeout(updateMemuse, 3000);
    };
    useEffect(() => {
        updateMemuse();
    }, []);

    return (
        <ul>
            <li>Hostname: {props.hostname}</li>
            <li>
                Uptime: {Math.floor(uptime / 86400)}d{" "}
                {Math.floor(uptime / 3600)}h {Math.floor(uptime / 60)}m{" "}
                {Math.floor(uptime % 60)}s
            </li>
            <li>Memuse: {memuse}%</li>
        </ul>
    );
}
