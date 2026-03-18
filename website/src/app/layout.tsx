import type {Metadata} from 'next';
import {IBM_Plex_Sans_JP, Noto_Serif_JP} from 'next/font/google';
import './globals.css';

const bodyFont = IBM_Plex_Sans_JP({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
});

const displayFont = Noto_Serif_JP({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['500', '700']
});

export const metadata: Metadata = {
  title: 'JClaw',
  description: 'Japan-first AI Agent'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>{children}</body>
    </html>
  );
}
