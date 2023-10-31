import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import Nav from './nav';
import { Suspense } from 'react';
import { Toaster } from './components/toaster'

// import AuthProvider from './components/authprovider/Authprovider'

export const metadata = {
  title: 'Farmart Drop',
  description:
    'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, ESLint, and Prettier.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Toaster/>
      {/* <AuthProvider> */}
        <Suspense>
          <Nav />
        </Suspense>
        {children}
        <Analytics />
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}
