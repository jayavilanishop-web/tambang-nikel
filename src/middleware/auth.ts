import { Request, Response, NextFunction } from 'express';
import { adminAuth } from '../lib/firebase-admin.ts';
import { DecodedIdToken } from 'firebase-admin/auth';
import { getServerSupabase } from '../lib/supabase-server.ts';

export interface EnterpriseAuthUser {
  uid: string;
  email?: string;
  role?: string;
  provider: 'firebase' | 'supabase';
  raw?: any;
}

export interface AuthRequest extends Request {
  user?: DecodedIdToken;
  enterpriseUser?: EnterpriseAuthUser;
}

export const requireAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  const token = authHeader.split('Bearer ')[1].trim();

  // 1. First attempt: Verify Firebase Auth Token
  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    req.user = decodedToken;
    req.enterpriseUser = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      provider: 'firebase',
      raw: decodedToken
    };
    return next();
  } catch (firebaseErr) {
    // If Firebase verification fails, proceed to check Supabase JWT
  }

  // 2. Second attempt: Verify Supabase JWT Token
  const supabase = getServerSupabase();
  if (supabase) {
    try {
      const { data: { user }, error } = await supabase.auth.getUser(token);
      if (!error && user) {
        req.enterpriseUser = {
          uid: user.id,
          email: user.email,
          role: user.user_metadata?.role,
          provider: 'supabase',
          raw: user
        };
        return next();
      }
    } catch (supabaseErr) {
      console.warn('Error verifying Supabase token:', supabaseErr);
    }
  }

  return res.status(401).json({ error: 'Unauthorized: Invalid token (neither Firebase nor Supabase)' });
};

