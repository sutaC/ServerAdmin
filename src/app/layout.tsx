import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "ServerAdmin",
    description: "ServerAdmin is a simple GUI setup for managing your server.",
    authors: { name: "sutaC", url: "https://github.com/sutaC" },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
