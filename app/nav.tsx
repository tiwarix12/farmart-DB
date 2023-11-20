'use client';
import { useEffect, useState } from 'react';
import Navbar from './navbar';
import { getSession } from 'next-auth/react';
import { getServerSession } from "next-auth";
import { useRouter,usePathname } from 'next/navigation';

export default async function Nav() {
  const router = useRouter();
  const pathname=usePathname();
  if(pathname ==='/login' || pathname ==='/register')
  {
    return null
  }
  return (
  <Navbar user  />
 
  );
}
