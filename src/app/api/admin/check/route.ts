import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ authenticated: false, isAdmin: false }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from('admin_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    const role = (profile as any)?.role;
    const isAdmin = !!(profile && ['admin', 'super_admin'].includes(role));

    return NextResponse.json({
      authenticated: true,
      isAdmin,
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
