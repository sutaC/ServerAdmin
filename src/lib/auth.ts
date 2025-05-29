export function validateSession(session: string): boolean {
    return session === process.env.ADMIN_PASSWORD;
}
