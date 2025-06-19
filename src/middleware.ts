// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function getBarbeariaIdFromToken(token: string): string | null {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.id || null;
    } catch {
        return null;
    }
}

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;

    const protectedRoutes = ["/", "/agendamentos", "/barbeiros", "/barbearia", "/sucesso", "/cancelado", "/dashboard", "/perfil"];
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route) && route !== '/') || pathname === '/';

    if (!token && isProtectedRoute) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (token && (pathname === "/login" || pathname === "/register")) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (token && isProtectedRoute) {
        try {
            console.log("\n--- INICIANDO VERIFICAÇÃO DE MIDDLEWARE ---");
            console.log(`[PASSO 1] Rota protegida acessada: ${pathname}. Entrando no bloco try...`);
            
            const barbeariaId = getBarbeariaIdFromToken(token);
            console.log(`[PASSO 2] ID extraído do token: ${barbeariaId}`);

            if (!barbeariaId) {
                throw new Error("Token inválido ou não contém ID.");
            }

            const backendUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/status?id=${barbeariaId}`;
            console.log(`[PASSO 3] Chamando a API de status em: ${backendUrl}`);
            
            const response = await fetch(backendUrl, { cache: 'no-store' });
            console.log(`[PASSO 4] Resposta da API recebida com status: ${response.status} ${response.statusText}`);

            if (!response.ok) {
                throw new Error(`API de status retornou um erro: ${response.status}`);
            }
            
            const data = await response.json();
            console.log(`[PASSO 5] Dados recebidos da API:`, data);
            
            if (!data.isActive && pathname !== '/assinaturas') {
                console.log("[PASSO 6] Redirecionando para /assinaturas pois a assinatura está INATIVA.");
                return NextResponse.redirect(new URL('/assinaturas', request.url));
            }
            
            console.log("[PASSO 7] Verificação concluída com SUCESSO. Permitindo acesso.");

        } catch (error) {
            // ✅ LOG ESSENCIAL: Imprime o erro exato que fez o código pular para o catch.
            console.error("❌ [ERRO CAPTURADO] O middleware falhou, forçando logout. Causa:", error);
            
            const loginUrl = new URL('/login', request.url);
            const res = NextResponse.redirect(loginUrl);
            res.cookies.delete('token');
            return res;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/dashboard/:path*", "/perfil/:path*", "/login", "/register", "/agendamentos", "/barbeiros", "/barbearia"],
};