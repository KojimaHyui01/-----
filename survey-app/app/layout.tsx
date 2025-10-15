import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'アンケートサイト',
  description: 'アンケートにご協力ください',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
