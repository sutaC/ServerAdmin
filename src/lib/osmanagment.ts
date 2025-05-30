"use server";
import fs from "fs/promises";
import path from "path";
import os from "os";
import { exec, spawn } from "child_process";
import { SERVICE_ACTION, SERVICE_ACTIONS } from "@/lib/utils";

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

export async function getScripts(): Promise<string[]> {
    return await fs.readdir("./scripts");
}

export async function executeScript(script: string) {
    const scripts = await getScripts();
    if (!scripts.includes(script)) throw Error("Invalid script name");
    const cmd = path.join("./scripts/", script);
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
        start(controller) {
            const child = spawn(cmd);
            child.stdout.on("data", (data) => {
                controller.enqueue(encoder.encode(data.toString()));
            });
            child.stderr.on("data", (data) => {
                controller.enqueue(encoder.encode(`ERROR: ${data.toString()}`));
            });
            child.on("close", () => {
                controller.close();
            });
            child.on("error", (err) => {
                controller.enqueue(encoder.encode(`ERROR: ${err.message}\n\n`));
                controller.close();
            });
        },
    });
    return stream;
}

export async function getAvaliableServices(): Promise<string[]> {
    const file = await fs.open("services.json");
    const content = (await file.readFile()).toString();
    await file.close();
    return JSON.parse(content);
}

export async function manageService(service: string, action: SERVICE_ACTION) {
    const services = await getAvaliableServices();
    if (!services.includes(service)) throw Error("Invalid service");
    if (!SERVICE_ACTIONS.includes(action)) throw Error("Invalid action");
    return new Promise<string>((resolve, reject) => {
        exec(`systemctl ${action} ${service}`, (err, stdout, stderr) => {
            if (err) reject(err);
            if (stderr) reject(stderr);
            resolve(stdout);
        });
    });
}
