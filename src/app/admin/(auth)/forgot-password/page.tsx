'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Mail, ArrowLeft, Loader2, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function AdminForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const origin = window.location.origin;

      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${origin}/admin/reset-password`,
      });

      if (error) {
        setErrorMessage(error.message);
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred.');
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
            Reset Password
          </h1>
          <p className="text-xs text-emmy-ivory-muted mt-2">
            Enter your admin email to receive a secure recovery link.
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

        {success ? (
          <div className="text-center py-4 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="text-sm text-emerald-200">
              Recovery link has been sent to <strong>{email}</strong>. Check your inbox and follow the instructions.
            </p>
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-2 text-xs font-bold text-emmy-gold hover:text-emmy-bronze transition-colors pt-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Admin Login</span>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleResetRequest} className="space-y-5">
            <div>
              <label className="block text-xs font-bold tracking-wider uppercase text-emmy-ivory-muted mb-2">
                Administrator Email
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
                  <span>Sending Link...</span>
                </>
              ) : (
                <span>Send Reset Link</span>
              )}
            </button>

            <div className="text-center pt-2">
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-2 text-xs text-emmy-ivory-muted hover:text-emmy-gold transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Login</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
