import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

export async function middleware(request) {
  const session = await getServerSession(authOptions);

  // Définir les chemins publics (pas besoin de session)
  const publicPaths = [
    '/api/forgot-password',
    '/api/reset-password',
    '/api/register', // Ajout pour rendre l'inscription publique
    '/api/login',
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
  ];

  // Vérifier si le chemin actuel est public
  const { pathname } = request.nextUrl;
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Vérifier si une session existe
  if (!session) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  // Si session existe, continuer
  return NextResponse.next();
}

// Configurer les chemins affectés par le middleware
export const config = {
  matcher: ['/api/:path*', '/dashboard/:path*'], // Applique le middleware à toutes les API et à /dashboard
};
