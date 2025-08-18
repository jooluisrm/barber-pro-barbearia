"use client"

import { useAuth } from "@/contexts/AuthContext";



export const MainHome = () => {
    const { barbearia, usuario } = useAuth();

    return (
        <main className="flex-1 space-y-6 p-4 md:p-6">
            
        </main>
    );
}