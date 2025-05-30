"use server";
import ScriptHandler from "@/lib/components/ScriptHandler";
import { logout } from "@/lib/auth";
import { getScripts } from "@/lib/scripts";

export default async function Page() {
    const scripts = await getScripts();

    return (
        <>
            <h1>Dashboard</h1>
            <button onClick={logout}>Logout</button>

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
