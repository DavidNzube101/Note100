// lib/auth.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function setAuthCookie(res: NextResponse, userId: string, isAdmin: boolean) {
  const token = jwt.sign({ userId, isAdmin }, JWT_SECRET, { expiresIn: '1d' });
  res.cookies.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 86400, // 1 day
    path: '/',
  });
}

export function getAuthUser(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; isAdmin: boolean };
  } catch (error) {
    return null;
  }
}

export function clearAuthCookie(res: NextResponse) {
  res.cookies.set('auth_token', '', { maxAge: 0, path: '/' });
}