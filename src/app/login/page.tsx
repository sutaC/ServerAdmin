import styles from "./page.module.css";
import LoginForm from "@/lib/components/LoginForm";
import { login } from "@/lib/auth";

export default function Page() {
    return (
        <div className={styles.app}>
            <main>
                <h1>Login</h1>
                <LoginForm action={login} />
            </main>
        </div>
    );
}
