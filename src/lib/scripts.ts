"use server";
import { spawn } from "child_process";
import fs from "fs/promises";
import path from "path";

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
