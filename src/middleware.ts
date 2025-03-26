import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value; // Obtém o token dos cookies
    const url = req.nextUrl.clone(); // Clona a URL atual

    // 🚀 Se o usuário NÃO estiver autenticado e tentar acessar a página inicial "/"
    if (!token && url.pathname === "/") {
        return NextResponse.redirect(new URL("/login", req.url)); // Redireciona para o login
    }

    // 🔐 Se o usuário NÃO estiver autenticado, não pode acessar áreas protegidas
    const protectedRoutes = ["/dashboard", "/perfil"];
    if (!token && protectedRoutes.some(route => url.pathname.startsWith(route))) {
        return NextResponse.redirect(new URL("/login", req.url)); // Redireciona para o login
    }

    // 🚀 Se o usuário estiver autenticado, não deve acessar "/login" nem "/register"
    if (token && (url.pathname === "/login" || url.pathname === "/register")) {
        return NextResponse.redirect(new URL("/", req.url)); // Redireciona para a Home
    }

    return NextResponse.next(); // Permite o acesso à rota
}

// 🛠 Define em quais rotas o middleware será aplicado
export const config = {
    matcher: ["/", "/dashboard/:path*", "/perfil/:path*", "/login", "/register"], // Protege essas rotas
};
