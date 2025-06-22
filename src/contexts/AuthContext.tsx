"use client";

import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { NextRequest, NextResponse } from "next/server";
import { useRouter } from 'next/navigation';


export interface Barbearia {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    fotoPerfil?: string;
    stripeCurrentPeriodEnd: string | null; // ISO string, ex: "2025-07-01T00:00:00.000Z"
}

interface AuthContextType {
    barbearia: Barbearia | null;
    token: string | null;
    login: (userData: { barbearia: Barbearia; token: string }) => void;
    logout: () => void;
    updateBarbearia: (newBarbeariaData: Barbearia) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const [barbearia, setBarbearia] = useState<Barbearia | null>(null);
    const [token, setToken] = useState<string | null>(null);

    // Verifica se está rodando no client antes de acessar localStorage e cookies
    useEffect(() => {
        if (typeof window !== "undefined") {
            const cookies = parseCookies();
            const storedBarbearia = localStorage.getItem("barbearia");
            const storedToken = cookies.token;

            if (storedBarbearia && storedToken) {
                setBarbearia(JSON.parse(storedBarbearia));
                setToken(storedToken);
            }
        }
    }, []);

    const login = (userData: { barbearia: Barbearia; token: string }) => {
        setBarbearia(userData.barbearia);
        setToken(userData.token);

        if (typeof window !== "undefined") {
            // Salvar no localStorage
            localStorage.setItem("barbearia", JSON.stringify(userData.barbearia));

            // Salvar o token nos cookies
            setCookie(null, "token", userData.token, {
                maxAge: 60 * 60 * 2, // Expira em 2 horas
                path: "/", // Disponível globalmente
            });
        }

        // Aguarda um pequeno delay e força um reload para garantir que o middleware pega o token
        setTimeout(() => {
            window.location.href = "/";
        }, 500);
    };


    const logout = () => {
        setBarbearia(null);
        setToken(null);

        if (typeof window !== "undefined") {
            // Remover do localStorage
            localStorage.removeItem("barbearia");

            // Remover dos cookies
            destroyCookie(null, "token");
        }

        // Aguarda um pequeno delay e força um reload
        setTimeout(() => {
            window.location.href = "/login";
        }, 500);
    };

    const updateBarbearia = (newBarbeariaData: Barbearia) => {
        setBarbearia(newBarbeariaData);
        if (typeof window !== "undefined") {
            localStorage.setItem("barbearia", JSON.stringify(newBarbeariaData));
        }
    };

    return (
        <AuthContext.Provider value={{ barbearia, token, login, logout, updateBarbearia }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
};
