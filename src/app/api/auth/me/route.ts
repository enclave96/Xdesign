import { NextRequest } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { jsonResponse, unauthorizedResponse } from '@/lib/api-utils';

export async function GET(request: NextRequest) {
  const user = await getSessionUser(request);
  if (!user) {
    return unauthorizedResponse();
  }
  return jsonResponse({ user });
}
