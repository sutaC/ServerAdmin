"use server";
import ScriptHandler from "@/lib/components/ScriptHandler";
import { logout } from "@/lib/auth";
import { getScripts } from "@/lib/scripts";
import { getHostname, getMemUse, getUptime } from "@/lib/osdata";
import { get } from "http";
import SystemStatistics from "@/lib/components/SystemStatistics";

export default async function Page() {
    const scripts = await getScripts();

    return (
        <>
            <h1>Dashboard</h1>
            <button onClick={logout}>Logout</button>

            <section>
                <h2>System</h2>

                <SystemStatistics
                    hostname={await getHostname()}
                    uptime={await getUptime()}
                    memuse={await getMemUse()}
                />
            </section>

            <section>
                <h2>Scripts</h2>
                <div>
                    {scripts.map((script, idx) => (
                        <ScriptHandler script={script} key={idx} />
                    ))}
                </div>
            </section>
        </>
    );
}
