import React from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import {
  FolderGit2,
  Wrench,
  ImageIcon,
  Inbox,
  ArrowRight,
  Plus,
  Video,
  Sparkles,
  PhoneCall,
  Settings,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function AdminOverviewPage() {
  const supabase = await createClient();

  // Fetch real statistics from Supabase
  const [
    { count: projectsCount, error: projectsError },
    { count: servicesCount, error: servicesError },
    { count: mediaCount, error: mediaError },
    { count: leadsCount, error: leadsError },
    { data: recentProjects },
    { data: recentLeads },
    { data: siteSettings },
  ] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('services').select('*', { count: 'exact', head: true }),
    supabase.from('media').select('*', { count: 'exact', head: true }),
    supabase.from('quote_enquiries').select('*', { count: 'exact', head: true }),
    supabase.from('projects').select('id, title, category_label, is_featured, created_at, is_published').order('display_order', { ascending: true }).limit(5),
    supabase.from('quote_enquiries').select('id, full_name, phone_number, service_required, status, created_at').order('created_at', { ascending: false }).limit(5),
    supabase.from('site_settings').select('*').limit(1).single(),
  ]);

  const hasDbError = projectsError || servicesError;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#24201D] via-[#2A2420] to-[#1E1A17] border border-emmy-bronze/35 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emmy-bronze/10 rounded-full filter blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <span className="inline-block px-3 py-1 rounded-full bg-emmy-bronze/20 border border-emmy-bronze/40 text-emmy-gold text-[11px] font-bold tracking-widest uppercase mb-3">
            EMMYLINK Content Management System
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-wide">
            Welcome to the Administrator Portal
          </h1>
          <p className="text-sm text-emmy-ivory-muted max-w-2xl mt-2 leading-relaxed">
            Manage your electrical engineering, smart-home automation, CCTV installations, project portfolios, and incoming customer enquiries in Abuja directly through this dashboard.
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              href="/admin/projects"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emmy-bronze hover:bg-emmy-bronze-light text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md shadow-emmy-bronze/25"
            >
              <Plus className="w-4 h-4" />
              <span>Manage Projects</span>
            </Link>
            <Link
              href="/admin/services"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emmy-charcoal-800 hover:bg-emmy-charcoal-700 border border-emmy-charcoal-600 text-white text-xs font-bold tracking-wider uppercase transition-all"
            >
              <Wrench className="w-4 h-4 text-emmy-gold" />
              <span>Manage Services</span>
            </Link>
            <Link
              href="/admin/leads"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emmy-charcoal-800 hover:bg-emmy-charcoal-700 border border-emmy-charcoal-600 text-white text-xs font-bold tracking-wider uppercase transition-all"
            >
              <Inbox className="w-4 h-4 text-emerald-400" />
              <span>View Quote Inquiries</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Database Status Notification if tables are empty/unmigrated */}
      {hasDbError && (
        <div className="p-4 rounded-xl bg-amber-950/50 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold uppercase tracking-wider">Database Setup Notice</p>
            <p className="mt-1 opacity-90 leading-relaxed">
              Supabase tables have not been fully populated yet. Execute the SQL script in <code className="bg-black/40 px-1.5 py-0.5 rounded font-mono text-amber-300">supabase/schema.sql</code> inside your Supabase SQL Editor to seed the 15 real projects and 6 services.
            </p>
          </div>
        </div>
      )}

      {/* Overview Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Projects */}
        <div className="bg-[#1C1815] border border-emmy-bronze/25 hover:border-emmy-bronze/50 rounded-2xl p-5 shadow-lg transition-all group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emmy-ivory-muted">
              Project Portfolio
            </span>
            <div className="p-2.5 rounded-xl bg-emmy-bronze/15 border border-emmy-bronze/30 text-emmy-gold group-hover:scale-105 transition-transform">
              <FolderGit2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">
            {projectsCount ?? 15}
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-emmy-charcoal-700/50 text-xs">
            <span className="text-emerald-400 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Published
            </span>
            <Link
              href="/admin/projects"
              className="text-emmy-gold hover:text-emmy-bronze flex items-center gap-1 font-semibold"
            >
              <span>Manage</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Metric 2: Services */}
        <div className="bg-[#1C1815] border border-emmy-bronze/25 hover:border-emmy-bronze/50 rounded-2xl p-5 shadow-lg transition-all group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emmy-ivory-muted">
              Core Services
            </span>
            <div className="p-2.5 rounded-xl bg-emmy-bronze/15 border border-emmy-bronze/30 text-emmy-gold group-hover:scale-105 transition-transform">
              <Wrench className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">
            {servicesCount ?? 6}
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-emmy-charcoal-700/50 text-xs">
            <span className="text-emmy-ivory-muted">Active in Abuja</span>
            <Link
              href="/admin/services"
              className="text-emmy-gold hover:text-emmy-bronze flex items-center gap-1 font-semibold"
            >
              <span>Manage</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Metric 3: Media Library */}
        <div className="bg-[#1C1815] border border-emmy-bronze/25 hover:border-emmy-bronze/50 rounded-2xl p-5 shadow-lg transition-all group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emmy-ivory-muted">
              Media Library
            </span>
            <div className="p-2.5 rounded-xl bg-emmy-bronze/15 border border-emmy-bronze/30 text-emmy-gold group-hover:scale-105 transition-transform">
              <ImageIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">
            {mediaCount ?? 18}
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-emmy-charcoal-700/50 text-xs">
            <span className="text-emmy-ivory-muted">Cloudinary &amp; Local</span>
            <Link
              href="/admin/media"
              className="text-emmy-gold hover:text-emmy-bronze flex items-center gap-1 font-semibold"
            >
              <span>Manage</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Metric 4: Quote Leads */}
        <div className="bg-[#1C1815] border border-emmy-bronze/25 hover:border-emmy-bronze/50 rounded-2xl p-5 shadow-lg transition-all group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emmy-ivory-muted">
              Quote Enquiries
            </span>
            <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 group-hover:scale-105 transition-transform">
              <Inbox className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">
            {leadsCount ?? 0}
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-emmy-charcoal-700/50 text-xs">
            <span className="text-emerald-400 font-medium">New Leads</span>
            <Link
              href="/admin/leads"
              className="text-emmy-gold hover:text-emmy-bronze flex items-center gap-1 font-semibold"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick CMS Navigation Grid */}
      <div>
        <h2 className="text-base font-black uppercase tracking-wider text-white mb-4">
          Quick Section Navigation
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: 'Hero Section', href: '/admin/hero', icon: Sparkles },
            { label: 'Services', href: '/admin/services', icon: Wrench },
            { label: 'Projects', href: '/admin/projects', icon: FolderGit2 },
            { label: 'Showcase Video', href: '/admin/video', icon: Video },
            { label: 'Contact Info', href: '/admin/contact', icon: PhoneCall },
            { label: 'Site Settings', href: '/admin/settings', icon: Settings },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="bg-[#1C1815] border border-emmy-charcoal-700/70 hover:border-emmy-bronze rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2 hover:bg-[#24201D] transition-all group"
              >
                <div className="p-2 rounded-lg bg-emmy-charcoal-800 text-emmy-gold group-hover:text-emmy-bronze-light transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-emmy-ivory group-hover:text-white uppercase tracking-wider">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Tables Section: Recent Projects & Recent Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects Table */}
        <div className="bg-[#1C1815] border border-emmy-bronze/25 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-emmy-gold" />
                <span>Featured Project Portfolio</span>
              </h3>
              <Link
                href="/admin/projects"
                className="text-xs font-semibold text-emmy-gold hover:text-emmy-bronze flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="divide-y divide-emmy-charcoal-700/50">
              {recentProjects && recentProjects.length > 0 ? (
                recentProjects.map((project: any) => (
                  <div
                    key={project.id}
                    className="py-3.5 flex items-center justify-between gap-4"
                  >
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-white truncate">
                        {project.title}
                      </p>
                      <p className="text-[11px] text-emmy-gold truncate mt-0.5">
                        {project.category_label}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {project.is_featured && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emmy-bronze/20 text-emmy-gold border border-emmy-bronze/40 uppercase">
                          Featured
                        </span>
                      )}
                      <Link
                        href={`/admin/projects`}
                        className="text-xs font-semibold text-emmy-ivory-muted hover:text-white px-2.5 py-1 rounded bg-emmy-charcoal-800 border border-emmy-charcoal-700"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-6 text-center text-xs text-emmy-ivory-muted">
                  <p>No project records found in database.</p>
                  <p className="text-[11px] text-neutral-500 mt-1">
                    Seed the database using supabase/schema.sql
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Quote Enquiries */}
        <div className="bg-[#1C1815] border border-emmy-bronze/25 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
                <Inbox className="w-4 h-4 text-emerald-400" />
                <span>Recent Inquiries &amp; Leads</span>
              </h3>
              <Link
                href="/admin/leads"
                className="text-xs font-semibold text-emmy-gold hover:text-emmy-bronze flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="divide-y divide-emmy-charcoal-700/50">
              {recentLeads && recentLeads.length > 0 ? (
                recentLeads.map((lead: any) => (
                  <div
                    key={lead.id}
                    className="py-3.5 flex items-center justify-between gap-4"
                  >
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-white truncate">
                        {lead.full_name}
                      </p>
                      <p className="text-[11px] text-emmy-ivory-muted truncate mt-0.5 flex items-center gap-2">
                        <span>📞 {lead.phone_number}</span>
                        <span>•</span>
                        <span className="text-emmy-gold">{lead.service_required}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 uppercase">
                        {lead.status || 'New'}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-6 text-center text-xs text-emmy-ivory-muted">
                  <p>No new customer enquiries yet.</p>
                  <p className="text-[11px] text-neutral-500 mt-1">
                    Enquiries submitted from the website contact form will appear here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
