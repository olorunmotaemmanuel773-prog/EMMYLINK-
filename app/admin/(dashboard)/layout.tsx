import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AdminShellClient from '@/components/admin/AdminShellClient';

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

    // 1. Get authenticated user
    const { data: authData } = await supabase.auth.getUser();
    user = authData?.user;

    if (!user) {
      redirect('/admin/login');
    }

    // 2. Fetch admin profile
    const { data: dbProfile, error } = await supabase
      .from('admin_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error || !dbProfile) {
      redirect('/admin/login?error=unauthorized');
    }

    profile = dbProfile as any;

    if (!profile || !['admin', 'super_admin'].includes(profile.role)) {
      redirect('/admin/login?error=unauthorized');
    }
  } catch (err) {
    redirect('/admin/login?error=unauthorized');
  }

  return (
    <AdminShellClient user={user} profile={profile!}>
      {children}
    </AdminShellClient>
  );
}
