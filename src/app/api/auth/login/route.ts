import { NextRequest } from 'next/server';
import prisma from '@/lib/db';
import {
  verifyPassword,
  signToken,
  getAuthCookieOptions,
} from '@/lib/auth';
import { jsonResponse, errorResponse } from '@/lib/api-utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return errorResponse('Email and password are required');
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return errorResponse('Invalid email or password', 401);
    }

    const token = signToken({ userId: user.id, email: user.email });
    const cookieOptions = getAuthCookieOptions();
    const response = jsonResponse({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
    });
    response.cookies.set(cookieOptions.name, token, cookieOptions);

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return errorResponse('Login failed', 500);
  }
}
