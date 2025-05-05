"use client";

import React from "react";
import ThemeSwitcher from "./theme-switcher.client";
import { useSession, signOut } from "next-auth/react";
import { Loader2 } from "lucide-react";

const NavLink = () => {
  const { status } = useSession();

  if (status === "loading") return <Loader2 className="animate-pulse" />;
  return (
    <div className="flex items-center gap-3">
      {status === "authenticated" ? (
        <button
          onClick={() => {
            signOut();
          }}
        >
          Sign Out
        </button>
      ) : (
        <a href="/login" className="">
          Login
        </a>
      )}

      <ThemeSwitcher />
    </div>
  );
};

export default NavLink;
