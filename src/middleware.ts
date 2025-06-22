// middleware.ts - Versão Final com favicon.png liberado

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get("token")?.value;

  const isPublicPage = 
    pathname.startsWith('/login') || 
    pathname.startsWith('/register') || 
    pathname.startsWith('/assinaturas');
  
  const isProtectedRoute = !isPublicPage;

  if (authToken && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!authToken && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Corresponde a todas as rotas, exceto as que começam com:
     * - api (rotas de API do Next.js)
     * - _next/static (arquivos estáticos)
     * - _next/image (otimização de imagens)
     * - favicon.ico (ícone do site)
     * - favicon.png (outro formato de ícone) ✅
     */
    '/((?!api|_next/static|_next/image|favicon.ico|favicon.png|img.png|barberpro-removebg.png).*)', // ✅ ALTERAÇÃO AQUI
  ],
};