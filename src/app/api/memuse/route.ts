import { getMemUse } from "@/lib/osmanagment";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const memuse = await getMemUse();
    return new Response(String(memuse));
}
