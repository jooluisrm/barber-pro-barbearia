import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

/**
 * Função auxiliar para obter a chave secreta do JWT das variáveis de ambiente.
 * É uma boa prática para garantir que a chave esteja sempre disponível.
 */
const getJwtSecretKey = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('A Chave Secreta do JWT não está definida nas variáveis de ambiente.');
    }
    // Converte a chave para o formato que a biblioteca 'jose' espera
    return new TextEncoder().encode(secret);
};

/**
 * Middleware principal que intercepta requisições para proteger rotas.
 */
export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const authToken = request.cookies.get("token")?.value;

    // 1. Definição das rotas e suas permissões
    const publicPages = ['/login', '/register'];
    const adminOnlyPages = ['/barbeiros', '/barbearia', '/assinaturas'];

    const isPublicPage = publicPages.some(page => pathname.startsWith(page));

    // Cenário 1: O usuário NÃO tem um token de autenticação
    if (!authToken) {
        // Se a página não for pública, redireciona para o login
        if (!isPublicPage) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        // Se for pública, permite o acesso
        return NextResponse.next();
    }

    // Cenário 2: O usuário TEM um token. Precisamos de o verificar e ler a role.
    try {
        // Verifica e decodifica o token para obter o payload
        const { payload } = await jwtVerify(authToken, getJwtSecretKey());
        const userRole = payload.role as string; // 'ADMIN' ou 'BARBEIRO'

        // REGRA DE NEGÓCIO 1: Se o usuário já está logado, não pode visitar as páginas de login/registro.
        if (isPublicPage) {
            return NextResponse.redirect(new URL('/', request.url));
        }

        // REGRA DE NEGÓCIO 2: Se o usuário é um BARBEIRO, ele não pode aceder às páginas de admin.
        const isAdminPage = adminOnlyPages.some(page => pathname.startsWith(page));
        if (isAdminPage && userRole === 'BARBEIRO') {
            console.log(`[Middleware] Acesso bloqueado para BARBEIRO à página de admin: ${pathname}`);
            // Redireciona o barbeiro para o dashboard, que é uma página segura para ele.
            return NextResponse.redirect(new URL('/', request.url));
        }
        
        // Se todas as verificações passaram (ex: é um ADMIN numa página de admin), permite o acesso.
        return NextResponse.next();

    } catch (error) {
        // Ocorre se o token for inválido, expirado ou malformado.
        console.error("[Middleware] Erro ao verificar token:", error);
        
        // Redireciona para a página de login e remove o cookie inválido do navegador.
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('token');
        return response;
    }
}

// O 'config' permanece o mesmo, está perfeito.
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|favicon.png|img.png|barberpro-removebg.png).*)',
    ],
};
