
import { Toaster } from './components/toaster';
import Image from "next/image";
import Link from "next/link";
import Login from './login/page';
import SignOut from './components/sign-out';


export default function IndexPage() {
 
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Toaster />
      <Login/>
      <SignOut/>
    </main>
  );
}
