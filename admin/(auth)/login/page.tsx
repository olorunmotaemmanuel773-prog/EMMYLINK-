'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Eye, EyeOff, Lock, Mail, ShieldAlert, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam === 'unauthorized') {
      setErrorMessage(
        'Access Denied: Your account is authenticated but does not have Administrator privileges in admin_profiles.'
      );
    } else if (errorParam === 'auth_callback_failed') {
      setErrorMessage('Authentication verification failed or expired. Please log in again.');
    }

    const messageParam = searchParams.get('message');
    if (messageParam === 'password_reset_sent') {
      setInfoMessage('Password reset email has been sent. Check your inbox.');
    } else if (messageParam === 'password_updated') {
      setInfoMessage('Password successfully updated. Please log in with your new password.');
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setInfoMessage(null);
    setLoading(true);

    try {
      const supabase = createClient();

      // 1. Authenticate credentials with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authError) {
        setErrorMessage(authError.message || 'Invalid email or password.');
        setLoading(false);
        return;
      }

      if (!authData.user) {
        setErrorMessage('Authentication failed. No user record returned.');
        setLoading(false);
        return;
      }

      // 2. Explicitly verify administrator authorization in public.admin_profiles
      const { data: profile, error: profileError } = await supabase
        .from('admin_profiles')
        .select('role')
        .eq('id', authData.user.id)
        .single();

      const userRole = (profile as any)?.role;

      if (profileError || !profile || !['admin', 'super_admin'].includes(userRole)) {
        // Sign out immediately to clear unprivileged session
        await supabase.auth.signOut();
        setErrorMessage(
          'Unauthorized Account: This user is not registered as an authorized administrator in admin_profiles.'
        );
        setLoading(false);
        return;
      }

      // 3. Successful admin verification
      const redirectTo = searchParams.get('redirectTo') || '/admin';
      router.push(redirectTo);
      router.refresh();
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred during login.');
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-[#24201D]/90 backdrop-blur-xl border border-emmy-bronze/35 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
      {/* Top Bronze Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emmy-bronze via-emmy-gold to-emmy-bronze" />

      {/* Brand Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="relative w-20 h-16">
            <Image
              src="/images/emmylink-emblem.png"
              alt="EMMYLINK Official Logo"
              fill
              className="object-contain filter drop-shadow-md"
              priority
            />
          </div>
        </div>
        <h1 className="text-2xl font-black tracking-wider uppercase text-white">
          EMMY<span className="text-emmy-bronze">LINK</span>
        </h1>
        <p className="text-xs font-bold tracking-[0.2em] text-emmy-gold uppercase mt-1">
          Administrator Portal
        </p>
        <p className="text-xs text-emmy-ivory-muted mt-2">
          Secure sign-in for authorized CMS managers
        </p>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-start gap-3 animate-shake">
          <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Authentication Error</p>
            <p className="mt-0.5 opacity-90">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Info/Success Alert */}
      {infoMessage && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Notice</p>
            <p className="mt-0.5 opacity-90">{infoMessage}</p>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block text-xs font-bold tracking-wider uppercase text-emmy-ivory-muted mb-2">
            Admin Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emmy-ivory-muted">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@emmylink.com"
              className="w-full pl-10 pr-4 py-3 bg-[#1A1715] border border-emmy-charcoal-700 focus:border-emmy-bronze focus:ring-1 focus:ring-emmy-bronze rounded-xl text-sm text-white placeholder:text-neutral-600 outline-none transition-all"
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xs font-bold tracking-wider uppercase text-emmy-ivory-muted">
              Password
            </label>
            <Link
              href="/admin/forgot-password"
              className="text-xs text-emmy-gold/90 hover:text-emmy-bronze-light transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emmy-ivory-muted">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-10 pr-11 py-3 bg-[#1A1715] border border-emmy-charcoal-700 focus:border-emmy-bronze focus:ring-1 focus:ring-emmy-bronze rounded-xl text-sm text-white placeholder:text-neutral-600 outline-none transition-all"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-emmy-ivory-muted hover:text-white transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emmy-bronze to-emmy-bronze-hover hover:from-emmy-bronze-light hover:to-emmy-bronze text-white font-bold text-xs tracking-widest uppercase shadow-lg shadow-emmy-bronze/25 hover:shadow-emmy-bronze/40 active:scale-[0.99] transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Authenticating...</span>
            </>
          ) : (
            <span>Sign In to Dashboard</span>
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-emmy-charcoal-700/60 text-center">
        <p className="text-[11px] text-emmy-ivory-muted">
          Protected area. All actions are logged and authenticated via Supabase Row Level Security.
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-gradient-to-b from-[#12100E] via-[#171717] to-[#24201D] text-emmy-ivory">
      {/* Back to website button */}
      <div className="w-full max-w-md mb-6 flex justify-between items-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-emmy-ivory-muted hover:text-emmy-gold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Main Website</span>
        </Link>
        <span className="text-[11px] font-mono text-emmy-gold/80 px-2.5 py-1 rounded bg-emmy-charcoal-800 border border-emmy-gold/20">
          CMS v2.0
        </span>
      </div>

      <Suspense fallback={<div className="text-xs text-emmy-gold">Loading login portal...</div>}>
        <AdminLoginForm />
      </Suspense>
    </div>
  );
}
