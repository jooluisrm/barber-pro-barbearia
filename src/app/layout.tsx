import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Deshboard } from "@/components/Deshboard/deshbord";
import { Footer } from "@/components/footer/footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "sonner";
import { PendingScheduleContextProvider } from "@/contexts/PendingScheduleContext";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "BarberPro",
    description: "Sistema completo de gerenciamento para barbearias, com agendamentos online, controle de clientes, serviços, profissionais e muito mais.",
    icons: {
        icon: "/favicon.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <AuthProvider>
                    <PendingScheduleContextProvider>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                            disableTransitionOnChange
                        >

                            <Deshboard />
                            {children}
                            <Toaster />
                            <Footer />
                        </ThemeProvider>
                    </PendingScheduleContextProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
