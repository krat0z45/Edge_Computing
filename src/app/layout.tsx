import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

function Sparkles() {
  const SPARKLE_COUNT = 50;
  return (
    <div className="sparkles fixed top-0 left-0 w-full h-full -z-10">
      {Array.from({ length: SPARKLE_COUNT }).map((_, i) => {
        const style = {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
          animationDuration: `${Math.random() * 6 + 4}s`,
        };
        const sizeClass = `s${Math.ceil(Math.random() * 4)}`;
        return <div key={i} className={`sparkle ${sizeClass}`} style={style} />;
      })}
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Arquitecto Edge',
  description: 'Una presentación sobre la Arquitectura de Edge Computing.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased relative">
        <Sparkles />
        <div className="min-h-screen flex flex-col bg-transparent">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
