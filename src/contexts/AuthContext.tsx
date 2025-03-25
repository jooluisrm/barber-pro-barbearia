"use client";

import { createContext, useState, useContext, ReactNode, useEffect } from "react";

export interface Barbearia {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    fotoPerfil?: string;
}

interface AuthContextType {
    barbearia: Barbearia | null;
    token: string | null;
    login: (userData: { barbearia: Barbearia; token: string }) => void;
    setBarbearia: any;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [barbearia, setBarbearia] = useState<Barbearia | null>(null);
    const [token, setToken] = useState<string | null>(null);

    // Carregar barbearia e token do localStorage ao iniciar
    useEffect(() => {
        const storedBarbearia = localStorage.getItem("barbearia");
        const storedToken = localStorage.getItem("token");

        if (storedBarbearia && storedToken) {
            setBarbearia(JSON.parse(storedBarbearia));
            setToken(storedToken);
        }
    }, []);

    const login = (userData: { barbearia: Barbearia; token: string }) => {
        setBarbearia(userData.barbearia);
        setToken(userData.token);

        // Salvar no localStorage
        localStorage.setItem("barbearia", JSON.stringify(userData.barbearia));
        localStorage.setItem("token", userData.token);
    };

    const logout = () => {
        setBarbearia(null);
        setToken(null);

        // Remover do localStorage
        localStorage.removeItem("barbearia");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ barbearia, token, login, logout, setBarbearia }}>
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
