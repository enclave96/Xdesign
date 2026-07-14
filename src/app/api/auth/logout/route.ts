import { getAuthCookieOptions } from '@/lib/auth';
import { jsonResponse } from '@/lib/api-utils';

export async function POST() {
  const cookieOptions = getAuthCookieOptions();
  const response = jsonResponse({ success: true });
  response.cookies.set(cookieOptions.name, '', {
    ...cookieOptions,
    maxAge: 0,
  });
  return response;
}
