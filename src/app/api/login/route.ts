import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }

  try {
    const user = await prisma.utilisateur.findUnique({
      where: { email },
    });

    if (!user || !user.motDePasse) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.motDePasse);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const session = await getServerSession(authOptions);
    if (session) {
      return NextResponse.json({ error: 'Already logged in' }, { status: 400 });
    }

    // Simuler la création d'une session (à remplacer par NextAuth signIn si nécessaire)
    return NextResponse.json({ message: 'Login successful', user: { id: user.id, email: user.email, role: user.role } }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
