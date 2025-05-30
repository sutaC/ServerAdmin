import { login } from "@/lib/auth";
import LoginForm from "@/lib/components/LoginForm";

export default function Page() {
    return (
        <>
            <h1>Login</h1>
            <LoginForm action={login} />
        </>
    );
}
