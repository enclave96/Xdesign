import { NextRequest } from 'next/server';
import prisma from '@/lib/db';
import { hashPassword, signToken, getAuthCookieOptions } from '@/lib/auth';
import { jsonResponse, errorResponse } from '@/lib/api-utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password) {
      return errorResponse('Email and password are required');
    }

    if (password.length < 8) {
      return errorResponse('Password must be at least 8 characters');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return errorResponse('Invalid email format');
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return errorResponse('Email already registered', 409);
    }

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name: name ?? null,
      },
      select: { id: true, email: true, name: true, createdAt: true },
    });

    const token = signToken({ userId: user.id, email: user.email });
    const cookieOptions = getAuthCookieOptions();
    const response = jsonResponse({ user }, 201);
    response.cookies.set(cookieOptions.name, token, cookieOptions);

    return response;
  } catch (error) {
    console.error('Register error:', error);
    return errorResponse('Registration failed', 500);
  }
}
