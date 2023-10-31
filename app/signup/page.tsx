'use client'


import Image from "next/image";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { signIn } from 'next-auth/react'; // Import Google icon from react-icons library


export default function Login() {
  const handleGoogleSignIn = () => {
    signIn('google'); 
  };
  
  return (
    <div className="flex flex-col items-center md:flex-row md:h-screen">
      <div className="flex items-center justify-center w-full md:w-1/2">
        <Image src="/favicon.ico" alt="Login Image" width={300} height={100} />
      </div>
      <div className="flex flex-col items-center justify-center w-full md:w-1/6">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="text-2xl font-bold">Hola!</h1>
            <p className="mt-2 text-gray-600">
              Please enter your details.
            </p>
          </div>
          <form className="mt-8 space-y-1">
            <div>
              <label htmlFor="email" className="block font-bold text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                required
              />
            </div>
            <div>
            <div>
              <label htmlFor="text" className="block font-bold text-gray-700">
                 Username
              </label>
              <input
                id="text"
                type="text"
                placeholder="Enter your username"
                className="w-full px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                required
              />
            </div>
              <label
                htmlFor="password"
                className="block font-bold text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-3 font-bold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
