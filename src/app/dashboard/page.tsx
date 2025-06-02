"use server";
import styles from "./page.module.css";
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
        <div className={styles.app}>
            <header>
                <h1>Dashboard</h1>
                <button onClick={logout}>Logout</button>
            </header>

            <main>
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
                    <div className={styles.display}>
                        {services.map((service, idx) => (
                            <ServiceManager service={service} key={idx} />
                        ))}
                    </div>
                </section>

                <section>
                    <h2>Scripts</h2>
                    <div className={styles.display}>
                        {scripts.map((script, idx) => (
                            <ScriptManager script={script} key={idx} />
                        ))}
                    </div>
                </section>
            </main>

            <footer>
                <small>
                    <a
                        href="https://github.com/sutaC/ServerAdmin"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Server Admin
                    </a>
                </small>
                <small>
                    Made by{" "}
                    <a
                        href="https://github.com/sutaC"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        sutaC
                    </a>
                </small>
            </footer>
        </div>
    );
}
