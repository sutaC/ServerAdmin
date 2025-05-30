import { getAvaliableServices, manageService } from "@/lib/osmanagment";
import { SERVICE_ACTION, SERVICE_ACTIONS } from "@/lib/utils";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const service = req.nextUrl.searchParams.get("name");
    if (!service)
        return new Response(undefined, {
            status: 400,
            statusText: "Service name required",
        });
    const services = await getAvaliableServices();
    if (!services.includes(service))
        return new Response(undefined, {
            status: 400,
            statusText: "Invalid script",
        });
    // Logic
    let active = true;
    try {
        await manageService(service, "status");
    } catch {
        active = false;
    }
    return new Response(JSON.stringify(active));
}

export async function POST(req: NextRequest) {
    const service = req.nextUrl.searchParams.get("name");
    const action = req.nextUrl.searchParams.get("action");
    if (!service)
        return new Response(undefined, {
            status: 400,
            statusText: "Service name required",
        });
    if (!action)
        return new Response(undefined, {
            status: 400,
            statusText: "Action required",
        });
    if (
        !SERVICE_ACTIONS.includes(action as SERVICE_ACTION) ||
        action === SERVICE_ACTIONS[3] // status
    )
        return new Response(undefined, {
            status: 400,
            statusText: "Invalid action",
        });
    const services = await getAvaliableServices();
    if (!services.includes(service))
        return new Response(undefined, {
            status: 400,
            statusText: "Invalid script",
        });
    // Logic
    await manageService(service, action as SERVICE_ACTION);
    return new Response(undefined, {
        status: 202,
        statusText: "Action performed",
    });
}
