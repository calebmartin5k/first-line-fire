import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'First-Line Fire Extinguisher Co.',
  description: 'First-Line Fire Extinguisher Co.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-light text-dark font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
