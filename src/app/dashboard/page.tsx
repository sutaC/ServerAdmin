import { logout } from "@/lib/auth";

export default function Page() {
    return (
        <>
            <h1>Dashboard</h1>
            <button onClick={logout}>Logout</button>
        </>
    );
}
