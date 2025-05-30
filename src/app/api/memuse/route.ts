import { getMemUse } from "@/lib/osmanagment";

export async function GET() {
    const memuse = await getMemUse();
    return new Response(String(memuse));
}
