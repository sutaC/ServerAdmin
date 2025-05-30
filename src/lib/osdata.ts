"use system";
import os from "os";

export async function getHostname() {
    return os.hostname();
}

export async function getMemUse() {
    return (
        Math.floor(
            (((os.totalmem() - os.freemem()) * 100) / os.totalmem()) * 100
        ) / 100
    );
}

export async function getUptime() {
    return Math.floor(os.uptime());
}
