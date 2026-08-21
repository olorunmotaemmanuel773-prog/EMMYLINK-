import React from 'react';
import { createClient } from '@/lib/supabase/server';
import {
  defaultSiteSettings,
  defaultHero,
  defaultAbout,
  defaultServices,
  defaultShowcaseVideo,
  defaultProjects,
  defaultWhyUs,
} from '@/fallback';
import PublicWebsiteClient from '@/components/public/PublicWebsiteClient';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let siteSettings: any = defaultSiteSettings;
  let hero: any = defaultHero;
  let about: any = defaultAbout;
  let services: any[] = defaultServices;
  let showcaseVideo: any = defaultShowcaseVideo;
  let projects: any[] = defaultProjects;
  let whyUs: any[] = defaultWhyUs;

  try {
    const supabase = await createClient();

    const [
      { data: dbSettings },
      { data: dbHero },
      { data: dbAbout },
      { data: dbServices },
      { data: dbShowcase },
      { data: dbProjects },
      { data: dbWhyUs },
    ] = await Promise.all([
      supabase.from('site_settings').select('*').limit(1).single(),
      supabase.from('hero').select('*').eq('is_active', true).limit(1).single(),
      supabase.from('about').select('*').eq('is_active', true).limit(1).single(),
      supabase.from('services').select('*').eq('is_published', true).order('display_order', { ascending: true }),
      supabase.from('showcase_video').select('*').eq('is_active', true).limit(1).single(),
      supabase.from('projects').select('*').eq('is_published', true).order('display_order', { ascending: true }),
      supabase.from('why_us').select('*').eq('is_published', true).order('display_order', { ascending: true }),
    ]);

    if (dbSettings) siteSettings = { ...defaultSiteSettings, ...(dbSettings as any) };
    if (dbHero) hero = { ...defaultHero, ...(dbHero as any) };
    if (dbAbout) about = { ...defaultAbout, ...(dbAbout as any) };
    if (dbServices && (dbServices as any[]).length > 0) services = dbServices as any[];
    if (dbShowcase) showcaseVideo = { ...defaultShowcaseVideo, ...(dbShowcase as any) };
    if (dbProjects && (dbProjects as any[]).length > 0) projects = dbProjects as any[];
    if (dbWhyUs && (dbWhyUs as any[]).length > 0) whyUs = dbWhyUs as any[];
  } catch (error) {
    // Gracefully fallback to default static data
    console.warn('Supabase fetch failed, rendering with complete fallback content:', error);
  }

  return (
    <PublicWebsiteClient
      siteSettings={siteSettings}
      hero={hero}
      about={about}
      services={services}
      showcaseVideo={showcaseVideo}
      projects={projects}
      whyUs={whyUs}
    />
  );
}
