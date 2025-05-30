"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createSession() {
    const cookieStore = await cookies();
    if (process.env.ADMIN_PASSWORD === undefined)
        throw Error("`ADMIN_PASSWORD` required in .env");
    cookieStore.set("session", process.env.ADMIN_PASSWORD);
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete("session");
}

export async function verifyPassword(password: string): Promise<boolean> {
    if (process.env.ADMIN_PASSWORD === undefined)
        throw Error("`ADMIN_PASSWORD` required in .env");
    return password === process.env.ADMIN_PASSWORD;
}

export async function login(
    currentState: { message: string },
    formData: FormData
) {
    const password = formData.get("password")?.toString() ?? "";
    if (await verifyPassword(password)) {
        await createSession();
        redirect("/dashboard");
    } else {
        return {
            message: "Invalid password",
        };
    }
}

export async function logout() {
    await deleteSession();
    redirect("/login");
}
