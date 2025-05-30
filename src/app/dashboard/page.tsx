"use server";
import SystemStatistics from "@/lib/components/SystemStatistics";
import ServiceManager from "@/lib/components/ServiceManger";
import ScriptManager from "@/lib/components/ScriptManager";
import { logout } from "@/lib/auth";
import {
    getScripts,
    getHostname,
    getMemUse,
    getUptime,
    getAvaliableServices,
} from "@/lib/osmanagment";

export default async function Page() {
    const scripts = await getScripts();
    const services = await getAvaliableServices();

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
                <h2>Services</h2>
                <div>
                    {services.map((service, idx) => (
                        <ServiceManager service={service} key={idx} />
                    ))}
                </div>
            </section>

            <section>
                <h2>Scripts</h2>
                <div>
                    {scripts.map((script, idx) => (
                        <ScriptManager script={script} key={idx} />
                    ))}
                </div>
            </section>
        </>
    );
}
