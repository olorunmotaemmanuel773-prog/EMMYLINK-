-- ==============================================================================
-- EMMYLINK ELECTRICAL & SMART SOLUTIONS — MASTER SUPABASE DATABASE SCHEMA
-- Version: 3.1 (Order Fixed: Tables Created First, Hardened RLS & Dynamic CMS)
-- Target Project: https://gynzzbqwivpbsviwhdbl.supabase.co
-- Location: Abuja, Nigeria
-- ==============================================================================

-- Enable required PostgreSQL extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 1. TABLE DEFINITIONS (CREATED FIRST)
-- ==============================================================================

-- Admin User Profiles (Explicit Administrator Authorization)
CREATE TABLE IF NOT EXISTS public.admin_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role TEXT NOT NULL DEFAULT 'admin', -- 'super_admin', 'admin'
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site Settings (Global configuration & SEO)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name TEXT NOT NULL DEFAULT 'EMMYLINK',
    company_tagline TEXT NOT NULL DEFAULT 'ELECTRICAL & SMART SOLUTIONS',
    slogan TEXT NOT NULL DEFAULT 'POWERING YOUR SPACE. SMARTENING YOUR FUTURE.',
    location_city TEXT NOT NULL DEFAULT 'Abuja',
    location_state TEXT NOT NULL DEFAULT 'FCT',
    location_country TEXT NOT NULL DEFAULT 'Nigeria',
    phone_number TEXT NOT NULL DEFAULT '07088615600',
    whatsapp_number TEXT NOT NULL DEFAULT '2347088615600',
    default_whatsapp_message TEXT DEFAULT 'Hello EMMYLINK, I found your website and I would like to make an enquiry about your services.',
    email_address TEXT NOT NULL DEFAULT 'fability634@gmail.com',
    office_address TEXT NOT NULL DEFAULT 'Abuja, FCT, Nigeria',
    logo_url TEXT DEFAULT '/images/emmylink-emblem.png',
    favicon_url TEXT DEFAULT '/images/favicon.png',
    og_image_url TEXT DEFAULT '/images/real-luxury-living-room.jpg',
    seo_title TEXT DEFAULT 'EMMYLINK | Electrical Installation, Smart Home Automation & Security in Abuja',
    seo_description TEXT DEFAULT 'EMMYLINK delivers professional electrical engineering, smart home automation, 4K CCTV surveillance, automatic gates, solar backup power, and structured low-voltage systems in Abuja, Nigeria.',
    facebook_url TEXT DEFAULT '',
    instagram_url TEXT DEFAULT '',
    linkedin_url TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hero Section Configuration
