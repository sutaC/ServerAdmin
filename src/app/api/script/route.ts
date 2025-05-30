import { executeScript, getScripts } from "@/lib/scripts";
import { NextRequest, NextResponse } from "next/server";

const runningScripts = new Set();

export async function GET(req: NextRequest) {
    const script = req.nextUrl.searchParams.get("name");
    if (!script)
        return new Response(undefined, {
            status: 400,
            statusText: "Script name required",
        });
    const scripts = await getScripts();
    if (!scripts.includes(script))
        return new Response(undefined, {
            status: 400,
            statusText: "Invalid script",
        });

    const res = Response.json(runningScripts.has(script));
    runningScripts.clear();
    return res;
}

export async function POST(req: NextRequest) {
    const script = req.nextUrl.searchParams.get("name");
    if (!script)
        return new Response(undefined, {
            status: 400,
            statusText: "Script name required",
        });
    if (runningScripts.has(script))
        return new Response(undefined, {
            status: 400,
            statusText: "Script is pending",
        });
    const scripts = await getScripts();
    if (!scripts.includes(script))
        return new Response(undefined, {
            status: 400,
            statusText: "Invalid script",
        });
    runningScripts.add(script);
    try {
        const stream = await executeScript(script);
        return new NextResponse(stream, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                Connection: "keep-alive",
            },
        });
    } catch (error) {
        return new Response(undefined, {
            status: 503,
            statusText: "Script exec error",
        });
    } finally {
        runningScripts.delete(script);
    }
}
