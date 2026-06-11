import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pocket Demo — Event Profitability SaaS',
  description: 'Interactive proof-of-concept demo for event planning and profitability workflows.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
