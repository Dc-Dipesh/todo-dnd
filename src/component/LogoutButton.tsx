"use client";
import { signOut } from "next-auth/react";
import React from "react";

const LogoutButton = () => {
  return (
    <div>
      {" "}
      <button onClick={() => signOut()} className="btn">
        Sign Out
      </button>
    </div>
  );
};

export default LogoutButton;
