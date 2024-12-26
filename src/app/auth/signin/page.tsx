"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Sign In</h1>
        <p className="text-gray-600 text-center mb-6">
          Choose a method to sign in
        </p>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => signIn("google", { callbackUrl })}
            className="btn w-full bg-red-500 text-white hover:bg-red-600"
          >
            Sign in with Google
          </button>
          <button
            onClick={() => signIn("github", { callbackUrl })}
            className="btn w-full bg-gray-800 text-white hover:bg-gray-900"
          >
            Sign in with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