CREATE TABLE IF NOT EXISTS public.hero (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    badge_text TEXT NOT NULL DEFAULT 'ABUJA, NIGERIA',
    headline_line1 TEXT NOT NULL DEFAULT 'POWERING YOUR SPACE.',
    headline_line2 TEXT NOT NULL DEFAULT 'SMARTENING YOUR FUTURE.',
    subtext TEXT NOT NULL DEFAULT 'Professional electrical installation, smart home automation, CCTV & security solutions in Abuja.',
    cta_primary_text TEXT NOT NULL DEFAULT 'GET A FREE QUOTE',
    cta_primary_link TEXT NOT NULL DEFAULT '#contact',
    cta_secondary_text TEXT NOT NULL DEFAULT 'VIEW OUR SERVICES',
    cta_secondary_link TEXT NOT NULL DEFAULT '#services',
    bg_media_type TEXT NOT NULL DEFAULT 'video', -- 'video' | 'image'
    bg_video_url TEXT DEFAULT '/videos/emmylink-tv-wall-project.mp4',
    bg_poster_url TEXT DEFAULT '/images/video-poster.jpg',
    bg_image_url TEXT DEFAULT '/images/real-luxury-living-room.jpg',
    stat_1_value TEXT DEFAULT '3-PHASE',
    stat_1_label TEXT DEFAULT 'Power Distribution',
    stat_2_value TEXT DEFAULT 'SMART IOT',
    stat_2_label TEXT DEFAULT 'Automation Hubs',
    stat_3_value TEXT DEFAULT '4K IP POE',
    stat_3_label TEXT DEFAULT 'Surveillance Grid',
    stat_4_value TEXT DEFAULT '100% CLEAN',
    stat_4_label TEXT DEFAULT 'Conduit & Trunking',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- About Section Configuration
CREATE TABLE IF NOT EXISTS public.about (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tag_label TEXT NOT NULL DEFAULT 'ABOUT EMMYLINK',
    headline_part1 TEXT NOT NULL DEFAULT 'PROFESSIONAL POWER.',
    headline_part2 TEXT NOT NULL DEFAULT 'INTELLIGENT AUTOMATION.',
    lead_paragraph TEXT NOT NULL DEFAULT 'EMMYLINK provides professional electrical installation, smart-home automation, CCTV, security and modern technology solutions for residential and commercial clients in Abuja.',
    secondary_paragraph TEXT NOT NULL DEFAULT 'Our engineering approach combines meticulous technical workmanship, compliant wiring standards, and modern technology to deliver dependable electrical infrastructure and seamless smart home control that elevates your property.',
    main_image_url TEXT DEFAULT '/images/real-luxury-living-room.jpg',
    badge_title TEXT DEFAULT 'STANDARDS-DRIVEN',
    badge_subtitle TEXT DEFAULT 'Tested & Commissioned in Abuja',
    pillar_1_title TEXT DEFAULT 'Residential & Commercial',
    pillar_1_desc TEXT DEFAULT 'Custom installations for luxury villas, duplexes, plazas, and corporate offices.',
    pillar_2_title TEXT DEFAULT 'Clean Cable Dressing',
    pillar_2_desc TEXT DEFAULT 'Neat conduit routing, labeled terminals, and secure distribution board assembly.',
    pillar_3_title TEXT DEFAULT 'Smart Ecosystems',
    pillar_3_desc TEXT DEFAULT 'Zigbee, Wi-Fi, and hardwired relay protocols configured for zero latency.',
    pillar_4_title TEXT DEFAULT 'Direct Abuja Support',
    pillar_4_desc TEXT DEFAULT 'On-site technical consultations and responsive engineering support across the FCT.',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services Table
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_number TEXT NOT NULL,
    title TEXT NOT NULL,
    service_key TEXT UNIQUE NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    features JSONB DEFAULT '[]'::jsonb,
    icon_name TEXT DEFAULT 'zap',
    display_order INT DEFAULT 1,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects Table (Portfolio)
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE,
    categories TEXT[] NOT NULL DEFAULT '{}',
    category_label TEXT NOT NULL,
    badge_label TEXT NOT NULL,
    caption TEXT NOT NULL,
    what_we_did TEXT NOT NULL,
    project_type TEXT NOT NULL,
    result TEXT NOT NULL,
    main_image_url TEXT NOT NULL,
    grid_span TEXT DEFAULT 'span-third',
    is_featured BOOLEAN DEFAULT FALSE,
    featured_checklist JSONB DEFAULT '[]'::jsonb,
    featured_order INT DEFAULT 0,
    display_order INT DEFAULT 1,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project Additional Images (Galleries)
CREATE TABLE IF NOT EXISTS public.project_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption TEXT DEFAULT '',
    display_order INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Featured Video Showcase Section
CREATE TABLE IF NOT EXISTS public.showcase_video (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_tag TEXT DEFAULT 'SEE OUR WORK IN ACTION',
    title TEXT NOT NULL DEFAULT 'Completed Luxury TV-Wall & Smart Lounge Project',
    subtitle TEXT NOT NULL DEFAULT 'Explore one of our completed electrical and smart-home installations in Abuja featuring synchronized motorized drapery, custom media unit cabling, and continuous architectural warm cove illumination.',
    video_url TEXT NOT NULL DEFAULT '/videos/emmylink-tv-wall-project.mp4',
    poster_url TEXT NOT NULL DEFAULT '/images/video-poster.jpg',
    cloudinary_public_id TEXT DEFAULT '',
    cta_primary_text TEXT DEFAULT 'BOOK A CONSULTATION',
    cta_primary_link TEXT DEFAULT '#contact',
    cta_whatsapp_text TEXT DEFAULT 'DISCUSS ON WHATSAPP',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Why Choose Us Table
CREATE TABLE IF NOT EXISTS public.why_us (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon_name TEXT DEFAULT 'check-circle',
    display_order INT DEFAULT 1,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Dynamic Homepage Sections Table (Order & Visibility)
CREATE TABLE IF NOT EXISTS public.homepage_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_key TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    is_enabled BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Estimator Calculator Services
CREATE TABLE IF NOT EXISTS public.estimator_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_key TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    base_price_ngn NUMERIC NOT NULL,
    display_order INT DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact & Quote Enquiries (Customer leads)
CREATE TABLE IF NOT EXISTS public.quote_enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    email TEXT,
    service_required TEXT NOT NULL,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'NEW',
    notes TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Media Assets Metadata Table (Cloudinary + Local)
CREATE TABLE IF NOT EXISTS public.media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_name TEXT NOT NULL,
    file_type TEXT NOT NULL,
    cloudinary_public_id TEXT,
    secure_url TEXT NOT NULL,
    format TEXT,
    width INT,
    height INT,
    bytes BIGINT,
    folder TEXT DEFAULT 'emmylink',
    alt_text TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audit Logs Table (Full Traceability of CMS Actions)
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    admin_email TEXT NOT NULL,
    action TEXT NOT NULL,
    entity TEXT NOT NULL,
    entity_id TEXT,
    details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 2. HELPER FUNCTIONS & TRIGGERS
-- ==============================================================================

-- Automatic timestamp updater trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Secure Admin Verification Function (Prevents RLS infinite recursion)
-- SECURITY DEFINER allows it to read admin_profiles safely without triggering RLS loops
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public, auth
STABLE
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.admin_profiles
        WHERE id = auth.uid()
          AND role IN ('admin', 'super_admin')
          AND is_active = TRUE
    );
$$;

-- Secure Super Admin Verification Function
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public, auth
STABLE
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.admin_profiles
        WHERE id = auth.uid()
          AND role = 'super_admin'
          AND is_active = TRUE
    );
$$;

-- ==============================================================================
-- 3. INDEXES FOR PERFORMANCE
-- ==============================================================================

CREATE INDEX IF NOT EXISTS idx_services_published_order ON public.services(is_published, display_order);
CREATE INDEX IF NOT EXISTS idx_projects_published_order ON public.projects(is_published, display_order);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(is_featured, featured_order);
CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON public.project_images(project_id, display_order);
CREATE INDEX IF NOT EXISTS idx_why_us_published_order ON public.why_us(is_published, display_order);
CREATE INDEX IF NOT EXISTS idx_homepage_sections_order ON public.homepage_sections(is_enabled, display_order);
CREATE INDEX IF NOT EXISTS idx_quote_enquiries_status ON public.quote_enquiries(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_media_file_type ON public.media(file_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at DESC);

-- ==============================================================================
-- 4. AUTOMATIC UPDATED_AT TRIGGERS
-- ==============================================================================

DROP TRIGGER IF EXISTS set_site_settings_updated_at ON public.site_settings;
CREATE TRIGGER set_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_hero_updated_at ON public.hero;
CREATE TRIGGER set_hero_updated_at BEFORE UPDATE ON public.hero FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_about_updated_at ON public.about;
CREATE TRIGGER set_about_updated_at BEFORE UPDATE ON public.about FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_services_updated_at ON public.services;
CREATE TRIGGER set_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_projects_updated_at ON public.projects;
CREATE TRIGGER set_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_showcase_video_updated_at ON public.showcase_video;
CREATE TRIGGER set_showcase_video_updated_at BEFORE UPDATE ON public.showcase_video FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_why_us_updated_at ON public.why_us;
CREATE TRIGGER set_why_us_updated_at BEFORE UPDATE ON public.why_us FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_homepage_sections_updated_at ON public.homepage_sections;
CREATE TRIGGER set_homepage_sections_updated_at BEFORE UPDATE ON public.homepage_sections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_quote_enquiries_updated_at ON public.quote_enquiries;
CREATE TRIGGER set_quote_enquiries_updated_at BEFORE UPDATE ON public.quote_enquiries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_admin_profiles_updated_at ON public.admin_profiles;
CREATE TRIGGER set_admin_profiles_updated_at BEFORE UPDATE ON public.admin_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- 5. HARDENED ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.showcase_video ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.why_us ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.estimator_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- A. Public Read Policies
DROP POLICY IF EXISTS "Public can view site settings" ON public.site_settings;
CREATE POLICY "Public can view site settings" ON public.site_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view active hero" ON public.hero;
CREATE POLICY "Public can view active hero" ON public.hero FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public can view active about" ON public.about;
CREATE POLICY "Public can view active about" ON public.about FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public can view published services" ON public.services;
CREATE POLICY "Public can view published services" ON public.services FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Public can view published projects" ON public.projects;
CREATE POLICY "Public can view published projects" ON public.projects FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Public can view project images" ON public.project_images;
CREATE POLICY "Public can view project images" ON public.project_images FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view active showcase video" ON public.showcase_video;
CREATE POLICY "Public can view active showcase video" ON public.showcase_video FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public can view published why_us" ON public.why_us;
CREATE POLICY "Public can view published why_us" ON public.why_us FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Public can view enabled homepage sections" ON public.homepage_sections;
CREATE POLICY "Public can view enabled homepage sections" ON public.homepage_sections FOR SELECT USING (is_enabled = true);

DROP POLICY IF EXISTS "Public can view active estimator services" ON public.estimator_services;
CREATE POLICY "Public can view active estimator services" ON public.estimator_services FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public can view media" ON public.media;
CREATE POLICY "Public can view media" ON public.media FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can submit quote enquiry" ON public.quote_enquiries;
CREATE POLICY "Public can submit quote enquiry" ON public.quote_enquiries FOR INSERT WITH CHECK (true);

-- B. Strict Admin Policies (Checked via public.is_admin())
DROP POLICY IF EXISTS "Admin full access site_settings" ON public.site_settings;
CREATE POLICY "Admin full access site_settings" ON public.site_settings FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admin full access hero" ON public.hero;
CREATE POLICY "Admin full access hero" ON public.hero FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admin full access about" ON public.about;
CREATE POLICY "Admin full access about" ON public.about FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admin full access services" ON public.services;
CREATE POLICY "Admin full access services" ON public.services FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admin full access projects" ON public.projects;
CREATE POLICY "Admin full access projects" ON public.projects FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admin full access project_images" ON public.project_images;
CREATE POLICY "Admin full access project_images" ON public.project_images FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admin full access showcase_video" ON public.showcase_video;
CREATE POLICY "Admin full access showcase_video" ON public.showcase_video FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admin full access why_us" ON public.why_us;
CREATE POLICY "Admin full access why_us" ON public.why_us FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admin full access homepage_sections" ON public.homepage_sections;
CREATE POLICY "Admin full access homepage_sections" ON public.homepage_sections FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admin full access estimator_services" ON public.estimator_services;
CREATE POLICY "Admin full access estimator_services" ON public.estimator_services FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admin full access quote_enquiries" ON public.quote_enquiries;
CREATE POLICY "Admin full access quote_enquiries" ON public.quote_enquiries FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admin full access media" ON public.media;
CREATE POLICY "Admin full access media" ON public.media FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admin read audit_logs" ON public.audit_logs;
CREATE POLICY "Admin read audit_logs" ON public.audit_logs FOR SELECT TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "Admin insert audit_logs" ON public.audit_logs;
CREATE POLICY "Admin insert audit_logs" ON public.audit_logs FOR INSERT TO authenticated WITH CHECK (public.is_admin());

-- C. Super Admin Management Policies
DROP POLICY IF EXISTS "Admin can view own profile" ON public.admin_profiles;
CREATE POLICY "Admin can view own profile" ON public.admin_profiles FOR SELECT TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "Super admin view all admin profiles" ON public.admin_profiles;
CREATE POLICY "Super admin view all admin profiles" ON public.admin_profiles FOR SELECT TO authenticated USING (public.is_super_admin());

DROP POLICY IF EXISTS "Super admin manage admin profiles" ON public.admin_profiles;
CREATE POLICY "Super admin manage admin profiles" ON public.admin_profiles FOR ALL TO authenticated USING (public.is_super_admin()) WITH CHECK (public.is_super_admin());

-- ==============================================================================
-- 6. INITIAL SEED DATA (Pre-populating real Abuja content)
-- ==============================================================================

INSERT INTO public.site_settings (company_name, company_tagline, slogan, phone_number, whatsapp_number, default_whatsapp_message, email_address, office_address, logo_url, favicon_url)
VALUES (
    'EMMYLINK',
    'ELECTRICAL & SMART SOLUTIONS',
    'POWERING YOUR SPACE. SMARTENING YOUR FUTURE.',
    '07088615600',
    '2347088615600',
    'Hello EMMYLINK, I found your website and I would like to make an enquiry about your services.',
    'fability634@gmail.com',
    'Abuja, FCT, Nigeria',
    '/images/emmylink-emblem.png',
    '/images/favicon.png'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hero (badge_text, headline_line1, headline_line2, subtext, bg_media_type, bg_video_url, bg_poster_url)
VALUES (
    'ABUJA, NIGERIA',
    'POWERING YOUR SPACE.',
    'SMARTENING YOUR FUTURE.',
    'Professional electrical installation, smart home automation, CCTV & security solutions in Abuja.',
    'video',
    '/videos/emmylink-tv-wall-project.mp4',
    '/images/video-poster.jpg'
) ON CONFLICT DO NOTHING;

INSERT INTO public.about (tag_label, headline_part1, headline_part2, lead_paragraph, secondary_paragraph, main_image_url)
VALUES (
    'ABOUT EMMYLINK',
    'PROFESSIONAL POWER.',
    'INTELLIGENT AUTOMATION.',
    'EMMYLINK provides professional electrical installation, smart-home automation, CCTV, security and modern technology solutions for residential and commercial clients in Abuja.',
    'Our engineering approach combines meticulous technical workmanship, compliant wiring standards, and modern technology to deliver dependable electrical infrastructure and seamless smart home control that elevates your property.',
    '/images/real-luxury-living-room.jpg'
) ON CONFLICT DO NOTHING;

INSERT INTO public.services (service_number, title, service_key, short_description, full_description, icon_name, display_order)
VALUES
('01', 'Electrical Installation', 'electrical', 'Residential and commercial 3-phase wiring, precision distribution board (DB) building, surge protective device (SPD) installation, earthing systems, and balanced load management.', 'Residential and commercial conduit piping, 3-phase load calculation, precision DB board assembly, DIN-rail surge protective devices (SPD), earthing systems, and load balancing across all circuits in Abuja.', 'zap', 1),
('02', 'Smart Home Automation', 'automation', 'Capacitive touch glass switches, automated scene lighting, motorized drapery tracks, climate control, and unified smartphone or voice command ecosystems.', 'Integrated smart living ecosystems allowing centralized control of architectural lighting, motorized curtains, climate, and security via capacitive wall touch panels, Apple Home, Google Assistant, or smartphone app.', 'home', 2),
('03', 'CCTV & Security', 'cctv', '4K Ultra-HD PoE IP surveillance, central multi-channel monitoring consoles, color night vision dome cameras, AI human and vehicle detection, and encrypted remote streaming.', 'Commercial-grade 4K ultra-high-definition IP surveillance, multi-channel central monitoring consoles, infrared night vision, perimeter intrusion detection, smart AI vehicle/human identification, and secure multi-device remote live streaming.', 'camera', 3),
('04', 'Power Distribution', 'gates', 'Heavy-duty industrial MCCB panels, automatic transfer switch (ATS) changeovers, load balancing, phase selectors, and surge protection systems.', 'Heavy-duty industrial MCCB panels, automatic transfer switch (ATS) changeovers, load balancing, phase selectors, and surge protection systems.', 'shield', 4),
('05', 'Lighting Solutions', 'solar', 'Architectural magnetic track lights, 3000K warm false ceiling cove illumination, step riser lighting, custom cabinetry LED profiles, and DALI smart dimming.', 'Architectural magnetic track lights, 3000K warm false ceiling cove illumination, step riser lighting, custom cabinetry LED profiles, and DALI smart dimming.', 'sun', 5),
('06', 'IoT & Automation', 'networking', 'Structured CAT6A cabling, server rack management, IP PBX intercom telecommunications, managed PoE switches, and whole-property Wi-Fi mesh systems.', 'Structured CAT6A cabling, server rack management, IP PBX intercom telecommunications, managed PoE switches, and whole-property Wi-Fi mesh systems.', 'server', 6)
ON CONFLICT (service_key) DO NOTHING;

INSERT INTO public.showcase_video (section_tag, title, subtitle, video_url, poster_url)
VALUES (
    'SEE OUR WORK IN ACTION',
    'Completed Luxury TV-Wall & Smart Lounge Project',
    'Explore one of our completed electrical and smart-home installations in Abuja featuring synchronized motorized drapery, custom media unit cabling, and continuous architectural warm cove illumination.',
    '/videos/emmylink-tv-wall-project.mp4',
    '/images/video-poster.jpg'
) ON CONFLICT DO NOTHING;

INSERT INTO public.projects (title, categories, category_label, badge_label, caption, what_we_did, project_type, result, main_image_url, grid_span, is_featured, featured_order, display_order)
VALUES
(
    'Felicitysolar Hybrid Inverter & Dual Wall Lithium Storage',
    ARRAY['electrical', 'automation'],
    'Solar & Power Distribution',
    'SOLAR • FELICITY LITHIUM MATRIX',
    'Dual rotary changeover, DC breaker protection & wall-mounted LiFePO4 batteries',
    'Installed and commissioned a wall-mounted Felicitysolar hybrid inverter system with dual rotary changeover switches, DC circuit breakers, and two wall-mount Felicitysolar lithium battery packs.',
    'Solar Hybrid Power Systems',
    '24/7 uninterrupted power storage with digital battery state-of-charge telemetry and clean PVC conduit protection.',
    '/images/real-felicity-solar-system.jpg',
    'span-large',
    TRUE,
    1,
    1
),
(
    'Central Multi-Channel IP CCTV Monitoring Station',
    ARRAY['cctv & security'],
    'CCTV & Security',
    'CCTV • CENTRAL MONITORING',
    'Live 24-feed surveillance console, perimeter gates & facility monitoring',
    'Installed and configured a multi-camera centralized Hikvision video surveillance control console displaying live real-time coverage across perimeter access gates, entry staircases, reception foyer, conference rooms, executive offices, and parking grounds.',
    'CCTV & Security Systems',
    'Comprehensive 24/7 security monitoring with simultaneous high-definition camera feeds, motion detection indicators, and centralized surveillance management on a large display console.',
    '/images/real-cctv-monitoring-station.jpg',
    'span-medium',
    TRUE,
    2,
    2
),
(
    'Biometric Fingerprint & RFID Access Control for Glass Doors',
    ARRAY['cctv & security', 'automation'],
    'Access Control',
    'ACCESS CONTROL • GLASS DOOR BIOMETRICS',
    'Keypad access controller, color LCD screen & illuminated fingerprint reader',
    'Installed and programmed an optical biometric fingerprint and RFID smart card reader terminal with color LCD display and backlit keypad on a frameless architectural glass door.',
    'Commercial Access Control',
    'Keyless, high-security entry authentication with illuminated optical biometric scanning for corporate facilities.',
    '/images/real-biometric-glass-door-access.jpg',
    'span-half',
    FALSE,
    0,
    3
),
(
    'Dual Hybrid Solar Inverter System & Lithium Battery Bank',
    ARRAY['electrical', 'automation'],
    'Solar & Power Distribution',
    'SOLAR • DUAL HYBRID POWER',
    'Dual hybrid inverters with high-capacity floor-standing battery storage',
    'Configured dual wall-mounted hybrid solar inverters with dedicated DC protection enclosures and a multi-tier floor-standing lithium battery storage cabinet.',
    'Commercial & Estate Solar Infrastructure',
    'Scalable high-capacity energy storage ensuring continuous heavy-load operations with zero downtime.',
    '/images/real-dual-inverter-battery-bank.jpg',
    'span-half',
    FALSE,
    0,
    4
),
(
    'Biometric Fingerprint & Digital Smart Door Lock',
    ARRAY['cctv & security', 'smart home', 'automation'],
    'Smart Home & Access',
    'ACCESS CONTROL • SMART LOCK',
    'Optical fingerprint sensor, backlit keypad & digital OLED display',
    'Installed and programmed a luxury digital smart door lock featuring an optical biometric fingerprint sensor with LED status ring, backlit capacitive touch numeric keypad, integrated digital status display, and video intercom camera on a modern dark door.',
    'Smart Lock & Access Control Systems',
    'Keyless, high-security door access with multi-factor authentication for reliable residential entry control.',
    '/images/real-smart-lock-keypad.jpg',
    'span-third',
    FALSE,
    0,
    5
),
(
    'Precision Residential Distribution Board with Schneider Breakers',
    ARRAY['electrical'],
    'Electrical Installation',
    'ELECTRICAL • DISTRIBUTION BOARD',
    'Neat conduit entries, organized circuit combing & MCB protection',
    'Assembled a clean residential distribution board with conduit pipe entries, organized cable-tied circuit wiring, Schneider Electric miniature circuit breakers (MCBs), main isolator, neutral busbars, and earth bonding.',
    'Electrical Installation & Distribution Boards',
    'Clean, safe, and organized circuit distribution with clear conductor dressing and overload protection.',
    '/images/real-schneider-db-board.jpg',
    'span-third',
    TRUE,
    3,
    6
),
(
    'Enterprise Server Rack with Mikrotik & D-Link PoE Switching',
    ARRAY['automation'],
    'Networking & IoT Infrastructure',
    'NETWORKING • SERVER RACK',
    'Mikrotik routerboard, D-Link PoE switches & CommScope patch panels',
    'Installed and terminated structured CAT6 network cabling inside a heavy-duty server rack equipped with Mikrotik routerboards, D-Link PoE gigabit switches, and CommScope patch panels with active LED link monitoring.',
    'Structured Networking & Server Infrastructure',
    'High-bandwidth, organized network backbone delivering centralized data, Wi-Fi, and PoE power to all connected IP devices and cameras.',
    '/images/real-enterprise-server-rack.jpg',
    'span-third',
    FALSE,
    0,
    7
),
(
    '3-Phase Industrial MCCB Incomer & Main Power Feed',
    ARRAY['electrical'],
    'Electrical Installation',
    'ELECTRICAL • 3-PHASE MCCB',
    '100A molded-case circuit breakers with color-coded power feeds',
    'Terminated heavy-gauge phase and neutral power cables into 100A/125A 3-phase molded-case circuit breakers (MCCB) with insulated bootlace lugs and mechanical test trip switches.',
    'Electrical Installation & Heavy Power Distribution',
    'Heavy-duty main incoming power protection capable of handling high continuous commercial and residential electrical loads.',
    '/images/real-heavy-mccb-breakers.jpg',
    'span-third',
    FALSE,
    0,
    8
),
(
    'Automated Multi-Zone AC Contactor & Load Control Panel',
    ARRAY['electrical', 'automation', 'smart home'],
    'Smart Home Automation',
    'AUTOMATION • HVAC CONTACTOR',
    'Dedicated Chint MCB & LC1-D magnetic contactor automation',
    'Built an automation control panel utilizing Chint MCBs and LC1-D magnetic contactors with designated zone labeling and slotted cable trunking.',
    'Smart Automation & HVAC Load Management',
    'Automated remote and timed switching of heavy air conditioning loads without overloading individual circuits.',
    '/images/real-ac-contactor-panel.jpg',
    'span-third',
    FALSE,
    0,
    9
),
(
    'Grandstream IP PBX Telephony & Intercom System',
    ARRAY['automation'],
    'IoT & Intercom Systems',
    'NETWORKING • IP PBX INTERCOM',
    'Multi-extension LCD IP phone array with centralized PoE switching',
    'Configured and bench-tested a Grandstream IP telephony intercom network with backlit LCD desktop stations, PoE network connectivity, and centralized multi-extension routing.',
    'Telecommunications & Low-Voltage Intercom',
    'Seamless room-to-room and office-to-gate voice communication with digital extension dialing.',
    '/images/real-ip-pbx-telecom.jpg',
    'span-third',
    FALSE,
    0,
    10
),
(
    'Luxury Villa Exterior Lighting, Step Risers & Canopy',
    ARRAY['electrical', 'lighting'],
    'Architectural Lighting',
    'LIGHTING • EXTERIOR RESIDENCE',
    'Under-tread linear LED illumination, canopy channels & wall sconces',
    'Wired and installed exterior architectural illumination including under-tread linear LED step riser lighting, flush entrance canopy light channels, and ambient outdoor wall sconces.',
    'Exterior Architectural Lighting & Electrical Wiring',
    'Stunning night-time curb appeal, enhanced entrance visibility, and safe illuminated walkway access.',
    '/images/real-exterior-step-lighting.jpg',
    'span-half',
    FALSE,
    0,
    11
),
(
    'Commercial Executive Conference Hall & Track Lighting',
    ARRAY['electrical', 'lighting', 'smart home'],
    'Commercial Lighting',
    'LIGHTING • COMMERCIAL BOARDROOM',
    'Linear ceiling profiles, recessed spotlights & ambient divider illumination',
    'Installed linear ceiling light profiles, recessed multi-directional spotlights, and warm display divider illumination across a modern executive boardroom facility.',
    'Commercial Electrical Installation & Architectural Lighting',
    'High-CRI glare-free office illumination providing functional lighting for boardroom meetings and executive presentations.',
    '/images/real-conference-lighting.jpg',
    'span-half',
    FALSE,
    0,
    12
),
(
    'Master Bedroom Suite Architectural Cove & Spot Lighting',
    ARRAY['smart home', 'lighting'],
    'Smart Home Lighting',
    'SMART HOME • MASTER BEDROOM',
    'Indirect false ceiling LED perimeter glow & integrated AC slot diffusers',
    'Wired and installed recessed false ceiling cove illumination, integrated linear AC slot vents, and ambient bedside lighting controls for a luxury master suite.',
    'Smart Home Lighting & Electrical Wiring',
    'Relaxing ambient bedroom environment with smooth multi-way switching and indirect cove illumination.',
    '/images/real-bedroom-cove-lighting.jpg',
    'span-third',
    FALSE,
    0,
    13
),
(
    'Integrated Cabinetry & Luxury Wardrobe LED Profile Lighting',
    ARRAY['smart home', 'lighting'],
    'Architectural Lighting',
    'LIGHTING • CUSTOM CABINETRY',
    'Vertical embedded warm LED channels inside tinted glass cabinetry',
    'Installed vertical embedded warm-white LED aluminum profile channels and concealed wiring inside custom tinted glass and timber display wardrobes.',
    'Bespoke Joinery & Architectural Accent Lighting',
    'Automatic illuminated wardrobe interiors with hidden drivers and refined warm accent glow.',
    '/images/real-cabinet-led-lighting.jpg',
    'span-third',
    FALSE,
    0,
    14
),
(
    'Smart Door Lock Interior Handle & Video Display Unit',
    ARRAY['cctv & security', 'automation'],
    'Access Control',
    'ACCESS CONTROL • INTERIOR DISPLAY',
    'Push-pull ergonomic handle & integrated video verification screen',
    'Completed interior handle fitting and integrated high-resolution digital display monitor for the smart door lock system on a contemporary dark door panel.',
    'Access Control & Smart Security',
    'Convenient interior door management with push-pull ergonomic handle operation and instant visitor display verification.',
    '/images/real-smart-lock-interior.jpg',
    'span-third',
    FALSE,
    0,
    15
)
ON CONFLICT DO NOTHING;

INSERT INTO public.why_us (title, description, icon_name, display_order)
VALUES
('Professional Installation', 'Clean panel layouts, properly ferruled wire terminations, neat trunking, and structured conduit pathways built to last.', 'wrench', 1),
('Quality Workmanship', 'We use genuine, certified electrical components, heavy-duty breakers, and high-performance smart hardware.', 'shield-check', 2),
('Modern Technology', 'Biometric smart locks, capacitive touch switches, 4K AI surveillance consoles, and high-efficiency hybrid solar storage.', 'cpu', 3),
('Reliable Service', 'Direct technical communication, on-schedule project delivery, and post-installation support right here in Abuja.', 'clock', 4),
('Smart Solutions', 'Clear circuit labeling, aesthetic flush-mount alignment, seamless ceiling track cuts, and organized server racks.', 'layers', 5),
('Abuja Based', 'Fast on-site engineering team available across Maitama, Guzape, Asokoro, Jabi, Katampe, and the greater FCT.', 'map-pin', 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.homepage_sections (section_key, title, is_enabled, display_order)
VALUES
('hero', 'Hero Banner & Video', TRUE, 1),
('video', 'Showcase Video Player', TRUE, 2),
('about', 'About EMMYLINK & Workmanship', TRUE, 3),
('services', 'Core Services Grid', TRUE, 4),
('projects', 'Bento Project Portfolio', TRUE, 5),
('why_us', 'Why Choose Us Features', TRUE, 6),
('estimator', 'Interactive Cost Calculator', TRUE, 7),
('cta', 'Call to Action Banner', TRUE, 8),
('contact', 'Contact Information & Quote Form', TRUE, 9)
ON CONFLICT (section_key) DO UPDATE
SET display_order = EXCLUDED.display_order;

INSERT INTO public.estimator_services (service_key, name, base_price_ngn, display_order)
VALUES
('electrical', '3-Phase Electrical & DB Board', 250000, 1),
('automation', 'Smart Home Automation', 350000, 2),
('cctv', '4K CCTV Surveillance Grid', 220000, 3),
('gate', 'Smart Lock & Access Control', 280000, 4),
('solar', 'Solar Hybrid Inverter Backup', 650000, 5),
('networking', 'Structured Networking / Server Rack', 180000, 6)
ON CONFLICT (service_key) DO NOTHING;
