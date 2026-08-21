'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Menu,
  X,
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  Zap,
  Home,
  Camera,
  Shield,
  Sun,
  Server,
  Wrench,
  Cpu,
  Clock,
  Layers,
  ShieldCheck,
  Calculator,
  ArrowRight,
} from 'lucide-react';
import { formatNaira } from '@/lib/utils';

interface PublicWebsiteClientProps {
  siteSettings: any;
  hero: any;
  about: any;
  services: any[];
  showcaseVideo: any;
  projects: any[];
  whyUs: any[];
}

export default function PublicWebsiteClient({
  siteSettings,
  hero,
  about,
  services,
  showcaseVideo,
  projects,
  whyUs,
}: PublicWebsiteClientProps) {
  // Intro Loader State
  const [introVisible, setIntroVisible] = useState(true);
  const [introFading, setIntroFading] = useState(false);
  const [progressWidth, setProgressWidth] = useState('0%');

  // Mobile Drawer State
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Scrolled Header State
  const [scrolled, setScrolled] = useState(false);

  // Category Filter State
  const [activeFilter, setActiveFilter] = useState('all');

  // Lightbox Modal State
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  // Service Scope Modal State
  const [selectedService, setSelectedService] = useState<any | null>(null);

  // Estimator State
  const [propertyType, setPropertyType] = useState('Residential Villa / Duplex');
  const [buildingScale, setBuildingScale] = useState('medium');
  const [selectedEstimatorServices, setSelectedEstimatorServices] = useState<string[]>([
    '3-Phase Electrical & DB Board',
    'Smart Home Automation',
    '4K CCTV Surveillance Grid',
  ]);

  // Quote Form State
  const [quoteName, setQuoteName] = useState('');
  const [quotePhone, setQuotePhone] = useState('');
  const [quoteEmail, setQuoteEmail] = useState('');
  const [quoteService, setQuoteService] = useState('Electrical Installation');
  const [quoteMessage, setQuoteMessage] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Intro Sequence
  useEffect(() => {
    const timer1 = setTimeout(() => setProgressWidth('100%'), 100);
    const timer2 = setTimeout(() => setIntroFading(true), 1150);
    const timer3 = setTimeout(() => setIntroVisible(false), 1950);

    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Filtered Projects
  const filteredProjects = projects.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.categories?.some((c: string) => c.toLowerCase().includes(activeFilter.toLowerCase()));
  });

  // Calculate Estimator Budget Range
  const calculateBudget = () => {
    let base = 0;
    if (selectedEstimatorServices.includes('3-Phase Electrical & DB Board')) base += 250000;
    if (selectedEstimatorServices.includes('Smart Home Automation')) base += 350000;
    if (selectedEstimatorServices.includes('4K CCTV Surveillance Grid')) base += 220000;
    if (selectedEstimatorServices.includes('Smart Lock & Access Control')) base += 280000;
    if (selectedEstimatorServices.includes('Solar Hybrid Inverter Backup')) base += 650000;
    if (selectedEstimatorServices.includes('Structured Networking / Server Rack')) base += 180000;

    let multiplier = 1.0;
    if (buildingScale === 'small') multiplier = 0.8;
    else if (buildingScale === 'medium') multiplier = 1.2;
    else if (buildingScale === 'large') multiplier = 1.8;
    else if (buildingScale === 'estate') multiplier = 2.6;

    if (base === 0) return 'Select Services Above';

    const calculatedTotal = base * multiplier;
    const minEst = Math.round((calculatedTotal * 0.85) / 10000) * 10000;
    const maxEst = Math.round((calculatedTotal * 1.15) / 10000) * 10000;

    return `${formatNaira(minEst)} – ${formatNaira(maxEst)}`;
  };

  const budgetDisplay = calculateBudget();

  const handleEstimatorCheckbox = (name: string) => {
    setSelectedEstimatorServices((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const getEstimatorWhatsAppUrl = () => {
    const text = `Hello EMMYLINK, I used your website estimator for my ${buildingScale} ${propertyType} in Abuja. Selected systems: ${selectedEstimatorServices.join(
      ', '
    )}. Estimated budget: ${budgetDisplay}. I would like to schedule an inspection.`;
    return `https://wa.me/${siteSettings.whatsapp_number}?text=${encodeURIComponent(text)}`;
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteName.trim() || !quotePhone.trim()) {
      setToastMessage('Please enter your name and phone number.');
      setTimeout(() => setToastMessage(null), 3500);
      return;
    }

    const text = `Hello EMMYLINK, I would like to request a quote from your website:\n\n*Name:* ${quoteName.trim()}\n*Phone:* ${quotePhone.trim()}\n*Email:* ${
      quoteEmail.trim() || 'N/A'
    }\n*Service:* ${quoteService}\n*Message:* ${
      quoteMessage.trim() || 'Please contact me to discuss this project.'
    }`;

    setToastMessage('Enquiry prepared! Opening WhatsApp...');
    setTimeout(() => {
      window.open(`https://wa.me/${siteSettings.whatsapp_number}?text=${encodeURIComponent(text)}`, '_blank');
      setToastMessage(null);
      setQuoteName('');
      setQuotePhone('');
      setQuoteEmail('');
      setQuoteMessage('');
    }, 1200);
  };

  const getServiceIcon = (key: string) => {
    switch (key) {
      case 'electrical':
        return <Zap className="w-6 h-6 text-emmy-gold" />;
      case 'automation':
        return <Home className="w-6 h-6 text-emmy-gold" />;
      case 'cctv':
        return <Camera className="w-6 h-6 text-emmy-gold" />;
      case 'gates':
        return <Shield className="w-6 h-6 text-emmy-gold" />;
      case 'solar':
        return <Sun className="w-6 h-6 text-emmy-gold" />;
      case 'networking':
        return <Server className="w-6 h-6 text-emmy-gold" />;
      default:
        return <Zap className="w-6 h-6 text-emmy-gold" />;
    }
  };

  const getWhyIcon = (iconName: string) => {
    switch (iconName) {
      case 'wrench':
        return <Wrench className="w-6 h-6 text-emmy-bronze-light" />;
      case 'shield-check':
        return <ShieldCheck className="w-6 h-6 text-emmy-bronze-light" />;
      case 'cpu':
        return <Cpu className="w-6 h-6 text-emmy-bronze-light" />;
      case 'clock':
        return <Clock className="w-6 h-6 text-emmy-bronze-light" />;
      case 'layers':
        return <Layers className="w-6 h-6 text-emmy-bronze-light" />;
      default:
        return <CheckCircle className="w-6 h-6 text-emmy-bronze-light" />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#171717] text-[#FAF7F2] overflow-x-hidden">
      {/* 1. LUXURY LOGO INTRO LOADER */}
      {introVisible && (
        <div
          className={`fixed inset-0 z-[999999] flex items-center justify-center bg-[#171717] transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
            introFading ? '-translate-y-full opacity-90 pointer-events-none' : 'opacity-100'
          }`}
          style={{
            background: 'radial-gradient(circle at 50% 48%, #29241F 0%, #171717 65%, #101010 100%)',
          }}
        >
          <div className="flex flex-col items-center justify-center text-center p-6 max-w-sm">
            <div className="relative mb-5">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-emmy-bronze/40 to-emmy-gold/20 blur-xl animate-pulse" />
              <div className="relative w-28 h-24">
                <Image
                  src={siteSettings.logo_url || '/images/emmylink-emblem.png'}
                  alt="EMMYLINK Logo"
                  fill
                  className="object-contain filter drop-shadow-xl"
                  priority
                />
              </div>
            </div>
            <div className="mb-6">
              <div className="text-3xl font-black tracking-wider uppercase text-white leading-none">
                EMMY<span className="text-emmy-bronze">LINK</span>
              </div>
              <div className="text-[10px] font-extrabold tracking-[0.22em] text-emmy-gold uppercase mt-1.5">
                {siteSettings.company_tagline}
              </div>
              <div className="text-[10px] font-bold tracking-[0.18em] text-neutral-400 uppercase mt-1">
                {siteSettings.location_city}, {siteSettings.location_country}
              </div>
            </div>
            <div className="w-44 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emmy-bronze via-emmy-gold to-emmy-bronze-light transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(201,130,61,0.8)]"
                style={{ width: progressWidth }}
              />
            </div>
          </div>
        </div>
      )}

      {/* 2. REFINED WARM GRAPHITE TOP HEADER */}
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xl border-b ${
          scrolled
            ? 'h-[72px] bg-[#1E1A17]/98 border-emmy-gold/30 shadow-2xl'
            : 'h-[78px] bg-[#25211E] border-emmy-gold/25 shadow-lg'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-8 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <Link href="#hero" className="flex items-center gap-3 group">
            <div className="relative w-14 h-12 shrink-0">
              <Image
                src={siteSettings.logo_url || '/images/emmylink-emblem.png'}
                alt="EMMYLINK Logo"
                fill
                className="object-contain filter drop-shadow-md group-hover:scale-105 transition-transform"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-xl sm:text-2xl font-black tracking-wide uppercase text-white leading-none">
                EMMY<span className="text-[#D8A25E]">LINK</span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-extrabold tracking-[0.15em] text-[#D4B07B] uppercase mt-1">
                {siteSettings.company_tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {[
              { label: 'HOME', href: '#hero' },
              { label: 'ABOUT', href: '#about' },
              { label: 'SERVICES', href: '#services' },
              { label: 'VIDEO', href: '#video-showcase' },
              { label: 'PROJECTS', href: '#our-work' },
              { label: 'WHY US', href: '#why-choose' },
              { label: 'CONTACT', href: '#contact' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-extrabold uppercase tracking-wider text-emmy-ivory hover:text-emmy-bronze-light transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#D8A25E] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA & Mobile Hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-emmy-bronze to-emmy-bronze-hover hover:from-emmy-bronze-light hover:to-emmy-bronze text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-emmy-bronze/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>GET A FREE QUOTE</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="lg:hidden w-11 h-11 rounded-lg bg-[#2C2723] border border-emmy-gold/40 flex items-center justify-center text-white hover:border-emmy-gold transition-colors"
              aria-label="Toggle Menu"
            >
              {drawerOpen ? <X className="w-5 h-5 text-emmy-gold" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/75 backdrop-blur-md z-40 lg:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}
      <aside
        className={`fixed top-0 bottom-0 right-0 z-50 w-80 max-w-[85vw] bg-[#1C1815] border-l border-emmy-bronze/30 p-6 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:hidden ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-emmy-charcoal-700/60 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="relative w-10 h-8">
                <Image
                  src={siteSettings.logo_url || '/images/emmylink-emblem.png'}
                  alt="EMMYLINK Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <div className="text-base font-black text-white leading-none">
                  EMMY<span className="text-emmy-bronze">LINK</span>
                </div>
                <div className="text-[8px] font-bold text-emmy-gold uppercase tracking-wider mt-0.5">
                  ELECTRICAL &amp; SMART
                </div>
              </div>
            </div>
            <button
              onClick={() => setDrawerOpen(false)}
              className="p-1 text-emmy-ivory-muted hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col space-y-2">
            {[
              { label: 'HOME', href: '#hero' },
              { label: 'ABOUT', href: '#about' },
              { label: 'SERVICES', href: '#services' },
              { label: 'VIDEO SHOWCASE', href: '#video-showcase' },
              { label: 'PROJECTS', href: '#our-work' },
              { label: 'WHY US', href: '#why-choose' },
              { label: 'CONTACT', href: '#contact' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setDrawerOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-emmy-ivory hover:bg-emmy-charcoal-800 hover:text-emmy-gold transition-colors"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-emmy-bronze" />
              </a>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-emmy-charcoal-700/60 space-y-3">
          <a
            href="#contact"
            onClick={() => setDrawerOpen(false)}
            className="block w-full py-3 text-center rounded-xl bg-emmy-bronze text-white text-xs font-bold uppercase tracking-wider shadow-lg"
          >
            GET A FREE QUOTE
          </a>
          <a
            href={`https://wa.me/${siteSettings.whatsapp_number}?text=Hello%20EMMYLINK%2C%20I%20found%20your%20website%20and%20I%20would%20like%20to%20make%20an%20enquiry.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-emmy-whatsapp text-emmy-whatsapp hover:bg-emmy-whatsapp/10 text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
          <p className="text-[10px] text-center text-emmy-ivory-muted">
            📍 {siteSettings.location_city}, Nigeria &bull; 📞 {siteSettings.phone_number}
          </p>
        </div>
      </aside>

      {/* 3. HERO SECTION */}
      <section id="hero" className="relative min-h-[90vh] flex items-center justify-center py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={hero.bg_poster_url || '/images/video-poster.jpg'}
            className="w-full h-full object-cover filter brightness-[1.02] contrast-[1.04]"
          >
            <source src={hero.bg_video_url || '/videos/emmylink-tv-wall-project.mp4'} type="video/mp4" />
          </video>
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                'linear-gradient(180deg, rgba(23, 23, 23, 0.48) 0%, rgba(23, 23, 23, 0.18) 45%, rgba(23, 23, 23, 0.75) 100%), linear-gradient(90deg, rgba(23, 23, 23, 0.65) 0%, rgba(36, 33, 30, 0.25) 55%, transparent 100%)',
            }}
          />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-8 text-center sm:text-left w-full">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#171717]/85 border border-emmy-bronze/40 text-emmy-gold text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emmy-bronze pulse-dot" />
            <span>{hero.badge_text || 'ABUJA, NIGERIA'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-[1.1] mb-6 drop-shadow-xl">
            {hero.headline_line1 || 'POWERING YOUR SPACE.'}
            <br />
            <span className="text-emmy-bronze-light">{hero.headline_line2 || 'SMARTENING YOUR FUTURE.'}</span>
          </h1>

          <p className="text-sm sm:text-lg text-emmy-ivory max-w-2xl mb-8 leading-relaxed drop-shadow-md">
            {hero.subtext}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start mb-12">
            <a
              href={hero.cta_primary_link || '#contact'}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-emmy-bronze to-emmy-bronze-hover hover:from-emmy-bronze-light hover:to-emmy-bronze text-white text-xs font-extrabold tracking-widest uppercase shadow-xl shadow-emmy-bronze/30 hover:scale-105 active:scale-95 transition-all"
            >
              <span>{hero.cta_primary_text || 'GET A FREE QUOTE'}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={hero.cta_secondary_link || '#services'}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/40 text-white text-xs font-extrabold tracking-widest uppercase backdrop-blur-md transition-all"
            >
              <span>{hero.cta_secondary_text || 'VIEW OUR SERVICES'}</span>
            </a>
          </div>

          {/* Hero Quick Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#24201D]/75 backdrop-blur-md border border-emmy-bronze/30 shadow-2xl">
            {[
              { val: hero.stat_1_value || '3-PHASE', label: hero.stat_1_label || 'Power Distribution' },
              { val: hero.stat_2_value || 'SMART IOT', label: hero.stat_2_label || 'Automation Hubs' },
              { val: hero.stat_3_value || '4K IP POE', label: hero.stat_3_label || 'Surveillance Grid' },
              { val: hero.stat_4_value || '100% CLEAN', label: hero.stat_4_label || 'Conduit & Trunking' },
            ].map((stat, i) => (
              <div key={i} className="text-center sm:text-left p-2">
                <div className="text-base sm:text-lg font-black text-emmy-gold">{stat.val}</div>
                <div className="text-[10px] sm:text-xs text-emmy-ivory-muted uppercase font-bold mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VIDEO SHOWCASE SECTION */}
      <section id="video-showcase" className="py-24 bg-gradient-to-b from-[#171717] via-[#201D1A] to-[#171717] border-y border-emmy-charcoal-700/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="bg-[#24201D] border border-emmy-bronze/35 rounded-3xl p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden shadow-2xl border border-emmy-bronze/40 aspect-video bg-black">
              <video
                controls
                playsInline
                poster={showcaseVideo.poster_url || '/images/video-poster.jpg'}
                className="w-full h-full object-cover"
              >
                <source src={showcaseVideo.video_url || '/videos/emmylink-tv-wall-project.mp4'} type="video/mp4" />
              </video>
            </div>
            <div className="lg:col-span-5 space-y-5">
              <span className="inline-block px-3.5 py-1 rounded-full bg-emmy-bronze/20 border border-emmy-bronze/40 text-emmy-gold text-[10px] font-black tracking-widest uppercase">
                {showcaseVideo.section_tag || 'SEE OUR WORK IN ACTION'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight leading-tight">
                {showcaseVideo.title}
              </h2>
              <p className="text-xs sm:text-sm text-emmy-ivory-muted leading-relaxed">
                {showcaseVideo.subtitle}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={showcaseVideo.cta_primary_link || '#contact'}
                  className="px-6 py-3 rounded-xl bg-emmy-bronze hover:bg-emmy-bronze-light text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-emmy-bronze/30"
                >
                  {showcaseVideo.cta_primary_text || 'BOOK A CONSULTATION'}
                </a>
                <a
                  href={`https://wa.me/${siteSettings.whatsapp_number}?text=Hello%20EMMYLINK%2C%20I%20watched%20your%20completed%20smart-home%20video%20and%20I%20would%20like%20to%20discuss%20a%20similar%20installation.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl border border-emmy-charcoal-600 hover:border-emmy-bronze text-emmy-ivory text-xs font-bold uppercase tracking-wider transition-all"
                >
                  {showcaseVideo.cta_whatsapp_text || 'DISCUSS ON WHATSAPP'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ABOUT SECTION (WARM IVORY CONTRAST) */}
      <section id="about" className="py-24 bg-[#F4F0E8] text-[#1C1A18] border-b border-[#E2DCD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#DFD7C8] aspect-[4/5] bg-white">
                <Image
                  src={about.main_image_url || '/images/real-luxury-living-room.jpg'}
                  alt="EMMYLINK Installation in Abuja"
                  fill
                  className="object-cover filter brightness-[1.02] contrast-[1.04]"
                />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#DFD7C8] shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emmy-bronze text-white flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase text-[#1C1A18]">
                      {about.badge_title || 'STANDARDS-DRIVEN'}
                    </div>
                    <div className="text-[10px] font-semibold text-[#5A544C]">
                      {about.badge_subtitle || 'Tested & Commissioned in Abuja'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Column */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-block px-3.5 py-1 rounded-full bg-emmy-bronze/15 text-emmy-bronze text-[10px] font-black tracking-widest uppercase">
                {about.tag_label || 'ABOUT EMMYLINK'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-[#1C1A18] tracking-tight leading-tight">
                {about.headline_part1} <span className="text-emmy-bronze">{about.headline_part2}</span>
              </h2>
              <p className="text-sm font-semibold text-[#3D3833] leading-relaxed">
                {about.lead_paragraph}
              </p>
              <p className="text-xs sm:text-sm text-[#5A544C] leading-relaxed">
                {about.secondary_paragraph}
              </p>

              {/* 4 Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {(about.pillars || []).map((pillar: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#DFD7C8] shadow-sm">
                    <div className="text-xs font-black uppercase text-[#1C1A18] mb-1">
                      {pillar.title}
                    </div>
                    <div className="text-[11px] text-[#5A544C] leading-relaxed">
                      {pillar.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SERVICES SECTION */}
      <section id="services" className="py-24 bg-[#F4F0E8] text-[#1C1A18] border-b border-[#E2DCD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-2xl mb-14">
            <span className="inline-block px-3.5 py-1 rounded-full bg-emmy-bronze/15 text-emmy-bronze text-[10px] font-black tracking-widest uppercase mb-3">
              OUR SERVICES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-[#1C1A18] tracking-tight">
              SMARTER SPACES. SAFER SYSTEMS. BETTER POWER.
            </h2>
            <p className="text-xs sm:text-sm text-[#5A544C] mt-2">
              Engineering durable electrical, automation and security installations in Abuja.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((srv) => (
              <div
                key={srv.id}
                className="p-8 rounded-3xl bg-white border border-[#DFD7C8] shadow-md hover:shadow-xl hover:border-emmy-bronze hover:-translate-y-1.5 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emmy-charcoal-900 border border-emmy-bronze/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emmy-bronze transition-all">
                    {getServiceIcon(srv.service_key)}
                  </div>
                  <div className="text-base font-black uppercase text-[#1C1A18] mb-2">
                    {srv.service_number} {srv.title}
                  </div>
                  <p className="text-xs text-[#5A544C] leading-relaxed">
                    {srv.short_description}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedService(srv)}
                  className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emmy-bronze hover:text-emmy-bronze-hover transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PROJECT PORTFOLIO SECTION (BENTO GRID) */}
      <section id="our-work" className="py-24 bg-[#171717]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <span className="inline-block px-3.5 py-1 rounded-full bg-emmy-bronze/20 border border-emmy-bronze/40 text-emmy-gold text-[10px] font-black tracking-widest uppercase mb-3">
                PROJECT PORTFOLIO
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
                OUR RECENT PROJECTS IN ABUJA
              </h2>
              <p className="text-xs sm:text-sm text-emmy-ivory-muted mt-2">
                Real completed residential and commercial installations across the FCT.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'ALL' },
                { id: 'electrical', label: 'ELECTRICAL' },
                { id: 'smart home', label: 'SMART HOME' },
                { id: 'cctv & security', label: 'CCTV & SECURITY' },
                { id: 'lighting', label: 'LIGHTING' },
                { id: 'automation', label: 'AUTOMATION' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all ${
                    activeFilter === tab.id
                      ? 'bg-emmy-bronze text-white shadow-md shadow-emmy-bronze/30'
                      : 'bg-[#24201D] text-emmy-ivory-muted hover:text-white border border-emmy-charcoal-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className={`relative rounded-3xl overflow-hidden border border-emmy-bronze/25 hover:border-emmy-bronze shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer group bg-[#24201D] aspect-[4/3]`}
              >
                <Image
                  src={proj.main_image_url}
                  alt={proj.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[1.02] contrast-[1.04]"
                />
                <div
                  className="absolute inset-0 z-10 flex flex-col justify-end p-6"
                  style={{
                    background:
                      'linear-gradient(0deg, rgba(23, 23, 23, 0.88) 0%, rgba(23, 23, 23, 0.38) 28%, rgba(23, 23, 23, 0.04) 55%, transparent 100%)',
                  }}
                >
                  <span className="self-start px-2.5 py-0.5 rounded-full bg-emmy-bronze text-white text-[9px] font-black tracking-widest uppercase mb-2">
                    {proj.badge_label || proj.category_label}
                  </span>
                  <h4 className="text-sm font-black uppercase text-white leading-snug drop-shadow-md">
                    {proj.title}
                  </h4>
                  <p className="text-[11px] text-emmy-ivory-muted line-clamp-1 mt-1 drop-shadow">
                    {proj.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. WHY CHOOSE US */}
      <section id="why-choose" className="py-24 bg-[#24201D] border-t border-emmy-charcoal-700/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-2xl mb-14">
            <span className="inline-block px-3.5 py-1 rounded-full bg-emmy-bronze/20 border border-emmy-bronze/40 text-emmy-gold text-[10px] font-black tracking-widest uppercase mb-3">
              WHY CHOOSE EMMYLINK?
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
              ENGINEERED FOR SAFETY, ELEGANCE &amp; LONGEVITY
            </h2>
            <p className="text-xs sm:text-sm text-emmy-ivory-muted mt-2">
              Combining technical compliance, premium components, and direct Abuja engineering support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((item) => (
              <div
                key={item.id}
                className="p-8 rounded-3xl bg-[#1C1815] border border-emmy-bronze/25 hover:border-emmy-bronze shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-emmy-bronze/15 border border-emmy-bronze/30 flex items-center justify-center mb-6">
                  {getWhyIcon(item.icon_name)}
                </div>
                <h3 className="text-base font-black uppercase text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-emmy-ivory-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. COST ESTIMATOR SECTION */}
      <section id="estimator" className="py-24 bg-[#171717] border-t border-emmy-charcoal-700/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="bg-gradient-to-r from-[#24201D] via-[#2A2420] to-[#1E1A17] border border-emmy-bronze/35 rounded-3xl p-8 sm:p-12 shadow-2xl">
            <div className="max-w-2xl mb-8">
              <span className="inline-block px-3.5 py-1 rounded-full bg-emmy-bronze/20 border border-emmy-bronze/40 text-emmy-gold text-[10px] font-black tracking-widest uppercase mb-3">
                BUDGET ESTIMATOR
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                PLAN YOUR ELECTRICAL &amp; SMART-HOME BUDGET
              </h2>
              <p className="text-xs text-emmy-ivory-muted mt-2">
                Select your property category, building scale, and required systems for an instant preliminary estimate in Abuja.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-emmy-ivory-muted mb-2">
                      Property Category
                    </label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full p-3 bg-[#1A1715] border border-emmy-charcoal-700 rounded-xl text-xs text-white outline-none focus:border-emmy-bronze"
                    >
                      <option value="Residential Villa / Duplex">Residential Villa / Duplex</option>
                      <option value="Apartment / Penthouse">Apartment / Penthouse</option>
                      <option value="Commercial Office / Plaza">Commercial Office / Plaza</option>
                      <option value="Residential Terrace">Residential Terrace</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-emmy-ivory-muted mb-2">
                      Building Scale
                    </label>
                    <select
                      value={buildingScale}
                      onChange={(e) => setBuildingScale(e.target.value)}
                      className="w-full p-3 bg-[#1A1715] border border-emmy-charcoal-700 rounded-xl text-xs text-white outline-none focus:border-emmy-bronze"
                    >
                      <option value="small">Compact (2–3 Bedrooms)</option>
                      <option value="medium">Standard (4–5 Bedroom Duplex)</option>
                      <option value="large">Luxury Mansion (6+ Bedrooms)</option>
                      <option value="estate">Commercial Building / Estate</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-emmy-ivory-muted mb-3">
                    Required Systems (Check All That Apply)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      '3-Phase Electrical & DB Board',
                      'Smart Home Automation',
                      '4K CCTV Surveillance Grid',
                      'Smart Lock & Access Control',
                      'Solar Hybrid Inverter Backup',
                      'Structured Networking / Server Rack',
                    ].map((name) => (
                      <label
                        key={name}
                        className="flex items-center gap-2.5 p-3 rounded-xl bg-[#1A1715] border border-emmy-charcoal-700 text-xs font-semibold text-emmy-ivory cursor-pointer hover:border-emmy-bronze"
                      >
                        <input
                          type="checkbox"
                          checked={selectedEstimatorServices.includes(name)}
                          onChange={() => handleEstimatorCheckbox(name)}
                          className="w-4 h-4 rounded text-emmy-bronze focus:ring-emmy-bronze bg-transparent"
                        />
                        <span>{name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Output Column */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-[#171412] border border-emmy-bronze/40 text-center space-y-4 shadow-xl">
                <div className="text-xs font-bold uppercase tracking-widest text-emmy-ivory-muted">
                  Estimated Scope Budget
                </div>
                <div className="text-2xl sm:text-3xl font-black text-emmy-gold">
                  {budgetDisplay}
                </div>
                <p className="text-[11px] text-emmy-ivory-muted leading-relaxed">
                  *Includes certified hardware specification and professional installation workmanship in Abuja.
                </p>
                <a
                  href={getEstimatorWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emmy-bronze to-emmy-bronze-hover text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:scale-[1.02] transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Estimate to WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. CONTACT SECTION */}
      <section id="contact" className="py-24 bg-[#F4F0E8] text-[#1C1A18] border-t border-[#E2DCD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Contact Info Card */}
            <div className="lg:col-span-5 p-8 rounded-3xl bg-white border border-[#DFD7C8] shadow-xl space-y-6">
              <div>
                <div className="text-2xl font-black uppercase text-[#1C1A18] leading-none">
                  EMMY<span className="text-emmy-bronze">LINK</span>
                </div>
                <div className="text-xs font-bold text-[#5A544C] mt-1">
                  Electrical &amp; Automation Solutions &bull; Abuja, Nigeria
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#DFD7C8]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#FAF8F3] border border-[#DFD7C8] flex items-center justify-center text-emmy-bronze">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-[#8C8478]">Location</div>
                    <div className="text-xs font-bold text-[#1C1A18]">{siteSettings.office_address}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#FAF8F3] border border-[#DFD7C8] flex items-center justify-center text-emmy-bronze">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-[#8C8478]">Phone</div>
                    <a href={`tel:${siteSettings.phone_number}`} className="text-xs font-bold text-[#1C1A18] hover:text-emmy-bronze">
                      {siteSettings.phone_number}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emmy-whatsapp">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-[#8C8478]">WhatsApp</div>
                    <a
                      href={`https://wa.me/${siteSettings.whatsapp_number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-emmy-whatsapp hover:underline"
                    >
                      {siteSettings.phone_number}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#FAF8F3] border border-[#DFD7C8] flex items-center justify-center text-emmy-bronze">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-[#8C8478]">Email</div>
                    <a href={`mailto:${siteSettings.email_address}`} className="text-xs font-bold text-[#1C1A18] hover:text-emmy-bronze">
                      {siteSettings.email_address}
                    </a>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#DFD7C8]">
                <a
                  href={`tel:${siteSettings.phone_number}`}
                  className="py-3 px-4 rounded-xl bg-[#1C1A18] text-white text-xs font-bold uppercase tracking-wider text-center"
                >
                  Call Now
                </a>
                <a
                  href={`https://wa.me/${siteSettings.whatsapp_number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-emmy-whatsapp text-white text-xs font-bold uppercase tracking-wider text-center"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Quote Form */}
            <div className="lg:col-span-7 p-8 rounded-3xl bg-white border border-[#DFD7C8] shadow-xl">
              <h3 className="text-2xl font-black uppercase text-[#1C1A18] mb-1">
                REQUEST A PROJECT QUOTE
              </h3>
              <p className="text-xs text-[#5A544C] mb-6">
                Tell us about your property in Abuja. We will review and contact you promptly.
              </p>

              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#1C1A18] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={quoteName}
                      onChange={(e) => setQuoteName(e.target.value)}
                      placeholder="e.g. Engr. Michael Adeyemi"
                      className="w-full p-3 bg-[#FAF8F3] border border-[#DFD7C8] rounded-xl text-xs text-[#1C1A18] outline-none focus:border-emmy-bronze"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#1C1A18] mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={quotePhone}
                      onChange={(e) => setQuotePhone(e.target.value)}
                      placeholder="e.g. 08012345678"
                      className="w-full p-3 bg-[#FAF8F3] border border-[#DFD7C8] rounded-xl text-xs text-[#1C1A18] outline-none focus:border-emmy-bronze"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#1C1A18] mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={quoteEmail}
                      onChange={(e) => setQuoteEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full p-3 bg-[#FAF8F3] border border-[#DFD7C8] rounded-xl text-xs text-[#1C1A18] outline-none focus:border-emmy-bronze"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#1C1A18] mb-1.5">
                      Service Required *
                    </label>
                    <select
                      value={quoteService}
                      onChange={(e) => setQuoteService(e.target.value)}
                      className="w-full p-3 bg-[#FAF8F3] border border-[#DFD7C8] rounded-xl text-xs text-[#1C1A18] outline-none focus:border-emmy-bronze"
                    >
                      <option value="Electrical Installation">Electrical Installation</option>
                      <option value="Smart Home Automation">Smart Home Automation</option>
                      <option value="CCTV & Security Solutions">CCTV &amp; Security Solutions</option>
                      <option value="Automatic Gates & Access Control">Automatic Gates &amp; Access Control</option>
                      <option value="Solar & Backup Power">Solar &amp; Backup Power</option>
                      <option value="Networking & Low-Voltage Systems">Networking &amp; Low-Voltage Systems</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#1C1A18] mb-1.5">
                    Project Details / Message
                  </label>
                  <textarea
                    rows={4}
                    value={quoteMessage}
                    onChange={(e) => setQuoteMessage(e.target.value)}
                    placeholder="Briefly describe your building type, location in Abuja (e.g. Guzape, Maitama, Jabi, Katampe), and specific requirements..."
                    className="w-full p-3 bg-[#FAF8F3] border border-[#DFD7C8] rounded-xl text-xs text-[#1C1A18] outline-none focus:border-emmy-bronze resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-emmy-bronze to-emmy-bronze-hover text-white text-xs font-extrabold uppercase tracking-widest shadow-xl shadow-emmy-bronze/30 hover:scale-[1.01] transition-all"
                >
                  SUBMIT QUOTE REQUEST
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="bg-[#12100E] border-t border-emmy-charcoal-700/60 pt-16 pb-12 text-xs text-emmy-ivory-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-emmy-charcoal-700/50">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-10">
                  <Image
                    src={siteSettings.logo_url || '/images/emmylink-emblem.png'}
                    alt="EMMYLINK Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="text-xl font-black text-white">
                  EMMY<span className="text-emmy-bronze">LINK</span>
                </div>
              </div>
              <p className="text-xs text-emmy-ivory-muted leading-relaxed">
                Professional electrical engineering, intelligent smart home automation, 4K CCTV surveillance, and modern power infrastructure in Abuja, Nigeria.
              </p>
              <div className="text-[11px] font-bold text-emmy-gold mt-3">
                {siteSettings.slogan}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase text-white tracking-wider mb-4">Navigation</h4>
              <ul className="space-y-2">
                {['Home', 'About EMMYLINK', 'Our Services', 'Featured Video', 'Project Portfolio', 'Why Choose Us'].map((item) => (
                  <li key={item}>
                    <a href="#hero" className="hover:text-emmy-gold transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase text-white tracking-wider mb-4">Services</h4>
              <ul className="space-y-2">
                {services.map((s) => (
                  <li key={s.id}>
                    <a href="#services" className="hover:text-emmy-gold transition-colors">{s.title}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase text-white tracking-wider mb-4">Abuja Office &amp; Contact</h4>
              <div className="space-y-2.5">
                <div>📍 {siteSettings.office_address}</div>
                <div>📞 <a href={`tel:${siteSettings.phone_number}`} className="hover:text-emmy-gold">{siteSettings.phone_number}</a></div>
                <div>💬 <a href={`https://wa.me/${siteSettings.whatsapp_number}`} target="_blank" rel="noopener noreferrer" className="text-emmy-whatsapp hover:underline">WhatsApp: {siteSettings.phone_number}</a></div>
                <div>✉️ <a href={`mailto:${siteSettings.email_address}`} className="hover:text-emmy-gold">{siteSettings.email_address}</a></div>
                <div className="pt-2">
                  <Link href="/admin/login" className="text-[11px] font-bold text-emmy-gold/70 hover:text-emmy-gold transition-colors">
                    &bull; Admin CMS Portal
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
            <div>&copy; 2026 EMMYLINK Electrical &amp; Smart Solutions. All Rights Reserved. Abuja, Nigeria.</div>
            <div>Built for Premium Electrical &amp; Smart-Home Excellence.</div>
          </div>
        </div>
      </footer>

      {/* 12. FLOATING WHATSAPP BUTTON */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          href={`https://wa.me/${siteSettings.whatsapp_number}?text=Hello%20EMMYLINK%2C%20I%20found%20your%20website%20and%20I%20would%20like%20to%20make%20an%20enquiry.`}
          target="_blank"
          rel="noopener noreferrer"
          className="wa-radar-pulse flex items-center gap-2.5 p-3.5 sm:px-5 sm:py-3.5 rounded-full bg-emmy-whatsapp hover:bg-emmy-whatsapp-hover text-white font-bold text-xs shadow-2xl hover:scale-105 transition-all"
          aria-label="Chat with EMMYLINK on WhatsApp"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="hidden sm:inline font-bold tracking-wide">Chat with us on WhatsApp</span>
        </a>
      </div>

      {/* 13. PROJECT LIGHTBOX MODAL */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-[#24201D] border border-emmy-bronze/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#1C1815] text-emmy-ivory-muted hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5 border border-emmy-bronze/30">
              <Image
                src={selectedProject.main_image_url}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
            </div>

            <span className="px-3 py-1 rounded-full bg-emmy-bronze text-white text-[10px] font-black tracking-wider uppercase mb-2 inline-block">
              {selectedProject.badge_label || selectedProject.category_label}
            </span>

            <h3 className="text-xl font-black uppercase text-white mt-1 mb-3">
              {selectedProject.title}
            </h3>

            <div className="text-xs text-emmy-ivory-muted space-y-2 leading-relaxed">
              <p><strong>WHAT WE DID:</strong> {selectedProject.what_we_did}</p>
              <p><strong>PROJECT TYPE:</strong> {selectedProject.project_type}</p>
              <p><strong>RESULT:</strong> {selectedProject.result}</p>
            </div>

            <div className="mt-6 flex justify-end">
              <a
                href="#contact"
                onClick={() => setSelectedProject(null)}
                className="px-6 py-2.5 rounded-xl bg-emmy-bronze hover:bg-emmy-bronze-light text-white text-xs font-bold uppercase tracking-wider shadow-md"
              >
                Request Similar Work
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 14. SERVICE SCOPE MODAL */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="bg-[#24201D] border border-emmy-bronze/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#1C1815] text-emmy-ivory-muted hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="px-3 py-1 rounded-full bg-emmy-bronze/20 border border-emmy-bronze/40 text-emmy-gold text-[10px] font-black tracking-wider uppercase mb-3 inline-block">
              EMMYLINK SERVICE SCOPE
            </span>

            <h3 className="text-xl font-black uppercase text-white mt-1 mb-3">
              {selectedService.service_number} {selectedService.title}
            </h3>

            <p className="text-xs text-emmy-ivory-muted leading-relaxed mb-6">
              {selectedService.full_description || selectedService.short_description}
            </p>

            <div className="flex justify-end">
              <a
                href="#contact"
                onClick={() => setSelectedService(null)}
                className="px-6 py-2.5 rounded-xl bg-emmy-bronze hover:bg-emmy-bronze-light text-white text-xs font-bold uppercase tracking-wider shadow-md"
              >
                Book a Site Survey in Abuja
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 15. TOAST FEEDBACK */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 px-5 py-3 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs font-bold shadow-2xl animate-fade-in">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
