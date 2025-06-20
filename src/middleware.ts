// middleware.ts - Versão Final com /assinaturas pública

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get("token")?.value;

  // ✅ MUDANÇA AQUI: Adicionamos a rota /assinaturas à lista de páginas públicas.
  // Renomeei a variável para ficar mais claro.
  const isPublicPage = 
    pathname.startsWith('/login') || 
    pathname.startsWith('/register') || 
    pathname.startsWith('/assinaturas') ||
    pathname.startsWith('/favicon.png');
  
  // Uma página protegida é qualquer página que NÃO seja pública.
  const isProtectedRoute = !isPublicPage;

  // LÓGICA 1: Usuário LOGADO tentando acessar páginas PÚBLICAS (como login, registro).
  // Se ele tem um token e está na página de login, manda para a home.
  if (authToken && isPublicPage) {
    // Exceção: se ele estiver logado e na página de assinaturas, PODE ficar.
    if (pathname.startsWith('/assinaturas')) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/', request.url));
  }

  // LÓGICA 2: Usuário NÃO LOGADO tentando acessar páginas PROTEGIDAS.
  // Se ele não tem token e a página é protegida, manda para o login.
  if (!authToken && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Se nenhuma das condições acima foi atendida, permite o acesso.
  return NextResponse.next();
}

// A configuração do matcher continua a mesma, pois ela já "pega" todas as rotas
// para que nossa lógica acima possa decidir o que fazer com elas.
export const config = {
  matcher: [
    /*
     * Corresponde a todas as rotas, exceto as que começam com:
     * - api (rotas de API do Next.js, que não são páginas)
     * - _next/static (arquivos estáticos)
     * - _next/image (otimização de imagens)
     * - favicon.ico (ícone)
     */
    '/((?!api|_next/static|_next/image|).*)',
  ],
};