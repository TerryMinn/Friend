import Link from "next/link";
import React from "react";
import NavLink from "./nav-link.client";
import Image from "next/image";

const Nav = () => {
  return (
    <nav
      className={`fixed w-full top-0 left-0 right-0 py-4 bg-primary-foreground  flex justify-center z-40 mx-auto shadow-md`}
    >
      <div className="container px-5 md:px-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src={"/images/logo.png"} alt="logo" width={30} height={30} />
            <Link href="/" className="text-2xl font-bold ">
              Friend AI
            </Link>
          </div>
          <NavLink />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
