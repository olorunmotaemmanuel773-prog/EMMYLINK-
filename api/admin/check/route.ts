import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ authenticated: false, isAdmin: false }, { status: 401 });
    }

    const { data: profile, error: profileError } = await supabase
      .from('admin_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    const role = (profile as any)?.role;
    const isActive = (profile as any)?.is_active ?? true;
    const isAdmin = !!(profile && ['admin', 'super_admin'].includes(role) && isActive);

    if (!isAdmin) {
      return NextResponse.json({ authenticated: true, isAdmin: false, error: 'Unauthorized role' }, { status: 403 });
    }

    return NextResponse.json({
      authenticated: true,
      isAdmin: true,
      user: {
        id: user.id,
        email: user.email,
        profile,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
