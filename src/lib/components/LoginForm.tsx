"use client";
import styles from "./LoginForm.module.css";
import { login } from "@/lib/auth";
import { useActionState } from "react";

export default function LoginForm(props: { action: typeof login }) {
    const [formState, formAction] = useActionState(props.action, {
        message: "",
    });

    return (
        <form action={formAction}>
            {formState.message && (
                <small className={styles.error}>{formState.message}</small>
            )}

            <div className={styles.field}>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="password"
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
}
