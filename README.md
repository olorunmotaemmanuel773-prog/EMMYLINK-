# EMMYLINK ELECTRICAL & SMART SOLUTIONS — NEXT.JS CMS

Official dynamic corporate website & CMS for **EMMYLINK ELECTRICAL & SMART SOLUTIONS** based in Abuja, Nigeria.

- **Production URL:** `https://emmylink.vercel.app/`
- **Supabase Project:** `https://gynzzbqwivpbsviwhdbl.supabase.co`
- **Cloudinary Cloud:** `keudsavp`

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router, Server Actions, Server Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Custom Zero-Blue Luxury Warm Charcoal & Bronze Palette)
- **Database & Auth:** Supabase PostgreSQL + Row Level Security (RLS)
- **Media Storage:** Cloudinary (Images & Project Showcase Video)
- **Deployment:** Vercel

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local` and add your Supabase & Cloudinary keys:
```bash
cp .env.example .env.local
```

```ini
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://gynzzbqwivpbsviwhdbl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_public_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_secret_key

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=keudsavp
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Site URL
NEXT_PUBLIC_SITE_URL=https://emmylink.vercel.app
```

### 3. Run Database Migrations
Execute the SQL commands in `supabase/schema.sql` inside your Supabase project's **SQL Editor**.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) for the public website, or [http://localhost:3000/admin](http://localhost:3000/admin) for the CMS portal.

---

## 📁 Repository Structure

```text
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout & global metadata
│   │   ├── page.tsx                   # Dynamic Homepage with SSR & Fallback
│   │   ├── globals.css                # Tailwind & custom luxury theme
│   │   ├── admin/
│   │   │   ├── (auth)/                # Public login & password reset routes
│   │   │   │   ├── login/page.tsx
│   │   │   │   ├── forgot-password/page.tsx
│   │   │   │   └── reset-password/page.tsx
│   │   │   └── (dashboard)/           # Protected CMS Dashboard routes
│   │   │       ├── layout.tsx         # Admin gate & role check
│   │   │       └── page.tsx           # Overview metrics & quick actions
│   │   └── auth/                      # OAuth & signout API routes
│   ├── components/                    # UI primitives, Admin shell & Public components
│   ├── lib/                           # Supabase SSR clients, Cloudinary & utilities
│   ├── fallback/                      # 100% Failover content ensuring zero blank pages
│   └── types/                         # TypeScript database interfaces
├── public/
│   ├── images/                        # High-resolution real Abuja project photos & logo
│   └── videos/                        # TV-wall completed project showcase video
├── supabase/
│   └── schema.sql                     # PostgreSQL schema, triggers & hardened RLS
├── middleware.ts                      # Route protection & cookie refresh
└── next.config.mjs                    # Cloudinary & Supabase remote images config
```
