'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  LayoutDashboard,
  Sparkles,
  Info,
  Wrench,
  FolderGit2,
  Video,
  ShieldCheck,
  Image as ImageIcon,
  PhoneCall,
  Inbox,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  UserCheck,
} from 'lucide-react';

interface AdminShellClientProps {
  children: React.ReactNode;
  user: any;
  profile: {
    id: string;
    email: string;
    full_name?: string | null;
    role: string;
  };
}

const navItems = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Hero Section', href: '/admin/hero', icon: Sparkles },
  { label: 'About Section', href: '/admin/about', icon: Info },
  { label: 'Services', href: '/admin/services', icon: Wrench },
  { label: 'Project Portfolio', href: '/admin/projects', icon: FolderGit2 },
  { label: 'Showcase Video', href: '/admin/video', icon: Video },
  { label: 'Why Choose Us', href: '/admin/why-us', icon: ShieldCheck },
  { label: 'Media Library', href: '/admin/media', icon: ImageIcon },
  { label: 'Quote Leads', href: '/admin/leads', icon: Inbox },
  { label: 'Contact Details', href: '/admin/contact', icon: PhoneCall },
  { label: 'Site Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminShellClient({
  children,
  user,
  profile,
}: AdminShellClientProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
      setLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#141210] text-emmy-ivory flex">
      {/* Backdrop for mobile drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#1C1815] border-r border-emmy-bronze/25 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div>
          <div className="p-6 border-b border-emmy-charcoal-700/60 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="relative w-10 h-9 shrink-0">
                <Image
                  src="/images/emmylink-emblem.png"
                  alt="EMMYLINK Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <div className="text-base font-black tracking-wider uppercase text-white leading-none">
                  EMMY<span className="text-emmy-bronze">LINK</span>
                </div>
                <div className="text-[9px] font-bold tracking-[0.18em] text-emmy-gold uppercase mt-1">
                  CMS Admin Portal
                </div>
              </div>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden text-emmy-ivory-muted hover:text-white p-1"
              aria-label="Close Sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-220px)] custom-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold tracking-wide uppercase transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-emmy-bronze/25 to-emmy-bronze/10 text-emmy-gold border border-emmy-bronze/40 shadow-sm'
                      : 'text-emmy-ivory-muted hover:text-white hover:bg-emmy-charcoal-800/60'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-emmy-bronze-light' : 'text-emmy-ivory-muted'
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Footer & Logout */}
        <div className="p-4 border-t border-emmy-charcoal-700/60 bg-[#171412]">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-8 h-8 rounded-full bg-emmy-bronze/20 border border-emmy-bronze/40 text-emmy-gold flex items-center justify-center font-bold text-xs">
              {profile.full_name ? profile.full_name[0].toUpperCase() : 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">
                {profile.full_name || 'Administrator'}
              </p>
              <div className="flex items-center gap-1.5 text-[10px] text-emmy-gold truncate">
                <UserCheck className="w-3 h-3 text-emmy-bronze shrink-0" />
                <span className="capitalize">{profile.role}</span>
                <span className="text-neutral-500">•</span>
                <span className="text-neutral-400 truncate">{profile.email}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-emmy-charcoal-800 hover:bg-emmy-charcoal-700 border border-emmy-charcoal-700 text-[11px] font-semibold text-emmy-ivory-muted hover:text-white transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Site</span>
            </Link>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-[11px] font-semibold text-red-200 transition-colors disabled:opacity-50"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{loggingOut ? '...' : 'Sign Out'}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 h-16 bg-[#1A1715]/95 backdrop-blur-md border-b border-emmy-bronze/20 px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-emmy-charcoal-800 text-emmy-ivory hover:text-white border border-emmy-charcoal-700"
              aria-label="Open Navigation Drawer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-block text-xs uppercase font-bold tracking-widest text-emmy-gold/80">
                EMMYLINK CMS
              </span>
              <span className="hidden sm:inline-block text-neutral-600">/</span>
              <span className="text-xs font-semibold text-emmy-ivory truncate">
                {navItems.find((n) =>
                  n.href === '/admin' ? pathname === '/admin' : pathname.startsWith(n.href)
                )?.label || 'Dashboard'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Supabase Connected</span>
            </div>
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emmy-gold hover:text-emmy-bronze-light transition-colors py-1.5 px-3 rounded-lg border border-emmy-gold/30 hover:border-emmy-gold bg-emmy-gold/5"
            >
              <span>View Public Website</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
