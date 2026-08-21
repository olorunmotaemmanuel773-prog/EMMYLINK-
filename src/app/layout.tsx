import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EMMYLINK | Electrical Installation, Smart Home Automation & Security in Abuja',
  description:
    'EMMYLINK delivers professional electrical engineering, smart home automation, 4K CCTV surveillance, automatic gates, solar backup power, and structured low-voltage systems in Abuja, Nigeria.',
  icons: {
    icon: '/images/favicon.png',
    apple: '/images/emmylink-emblem.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#25211E',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#171717] text-[#FAF7F2] antialiased selection:bg-emmy-bronze selection:text-white">
        {children}
      </body>
    </html>
  );
}
