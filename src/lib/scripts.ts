"use server";
import { exec } from "child_process";
import fs from "fs/promises";
import path from "path";

export async function getScripts(): Promise<string[]> {
    return await fs.readdir("./scripts");
}

export async function executeScript(script: string) {
    const scripts = await getScripts();
    if (!scripts.includes(script)) throw Error("Invalid script name");
    return new Promise<string>((resolve, reject) => {
        exec(path.join("./scripts/", script), (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                reject(error.message);
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                reject(stderr);
            }
            console.log(`stdout: ${stdout}`);
            resolve(stdout);
        });
    });
}
