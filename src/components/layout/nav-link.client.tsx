"use client";

import React from "react";
import ThemeToggle from "./theme-switcher.client";
import { useSession, signOut } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AUTH_ROUTE } from "@/constants/route";

const NavLink = () => {
  const path = usePathname();
  const { status } = useSession();
  const route = AUTH_ROUTE.filter((route) => !path.startsWith(route))[0];
  const routeName =
    route?.replace(/^\//, "").charAt(0).toUpperCase() + route.slice(2);

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
        <Link href={route}>{routeName}</Link>
      )}

      <ThemeToggle />
    </div>
  );
};

export default NavLink;
