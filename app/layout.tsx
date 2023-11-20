import './globals.css';
import Nav from './nav';
import { Suspense } from 'react';
import { Toaster } from './components/toaster'
import AuthStatus from "./components/auth-status";

export const metadata = {
  title: 'Farmart Drop',
  description:
    'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, ESLint, and Prettier.'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Toaster/>
        <Suspense>
        <AuthStatus />
        <Nav />
          {children}
        </Suspense>
      </body>
    </html>
  );
}
