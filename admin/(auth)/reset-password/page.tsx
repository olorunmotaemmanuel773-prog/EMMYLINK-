'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Lock, Eye, EyeOff, Loader2, ShieldAlert } from 'lucide-react';

export default function AdminResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        setLoading(false);
        return;
      }

      router.push('/admin/login?message=password_updated');
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to update password.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-gradient-to-b from-[#12100E] via-[#171717] to-[#24201D] text-emmy-ivory">
      <div className="w-full max-w-md bg-[#24201D]/90 backdrop-blur-xl border border-emmy-bronze/35 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emmy-bronze via-emmy-gold to-emmy-bronze" />

        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <div className="relative w-16 h-14">
              <Image
                src="/images/emmylink-emblem.png"
                alt="EMMYLINK Official Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <h1 className="text-xl font-black uppercase text-white tracking-wider">
            Set New Password
          </h1>
          <p className="text-xs text-emmy-ivory-muted mt-2">
            Enter your new secure password for the admin portal.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Error</p>
              <p className="mt-0.5 opacity-90">{errorMessage}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleUpdatePassword} className="space-y-5">
          <div>
            <label className="block text-xs font-bold tracking-wider uppercase text-emmy-ivory-muted mb-2">
              New Password
            </label>
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
                className="w-full pl-10 pr-11 py-3 bg-[#1A1715] border border-emmy-charcoal-700 focus:border-emmy-bronze focus:ring-1 focus:ring-emmy-bronze rounded-xl text-sm text-white placeholder:text-neutral-600 outline-none"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-emmy-ivory-muted hover:text-white"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold tracking-wider uppercase text-emmy-ivory-muted mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emmy-ivory-muted">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 bg-[#1A1715] border border-emmy-charcoal-700 focus:border-emmy-bronze focus:ring-1 focus:ring-emmy-bronze rounded-xl text-sm text-white placeholder:text-neutral-600 outline-none"
                disabled={loading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emmy-bronze to-emmy-bronze-hover hover:from-emmy-bronze-light hover:to-emmy-bronze text-white font-bold text-xs tracking-widest uppercase shadow-lg shadow-emmy-bronze/25 transition-all flex justify-center items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Updating Password...</span>
              </>
            ) : (
              <span>Save &amp; Continue</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
