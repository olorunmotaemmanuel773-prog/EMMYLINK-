import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AdminShellClient from '@/components/admin/AdminShellClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'EMMYLINK Admin Portal | CMS Dashboard',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user: any = null;
  let profile: { id: string; email: string; full_name?: string | null; role: string } | null = null;

  try {
    const supabase = await createClient();

    // 1. Get current authenticated user
    const { data: authData, error: authError } = await supabase.auth.getUser();
    user = authData?.user;

    if (authError || !user) {
      redirect('/admin/login');
    }

    // 2. Query admin_profiles table for authorized administrator role
    const { data: dbProfile, error: profileError } = await supabase
      .from('admin_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError || !dbProfile) {
      redirect('/admin/login?error=unauthorized');
    }

    profile = dbProfile as any;

    if (!profile || !['admin', 'super_admin'].includes(profile.role)) {
      redirect('/admin/login?error=unauthorized');
    }
  } catch (err: any) {
    // If Next.js redirect threw NEXT_REDIRECT, re-throw it so Next.js handles the redirect
    if (err?.message === 'NEXT_REDIRECT') {
      throw err;
    }
    console.error('Admin layout verification notice:', err);
    redirect('/admin/login?error=unauthorized');
  }

  return (
    <AdminShellClient user={user} profile={profile!}>
      {children}
    </AdminShellClient>
  );
}
