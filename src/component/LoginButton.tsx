"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <>
          <p>Welcome, {session.user?.name || "User"}!</p>
          <button onClick={() => signOut()} className="btn">
            Sign Out
          </button>
        </>
      ) : (
        <>
          <button onClick={() => signIn("github")} className="btn">
            Sign in with GitHub
          </button>
          <button onClick={() => signIn("google")} className="btn">
            Sign in with Google
          </button>
        </>
      )}
    </div>
  );
}
