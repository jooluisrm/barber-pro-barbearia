"use client";

import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { useRouter } from 'next/navigation';

// A interface 'Barbearia' original para compatibilidade
export interface Barbearia {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    fotoPerfil?: string;
    stripeCurrentPeriodEnd: string | null;
}

// A nova interface 'Usuario' com todos os dados ricos
export interface Usuario {
    id: string; // ID do próprio usuário no sistema
    nome: string;
    email: string;
    role: 'ADMIN' | 'BARBEIRO';
    barbeariaId: string;
    perfilBarbeiro?: {
        id: string; // ID do perfil de barbeiro para operações
        telefone: string;
    };
    barbearia: { // Dados da barbearia associada
        nome: string;
        stripeCurrentPeriodEnd: string | null;
    };
}

// O tipo do contexto, definindo tudo que ele provê
interface AuthContextType {
    barbearia: Barbearia | null;
    usuario: Usuario | null;
    token: string | null;
    login: (userData: { usuario: Usuario; barbearia: Barbearia; token: string }) => void;
    logout: () => void;
    updateBarbearia: (newBarbeariaData: Barbearia) => void;
    updateUsuario: (newUsuarioData: Usuario) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const [barbearia, setBarbearia] = useState<Barbearia | null>(null);
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [token, setToken] = useState<string | null>(null);

    // Efeito para re-hidratar o estado a partir do localStorage e cookies
    useEffect(() => {
        if (typeof window !== "undefined") {
            const cookies = parseCookies();
            const storedBarbearia = localStorage.getItem("barbearia");
            const storedUsuario = localStorage.getItem("auth-user");
            const storedToken = cookies.token;
            if (storedToken) {
                setToken(storedToken);
                if (storedBarbearia) {
                    try { setBarbearia(JSON.parse(storedBarbearia)); } catch (e) { console.error("Falha ao parsear dados da barbearia", e); }
                }
                if (storedUsuario) {
                    try { setUsuario(JSON.parse(storedUsuario)); } catch (e) { console.error("Falha ao parsear dados do usuário", e); }
                }
            }
        }
    }, []);

    // Função para realizar o login e popular os estados
    const login = (userData: { usuario: Usuario; barbearia: Barbearia, token: string }) => {
        setBarbearia(userData.barbearia);
        setUsuario(userData.usuario);
        setToken(userData.token);
        if (typeof window !== "undefined") {
            localStorage.setItem("barbearia", JSON.stringify(userData.barbearia));
            localStorage.setItem("auth-user", JSON.stringify(userData.usuario));
            setCookie(null, "token", userData.token, { maxAge: 60 * 60 * 8, path: "/" }); // 8 horas
        }
        router.refresh();
    };

    // Função para realizar o logout e limpar os estados e armazenamento
    const logout = () => {
        setBarbearia(null);
        setUsuario(null);
        setToken(null);
        if (typeof window !== "undefined") {
            localStorage.removeItem("barbearia");
            localStorage.removeItem("auth-user");
            destroyCookie(null, "token", { path: '/' });
        }
        window.location.href = '/login';
    };

    // Função para atualizar apenas o objeto de barbearia (para compatibilidade)
    const updateBarbearia = (newBarbeariaData: Barbearia) => {
        setBarbearia(newBarbeariaData);
        if (typeof window !== "undefined") {
            localStorage.setItem("barbearia", JSON.stringify(newBarbeariaData));
        }
    };

    const updateUsuario = (partialNewData: Partial<Usuario>) => {
        // Usamos um callback para garantir que estamos atualizando o estado mais recente
        setUsuario(prevUsuario => {
            if (!prevUsuario) return null; // Se não houver usuário, não faz nada

            // Mescla o usuário antigo com os novos dados parciais
            const updatedUsuario = {
                ...prevUsuario,
                ...partialNewData
            };

            // Atualiza o localStorage com o objeto completamente mesclado
            if (typeof window !== "undefined") {
                localStorage.setItem("auth-user", JSON.stringify(updatedUsuario));
            }

            return updatedUsuario;
        });
    };

    return (
        <AuthContext.Provider value={{ barbearia, usuario, token, login, logout, updateBarbearia, updateUsuario }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook customizado para consumir o contexto facilmente
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
};
