import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseClient: SupabaseClient | null = null;

export function getSupabaseConfig(): { url: string; anonKey: string; isConfigured: boolean } {
  // Check client env or local storage
  const envUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
  const envKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

  let localUrl = '';
  let localKey = '';
  try {
    const saved = localStorage.getItem('smartmine_supabase_config');
    if (saved) {
      const parsed = JSON.parse(saved);
      localUrl = parsed.url || '';
      localKey = parsed.anonKey || '';
    }
  } catch {
    // ignore
  }

  const url = localUrl || envUrl;
  const anonKey = localKey || envKey;
  const isConfigured = Boolean(url && url.startsWith('http') && anonKey && anonKey.length > 10);

  return { url, anonKey, isConfigured };
}

export function saveSupabaseConfig(url: string, anonKey: string) {
  try {
    localStorage.setItem(
      'smartmine_supabase_config',
      JSON.stringify({ url: url.trim(), anonKey: anonKey.trim() })
    );
    // Reset cached instance
    supabaseClient = null;
  } catch (e) {
    console.error('Failed to save Supabase config to localStorage:', e);
  }
}

export function getSupabase(): SupabaseClient | null {
  if (supabaseClient) return supabaseClient;

  const { url, anonKey, isConfigured } = getSupabaseConfig();
  if (!isConfigured) return null;

  try {
    supabaseClient = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
    return supabaseClient;
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error);
    return null;
  }
}

export async function testSupabaseConnection(url: string, key: string): Promise<{ success: boolean; message: string }> {
  if (!url || !key) {
    return { success: false, message: 'URL dan API Key Supabase tidak boleh kosong.' };
  }
  try {
    const testClient = createClient(url.trim(), key.trim());
    const { error } = await testClient.from('mining_sites').select('count', { count: 'exact', head: true });
    
    // If error is code 42P01 (relation does not exist), connection succeeded but tables need to be created!
    if (error && error.code === '42P01') {
      return { 
        success: true, 
        message: 'Koneksi ke Supabase berhasil! (Catatan: Tabel belum dibuat, silakan jalankan SQL Script yang disediakan).' 
      };
    }
    
    if (error && error.message) {
      // If error is permission or network error
      if (error.message.includes('Invalid API key') || error.message.includes('JWT')) {
        return { success: false, message: `Autentikasi Supabase Gagal: ${error.message}` };
      }
      // Any generic response from supabase means endpoint is reachable
      return { success: true, message: `Koneksi Supabase Terhubung (${error.message})` };
    }

    return { success: true, message: 'Koneksi ke Supabase Database & Backend berhasil terhubung!' };
  } catch (err: any) {
    return { success: false, message: `Gagal terhubung: ${err?.message || 'Network error'}` };
  }
}

// =========================================================================
// SUPABASE ENTERPRISE AUTHENTICATION PROVIDER
// =========================================================================

export interface SupabaseAuthUser {
  id: string;
  email?: string;
  role?: string;
  user_metadata?: {
    full_name?: string;
    role?: string;
    company_name?: string;
    [key: string]: any;
  };
  app_metadata?: {
    provider?: string;
    providers?: string[];
    [key: string]: any;
  };
}

/**
 * Sign in user with Supabase Email & Password
 */
export async function signInWithSupabase(email: string, password: string): Promise<{ user: any; session: any; error: any }> {
  const supabase = getSupabase();
  if (!supabase) {
    return { user: null, session: null, error: new Error('Supabase client belum dikonfigurasi. Silakan atur URL dan Anon Key di tab Supabase.') };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  return { user: data?.user || null, session: data?.session || null, error };
}

/**
 * Sign up user with Supabase Email, Password, and Enterprise Metadata
 */
export async function signUpWithSupabase(
  email: string, 
  password: string, 
  metadata: { fullName?: string; role?: string; companyName?: string } = {}
): Promise<{ user: any; session: any; error: any }> {
  const supabase = getSupabase();
  if (!supabase) {
    return { user: null, session: null, error: new Error('Supabase client belum dikonfigurasi.') };
  }

  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: {
      data: {
        full_name: metadata.fullName || email.split('@')[0],
        role: metadata.role || 'Mine Manager',
        company_name: metadata.companyName || 'PT NickelSmart Nusantara',
      },
    },
  });

  return { user: data?.user || null, session: data?.session || null, error };
}

/**
 * Sign in using Supabase OAuth SSO (Google, Azure/Microsoft, GitHub)
 */
export async function signInWithSupabaseOAuth(provider: 'google' | 'azure' | 'github'): Promise<{ error: any }> {
  const supabase = getSupabase();
  if (!supabase) {
    return { error: new Error('Supabase client belum dikonfigurasi.') };
  }

  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: window.location.origin,
    },
  });

  return { error };
}

/**
 * Sign out from Supabase Auth session
 */
export async function signOutSupabase(): Promise<{ error: any }> {
  const supabase = getSupabase();
  if (!supabase) {
    return { error: null };
  }

  const { error } = await supabase.auth.signOut();
  return { error };
}

/**
 * Get current active session from Supabase
 */
export async function getSupabaseSession(): Promise<{ session: any; user: any; error: any }> {
  const supabase = getSupabase();
  if (!supabase) {
    return { session: null, user: null, error: null };
  }

  const { data, error } = await supabase.auth.getSession();
  return { session: data?.session || null, user: data?.session?.user || null, error };
}

/**
 * Listen to Supabase auth state changes
 */
export function onSupabaseAuthStateChange(callback: (event: string, session: any) => void): (() => void) | null {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });

  return () => {
    subscription.unsubscribe();
  };
}

